export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
}

export interface Speaker {
  name: string;
  title: string;
  topic: string;
}

export const galaInfo = {
  date: "November 14, 2026",
  time: "6:00 PM - 11:00 PM",
  venue: "Richard Nixon Presidential Library, Yorba Linda, CA",
  address: "18001 Yorba Linda Blvd, Yorba Linda, CA 92886",
  dressCode: "Occasion Attire (Black Tie Optional)",
};

export const schedule: ScheduleItem[] = [];

export const speakers: Speaker[] = [];
