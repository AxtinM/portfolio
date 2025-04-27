"use client";

import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

export const TerminalLine = () => {

  const [path, setPath] = React.useState("");
  const router = useRouter();
  const regex = /cd\s+(\w+)/;
  const correctPaths = ["about", "contact"]

  const handlePathCheck = (path: string) => {
    return correctPaths.includes(path.toLowerCase())
  }


  const isCorrectPath = useMemo(() => handlePathCheck(path), [path])

  const handleKeyDown = (e: any) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      const value = e.target.value;
      e.target.value =
        value.substring(0, selectionStart) + "\t" + value.substring(selectionEnd);
      e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;
      e.target.dispatchEvent(new Event("input", { bubbles: true }));
    }
    if (e.key === "Enter") {
      if (e.target.value) {
        const match = regex.exec(e.target.value)
        if (match) {
          if (handlePathCheck(match[1])) {
            setPath(match[1])
          } else {
            e.target.value = ""
          }
        } else {
          e.target.value = ""
        }
      }
    }
  };

  if (isCorrectPath) {
    router.push("/about")
  }

  return (
    <div>
      {"C:\\> "}
      <input
        type="text"
        autoFocus
        className="outline-none animate-blink"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};


