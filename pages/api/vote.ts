import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// Define the path to the JSON file
const votesFilePath = path.join(process.cwd(), 'data', 'votes.json');

// Simple lock to prevent race conditions
let isWriting = false;
const MAX_RETRY_COUNT = 5;
const RETRY_DELAY_MS = 100;

// Ensure the data directory exists
if (!fs.existsSync(path.dirname(votesFilePath))) {
  fs.mkdirSync(path.dirname(votesFilePath), { recursive: true });
}

// Define the vote interface
interface Vote {
  postId: string;
  ipAddress: string;
  voteType: 'up' | 'down';
  clientData?: any;
  timestamp?: string;
}

// Load existing votes or initialize an empty array
// This is a critical section that ensures we maintain existing votes in production
let votes: Vote[] = [];
if (fs.existsSync(votesFilePath)) {
  try {
    const fileData = fs.readFileSync(votesFilePath, 'utf8');
    votes = JSON.parse(fileData);
    console.log(`Loaded ${votes.length} votes from storage`);
  } catch (error) {
    console.error('Error loading votes from storage:', error);
    // If there's an error, create a backup of the file
    if (fs.existsSync(votesFilePath)) {
      const backupPath = `${votesFilePath}.backup-${Date.now()}`;
      fs.copyFileSync(votesFilePath, backupPath);
      console.log(`Created backup of votes at ${backupPath}`);
    }
  }
}

// Helper function to wait for a lock to release
async function waitForLock(maxRetries = MAX_RETRY_COUNT, delay = RETRY_DELAY_MS): Promise<boolean> {
  let retries = 0;
  while (isWriting && retries < maxRetries) {
    await new Promise(resolve => setTimeout(resolve, delay));
    retries++;
  }
  return !isWriting;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle GET request to get vote counts and user's vote status for a post
  if (req.method === 'GET') {
    const { postId } = req.query;
    
    if (!postId) {
      return res.status(400).json({ message: 'Post ID is required' });
    }

    // Get the client's IP address from the request headers
    const forwarded = req.headers["x-forwarded-for"];
    const ipAddress = typeof forwarded === 'string'
      ? forwarded.split(/, /)[0]
      : req.socket.remoteAddress || 'unknown';

    // Count the votes for the post (only count thumbs up)
    const thumbsUpCount = votes.filter(
      vote => vote.postId === postId && vote.voteType === 'up'
    ).length;

    // Check if the user has already voted
    const userVoted = votes.some(vote => vote.postId === postId && vote.ipAddress === ipAddress);

    return res.status(200).json({
      thumbsUpCount,
      userVoted
    });
  }
  // Handle POST request to record or remove a vote
  else if (req.method === 'POST') {
    const { postId, voteType, clientData, action = 'add' } = req.body;
    
    // Get the client's IP address from the request headers
    const forwarded = req.headers["x-forwarded-for"];
    const ipAddress = typeof forwarded === 'string'
      ? forwarded.split(/, /)[0]
      : req.socket.remoteAddress || 'unknown';

    if (!postId) {
      return res.status(400).json({ message: 'Post ID is required' });
    }

    // Find if the user has already voted
    const existingVoteIndex = votes.findIndex(vote => vote.postId === postId && vote.ipAddress === ipAddress);
    const hasVoted = existingVoteIndex !== -1;

    // Handle action based on whether adding or removing vote
    if (action === 'add') {
      // Don't allow adding if already voted
      if (hasVoted) {
        return res.status(400).json({ message: 'You have already voted for this post.' });
      }
      
      if (!voteType) {
        return res.status(400).json({ message: 'Vote type is required when adding a vote' });
      }

      // Record the vote
      const newVote = {
        postId,
        ipAddress,
        voteType,
        clientData,
        timestamp: new Date().toISOString()
      };
      votes.push(newVote);
      
      // Save the updated votes to the JSON file - ensure we don't lose data
      try {
        // Wait for any pending writes to complete
        if (!await waitForLock()) {
          return res.status(503).json({ message: 'Server busy, please try again.' });
        }
        
        isWriting = true;
        
        // Create a temporary file first
        const tempPath = `${votesFilePath}.temp`;
        fs.writeFileSync(tempPath, JSON.stringify(votes, null, 2));
        
        // Then rename it to the actual file (atomic operation)
        fs.renameSync(tempPath, votesFilePath);
      } catch (error) {
        console.error('Error saving votes:', error);
        // Revert the in-memory state to avoid inconsistency
        votes.splice(votes.length - 1, 1);
        throw new Error('Failed to save vote data');
      } finally {
        isWriting = false;
      }
      
      return res.status(200).json({
        message: 'Vote recorded successfully.',
        action: 'added'
      });
    }
    else if (action === 'remove') {
      // Can't remove if not voted
      if (!hasVoted) {
        return res.status(400).json({ message: 'You have not voted for this post yet.' });
      }
      
      // Remove the vote
      votes.splice(existingVoteIndex, 1);
      
      // Save the updated votes to the JSON file - ensure we don't lose data
      try {
        // Wait for any pending writes to complete
        if (!await waitForLock()) {
          return res.status(503).json({ message: 'Server busy, please try again.' });
        }
        
        isWriting = true;
        
        // Reload the votes file to ensure we have the latest data
        if (fs.existsSync(votesFilePath)) {
          const fileData = fs.readFileSync(votesFilePath, 'utf8');
          const latestVotes = JSON.parse(fileData);
          
          // Make sure we haven't lost the vote we just removed
          if (existingVoteIndex !== -1 && latestVotes.some((v: Vote) =>
            v.postId === postId && v.ipAddress === ipAddress)) {
            // Find the vote in the latest data
            const latestVoteIndex = latestVotes.findIndex((v: Vote) =>
              v.postId === postId && v.ipAddress === ipAddress);
            if (latestVoteIndex !== -1) {
              latestVotes.splice(latestVoteIndex, 1);
              votes = latestVotes;
            }
          }
        }
        
        // Create a temporary file first
        const tempPath = `${votesFilePath}.temp`;
        fs.writeFileSync(tempPath, JSON.stringify(votes, null, 2));
        
        // Then rename it to the actual file (atomic operation)
        fs.renameSync(tempPath, votesFilePath);
      } catch (error) {
        console.error('Error saving votes:', error);
        throw new Error('Failed to save vote data');
      } finally {
        isWriting = false;
      }
      
      return res.status(200).json({
        message: 'Vote removed successfully.',
        action: 'removed'
      });
    }
    
    return res.status(400).json({ message: 'Invalid action. Must be "add" or "remove".' });
  } else {
    return res.status(405).json({ message: 'Method not allowed.' });
  }
}