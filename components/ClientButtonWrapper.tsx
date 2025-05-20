"use client";

import { ReactNode } from "react";

interface ClientButtonWrapperProps {
  children: ReactNode;
}

export default function ClientButtonWrapper({ children }: ClientButtonWrapperProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div onClick={handleClick}>
      {children}
    </div>
  );
}