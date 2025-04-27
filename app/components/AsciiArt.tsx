"use client"

import { useEffect, useState } from "react"

interface AsciiArtProps {
  largeArt: string
  smallArt: string
  className?: string
}

export default function AsciiArt({ largeArt, smallArt, className = "" }: AsciiArtProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== "undefined") {
      // Initial check
      setIsMobile(window.innerWidth < 768)

      // Add resize listener
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768)
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className={`ascii-container ${className}`}>
      <pre className="text-center overflow-visible whitespace-pre">{isMobile ? smallArt : largeArt}</pre>
    </div>
  )
}

