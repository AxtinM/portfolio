import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Placeholder for 21dev badge component.
 * Replace with 21dev badge when MCP is available.
 */
export const Badge = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & { color?: string }
>(({ className, color, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "inline-block rounded px-2 py-1 text-xs font-semibold bg-secondary text-secondary-foreground",
      className
    )}
    style={color ? { backgroundColor: color } : undefined}
    {...props}
  />
));
Badge.displayName = "Badge";