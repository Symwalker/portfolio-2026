import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges class names using clsx and tailwind-merge to avoid duplicates/conflicts.
 * @param {...import("clsx").ClassValue} inputs - Array of class names or conditional class objects.
 * @returns {string} - Merged class name string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
