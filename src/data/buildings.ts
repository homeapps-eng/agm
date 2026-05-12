export interface Building {
  id: string;
  name: string;
  category: string;
  description: string;
  highlights: string[];
  lat: number;
  lng: number;
  heading: number;
  accentColor: string;
}

export const buildings: Building[] = [
  {
    id: "church",
    name: "Forty Martyrs Church",
    category: "Spiritual Home",
    description:
      "The Forty Martyrs Armenian Apostolic Church anchors the AGM community in faith and heritage. Built alongside the school, it remains the heart of countless gatherings, blessings, and celebrations.",
    highlights: [
      "Founded alongside AGM",
      "Houses Armenian liturgy & sacraments",
      "Heart of community life",
    ],
    lat: 33.73886,
    lng: -117.938866,
    heading: 0,
    accentColor: "#fbbf24",
  },
  {
    id: "agm-school",
    name: "AGM Main School",
    category: "Education",
    description:
      "Ari Guiragos Minassian Armenian School has served PK–6th grade students since 1986. WASC-accredited through 2029, it is the soul of the campus.",
    highlights: ["PK–6th grade", "WASC-accredited through 2029", "188 students enrolled"],
    lat: 33.73886,
    lng: -117.9383,
    heading: 0,
    accentColor: "#8b5cf6",
  },
  {
    id: "gugasian-hall",
    name: "Gugasian Hall",
    category: "Events",
    description:
      "The campus event venue hosting the Annual Banquet, cultural performances, and community gatherings year-round.",
    highlights: ["Annual Banquet venue", "Cultural performances", "Community gatherings"],
    lat: 33.739175,
    lng: -117.938418,
    heading: 0,
    accentColor: "#10b981",
  },
  {
    id: "barsamian-center",
    name: "Harut Barsamian Center",
    category: "Cultural",
    description:
      "A cultural and community center supporting Armenian heritage programming, language preservation, and social gatherings.",
    highlights: ["Heritage programs", "Language preservation", "Social events"],
    lat: 33.73886,
    lng: -117.937998,
    heading: 0,
    accentColor: "#f43f5e",
  },
  {
    id: "preschool",
    name: "Preschool & Outdoor Classroom",
    category: "Early Years",
    description:
      "The preschool division features a renovated outdoor classroom with art stations, block stations, and a sensory garden.",
    highlights: ["Outdoor classroom", "Art & block stations", "Sensory garden"],
    lat: 33.7389,
    lng: -117.9387,
    heading: 0,
    accentColor: "#0ea5e9",
  },
  {
    id: "sports",
    name: "Sports Facilities",
    category: "Athletics",
    description:
      "Basketball court and open soccer field used for PE classes, recess, after-school programs, and interschool matches.",
    highlights: ["Basketball court", "Soccer field", "After-school programs"],
    lat: 33.7384,
    lng: -117.9387,
    heading: 0,
    accentColor: "#f97316",
  },
];
