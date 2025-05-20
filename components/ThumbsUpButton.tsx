"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface ThumbsUpButtonProps {
  postId: string;
  large?: boolean;
}

export default function ThumbsUpButton({ postId, large = false }: ThumbsUpButtonProps) {
  const [thumbsUpCount, setThumbsUpCount] = useState<number>(0);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showThankYou, setShowThankYou] = useState<boolean>(false);
  const router = useRouter();

  // Fetch the current thumbs up count for this post
  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await fetch(`/api/vote?postId=${postId}`);
        if (response.ok) {
          const data = await response.json();
          setThumbsUpCount(data.thumbsUpCount);
        }
      } catch (error) {
        console.error("Error fetching vote count:", error);
      }
    };

    fetchVotes();

    // Check if user has already voted on this post
    const hasUserVoted = localStorage.getItem(`voted-${postId}`);
    if (hasUserVoted) {
      setHasVoted(true);
    }
  }, [postId]);

  // Capture client machine data
  const getClientData = () => {
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      colorDepth: window.screen.colorDepth,
      referrer: document.referrer,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  };

  // Handle voting
  const handleVote = async () => {
    if (hasVoted || isLoading) return;

    setIsLoading(true);

    try {
      // Get client machine data
      const clientData = getClientData();

      // Send vote to API
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          voteType: "up",
          clientData,
        }),
      });

      if (response.ok) {
        // Update UI
        setThumbsUpCount((prev) => prev + 1);
        setHasVoted(true);
        
        // Show thank you message
        setShowThankYou(true);
        setTimeout(() => setShowThankYou(false), 3000);
        
        // Save vote in localStorage to prevent multiple votes
        localStorage.setItem(`voted-${postId}`, "true");
        
        // Refresh the data
        router.refresh();
      } else {
        const errorData = await response.json();
        console.error("Error voting:", errorData.message);
      }
    } catch (error) {
      console.error("Error during voting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            Thanks for your vote!
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleVote}
        disabled={hasVoted || isLoading}
        className={`flex items-center ${large ? 'space-x-3 py-2 px-4' : 'space-x-2 py-1 px-3'} rounded-full ${
          hasVoted
            ? "bg-primary/20 text-primary"
            : "bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground"
        } transition-colors`}
        aria-label="Thumbs up"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={large ? "24" : "18"}
          height={large ? "24" : "18"}
          viewBox="0 0 24 24"
          fill={hasVoted ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={hasVoted ? "text-primary" : ""}
          animate={hasVoted ? { y: [0, -5, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <path d="M7 10v12" />
          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
        </motion.svg>
        <span className={`font-medium ${large ? 'text-lg' : ''}`}>
          {isLoading ? "..." : thumbsUpCount}
        </span>
      </motion.button>
    </div>
  );
}