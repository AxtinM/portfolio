"use client";

import { useState, useEffect } from "react";

interface VoteDisplayProps {
  postId: string;
}

export default function VoteDisplay({ postId }: VoteDisplayProps) {
  const [thumbsUpCount, setThumbsUpCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch the current thumbs up count for this post
  useEffect(() => {
    const fetchVotes = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/vote?postId=${postId}`);
        if (response.ok) {
          const data = await response.json();
          setThumbsUpCount(data.thumbsUpCount);
          // We don't need userVoted in the display component
        }
      } catch (error) {
        console.error("Error fetching vote count:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVotes();
  }, [postId]);

  return (
    <div className="flex items-center space-x-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      >
        <path d="M7 10v12" />
        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
      </svg>
      <span className="text-sm font-medium">
        {isLoading ? "..." : thumbsUpCount}
      </span>
    </div>
  );
}