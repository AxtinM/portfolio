"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface ThumbsUpButtonProps {
  postId: string;
  large?: boolean;
}

export default function ThumbsUpButton({ postId, large = false }: ThumbsUpButtonProps) {
  const [thumbsUpCount, setThumbsUpCount] = useState<number>(0);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // Fetch the current thumbs up count and user's vote status for this post
  useEffect(() => {
    const fetchVoteData = async () => {
      try {
        const response = await fetch(`/api/vote?postId=${postId}`);
        if (response.ok) {
          const data = await response.json();
          setThumbsUpCount(data.thumbsUpCount);
          setHasVoted(data.userVoted);
        }
      } catch (error) {
        console.error("Error fetching vote data:", error);
      }
    };

    fetchVoteData();
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

  // Handle vote toggling
  const handleVoteToggle = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      // Get client machine data (only needed for adding)
      const clientData = !hasVoted ? getClientData() : undefined;

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
          action: hasVoted ? "remove" : "add"
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Update UI based on action
        if (data.action === "added") {
          setThumbsUpCount((prev) => prev + 1);
          setHasVoted(true);
        } else if (data.action === "removed") {
          setThumbsUpCount((prev) => Math.max(0, prev - 1));
          setHasVoted(false);
        }
        
        // Refresh the data
        router.refresh();
      } else {
        const errorData = await response.json();
        console.error("Error with vote:", errorData.message);
      }
    } catch (error) {
      console.error("Error during voting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Define animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.button
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onClick={handleVoteToggle}
      disabled={isLoading}
      className={`flex items-center ${large ? 'space-x-3 py-2 px-4' : 'space-x-2 py-1 px-3'} rounded-full 
        ${hasVoted 
          ? "bg-primary/20 text-primary" 
          : "bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground"
        } transition-colors`}
      aria-label={hasVoted ? "Remove vote" : "Vote up"}
      title={hasVoted ? "Click to remove your vote" : "Click to vote up"}
    >
      {/* Thumbs up icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={large ? "24" : "18"}
        height={large ? "24" : "18"}
        viewBox="0 0 24 24"
        fill={hasVoted ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 10v12" />
        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
      </svg>
      
      {/* Vote count */}
      <span className={`font-medium ${large ? 'text-lg' : ''}`}>
        {isLoading ? "..." : thumbsUpCount}
      </span>
    </motion.button>
  );
}