/**
 * Calculates the estimated reading time for a given text
 * @param text The text content to estimate reading time for
 * @param wordsPerMinute The average reading speed in words per minute
 * @returns The estimated reading time in minutes
 */
export function calculateReadingTime(text: string, wordsPerMinute = 200): number {
  // Count words (split by spaces and filter out empty strings)
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  
  // Calculate reading time in minutes
  const minutes = Math.ceil(words / wordsPerMinute);
  
  return minutes;
}

/**
 * Formats the reading time in a human-friendly way
 * @param minutes The reading time in minutes
 * @returns A formatted string representing the reading time
 */
export function formatReadingTime(minutes: number): string {
  if (minutes < 1) {
    return 'Less than a minute';
  } else if (minutes === 1) {
    return '1 minute';
  } else if (minutes < 5) {
    return `${minutes} minutes`;
  } else if (minutes < 10) {
    return 'About 5 minutes';
  } else if (minutes < 15) {
    return 'About 10 minutes';
  } else if (minutes < 25) {
    return 'About 15-20 minutes';
  } else if (minutes < 35) {
    return 'About 30 minutes';
  } else {
    return `${Math.round(minutes / 10) * 10}+ minutes`;
  }
}