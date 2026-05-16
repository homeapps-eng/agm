export interface AGMEvent {
  id: string;
  title: string;
  date: string; // ISO date, e.g. "2026-09-12"
  time?: string;
  location?: string;
  description: string;
  instagramUrl?: string;
  instagramPostUrl?: string; // a specific post URL, e.g. https://www.instagram.com/p/<id>/
  imageUrl?: string;
}

export const events: AGMEvent[] = [
  {
    id: "ig-post-1",
    title: "From @agm40years",
    date: "2026-06-01",
    description: "Latest update from the AGM 40th Anniversary Instagram.",
    instagramUrl: "https://www.instagram.com/agm40years/",
    instagramPostUrl: "https://www.instagram.com/p/DYDmCz3Dybt/",
  },
  {
    id: "ig-post-2",
    title: "From @agm40years",
    date: "2026-05-20",
    description: "Latest update from the AGM 40th Anniversary Instagram.",
    instagramUrl: "https://www.instagram.com/agm40years/",
    instagramPostUrl: "https://www.instagram.com/p/DXaOHI4D5CT/",
  },
  {
    id: "ig-post-3",
    title: "From @agm40years",
    date: "2026-05-10",
    description: "Latest update from the AGM 40th Anniversary Instagram.",
    instagramUrl: "https://www.instagram.com/agm40years/",
    instagramPostUrl: "https://www.instagram.com/p/DXAxtSgCRTc/",
  },
];
