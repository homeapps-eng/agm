export interface ScheduleItem {
  title: string;
  /** Who leads this part of the program */
  speaker?: string;
  /** Shown after the speaker's name, e.g. "Master of Ceremonies" */
  role?: string;
}

export const galaInfo = {
  date: "November 14, 2026",
  weekday: "Saturday",
  time: "6:00 PM - 12:00 AM",
  venue: "Richard Nixon Presidential Library, Yorba Linda, CA",
  venueName: "Richard Nixon Presidential Library",
  address: "18001 Yorba Linda Blvd, Yorba Linda, CA 92886",
  dressCode: "Occasion Attire",
  dressCodeNote: "Black Tie Optional",
  donateUrl: "https://givebutter.com/c/agmgala",
};

export interface ScheduleSegment {
  /** Time range shown above this part of the program */
  time: string;
  items: ScheduleItem[];
}

// From the Program page of the gala ad book
export const schedule: ScheduleSegment[] = [
  {
    time: "7:30 PM – 9:00 PM",
    items: [
      { title: "Opening Remarks", speaker: "Sona Movsessian", role: "Master of Ceremonies" },
      { title: "Anthems", speaker: "Megheti Bedourian", role: "Class of 2023" },
      { title: "Invocation and Prayer", speaker: "Rev. Father Karekin Bedourian", role: "Pastor" },
      { title: "School Board Message", speaker: "Arpie Baghdassarian Esq.", role: "Chairwoman" },
      { title: "Patron Message", speaker: "Arthur Atinizian", role: "School Board Member" },
      { title: "Principal’s Message", speaker: "Ani Sarkissian" },
      { title: "Presentation of Faculty Recognition Awards" },
      { title: "Alumni Remarks", speaker: "Sarkis Tatarian", role: "Class of 2002" },
      { title: "Benediction", speaker: "H.E. Archbishop Kegham Khatcherian", role: "Prelate" },
    ],
  },
  {
    time: "9:00 PM – 12:00 AM",
    items: [{ title: "Entertainment", speaker: "Allen G. Band" }],
  },
];
