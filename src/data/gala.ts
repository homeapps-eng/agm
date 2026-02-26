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
  date: "September 15, 2026",
  time: "6:00 PM - 11:00 PM",
  venue: "AGM Grand Hall & Gardens",
  address: "1 University Avenue, Yerevan, Armenia",
  dressCode: "Black Tie Optional",
};

export const schedule: ScheduleItem[] = [
  { time: "6:00 PM", title: "Welcome Reception", description: "Cocktails and networking in the Grand Foyer" },
  { time: "7:00 PM", title: "Opening Ceremony", description: "Remarks by the President and Board of Trustees" },
  { time: "7:30 PM", title: "Keynote Address", description: "\"The Future of Knowledge\" by Dr. Ani Sargsyan" },
  { time: "8:15 PM", title: "Awards Presentation", description: "Honoring distinguished alumni and faculty" },
  { time: "9:00 PM", title: "Gala Dinner", description: "Three-course dinner with live entertainment" },
  { time: "10:00 PM", title: "Anniversary Toast", description: "Champagne toast and 40th anniversary video premiere" },
  { time: "10:30 PM", title: "Dancing & Celebration", description: "Live band and open dance floor" },
];

export const speakers: Speaker[] = [
  { name: "Dr. Ani Sargsyan", title: "Chief Scientist, CERN", topic: "The Future of Knowledge" },
  { name: "Prof. David Abrahamyan", title: "AGM President", topic: "40 Years: Our Journey" },
  { name: "Armen Gevorgyan", title: "CEO, TechVision Global", topic: "Innovation & Impact" },
  { name: "Dr. Maria Chen", title: "Nobel Laureate, Physics", topic: "Science Without Borders" },
];
