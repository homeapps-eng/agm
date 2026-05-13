export interface AGMEvent {
  id: string;
  title: string;
  date: string; // ISO date, e.g. "2026-09-12"
  time?: string;
  location?: string;
  description: string;
  instagramUrl?: string;
  imageUrl?: string;
}

export const events: AGMEvent[] = [];
