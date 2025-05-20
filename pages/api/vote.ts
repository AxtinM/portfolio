import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// Define the path to the JSON file
const votesFilePath = path.join(process.cwd(), 'data', 'votes.json');

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
let votes: Vote[] = [];
if (fs.existsSync(votesFilePath)) {
  const fileData = fs.readFileSync(votesFilePath, 'utf8');
  votes = JSON.parse(fileData);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle GET request to get vote counts for a post
  if (req.method === 'GET') {
    const { postId } = req.query;
    
    if (!postId) {
      return res.status(400).json({ message: 'Post ID is required' });
    }

    // Count the votes for the post (only count thumbs up)
    const thumbsUpCount = votes.filter(
      vote => vote.postId === postId && vote.voteType === 'up'
    ).length;

    return res.status(200).json({ thumbsUpCount });
  }
  // Handle POST request to record a vote
  else if (req.method === 'POST') {
    const { postId, voteType, clientData } = req.body;
    
    // Get the client's IP address from the request headers
    const forwarded = req.headers["x-forwarded-for"];
    const ipAddress = typeof forwarded === 'string'
      ? forwarded.split(/, /)[0]
      : req.socket.remoteAddress || 'unknown';

    if (!postId || !voteType) {
      return res.status(400).json({ message: 'Post ID and vote type are required' });
    }

    // Check if the IP has already voted for the post
    const existingVote = votes.find(vote => vote.postId === postId && vote.ipAddress === ipAddress);
    if (existingVote) {
      return res.status(400).json({ message: 'You have already voted for this post.' });
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

    // Save the updated votes to the JSON file
    fs.writeFileSync(votesFilePath, JSON.stringify(votes, null, 2));

    return res.status(200).json({ message: 'Vote recorded successfully.' });
  } else {
    return res.status(405).json({ message: 'Method not allowed.' });
  }
}