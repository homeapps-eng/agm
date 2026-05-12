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

export const events: AGMEvent[] = [
  {
    id: "placeholder-1",
    title: "Save the Date Announcement",
    date: "2026-06-01",
    time: "6:00 PM",
    location: "Forty Martyrs Hall",
    description:
      "Official kickoff of the AGM 40th Anniversary celebrations. Refreshments, remarks, and a sneak peek at what's ahead.",
    instagramUrl: "https://www.instagram.com/agm40years/",
  },
  {
    id: "placeholder-2",
    title: "Alumni Reunion Picnic",
    date: "2026-08-15",
    time: "12:00 PM",
    location: "Campus Lawn",
    description:
      "Generations of AGM graduates reunite for an afternoon of food, memories, and music.",
    instagramUrl: "https://www.instagram.com/agm40years/",
  },
  {
    id: "placeholder-3",
    title: "Heritage Lecture Series",
    date: "2026-10-08",
    time: "7:00 PM",
    location: "Gugasian Hall",
    description:
      "A guest speaker series exploring Armenian heritage, education, and community impact across four decades.",
    instagramUrl: "https://www.instagram.com/agm40years/",
  },
];
