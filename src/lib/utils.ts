import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toInstagramEmbed(url: string): string {
  const match = url.match(/instagram\.com\/(?:[^/]+\/)?(p|reel|tv)\/([^/?#]+)/);
  if (!match) return url;
  return `https://www.instagram.com/${match[1]}/${match[2]}/embed`;
}
