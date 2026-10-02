import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const INSTAGRAM_POST = /instagram\.com\/(?:[^/]+\/)?(p|reel|tv)\/([^/?#]+)/;

export function toInstagramEmbed(url: string): string {
  const match = url.match(INSTAGRAM_POST);
  if (!match) return url;
  return `https://www.instagram.com/${match[1]}/${match[2]}/embed`;
}

const SHORTCODE_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
const INSTAGRAM_ID_EPOCH_MS = 1314220021721;

// When an Instagram post was published (ms since 1970), read from its link: the shortcode is the
// post's media ID in base 64, and the ID's top bits are milliseconds since Instagram's ID epoch.
export function instagramPostedAt(url: string): number | null {
  const code = url.match(INSTAGRAM_POST)?.[2];
  if (!code || code.length > 11) return null;
  let id = 0;
  for (const ch of code) {
    const digit = SHORTCODE_ALPHABET.indexOf(ch);
    if (digit < 0) return null;
    id = id * 64 + digit;
  }
  return Math.floor(id / 2 ** 23) + INSTAGRAM_ID_EPOCH_MS;
}
