import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a SOL amount string, stripping unnecessary trailing zeros. */
export function formatSol(amount: string | number | undefined | null): string {
  const n = parseFloat(String(amount ?? "0"));
  if (isNaN(n)) return "0";
  // Up to 9 decimal places (SOL precision), but strip trailing zeros
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 9,
  });
}
