export interface CampusLocation {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  category: "school" | "church" | "hall" | "center" | "sports" | "outdoor";
}

export const campusLocations: CampusLocation[] = [
  {
    id: "main-school",
    name: "AGM Main School Building",
    description: "The heart of Ari Guiragos Minassian Armenian School, serving PK-6th grade students since 1986. WASC-accredited through 2029.",
    x: 50,
    y: 35,
    category: "school",
  },
  {
    id: "church",
    name: "Forty Martyrs Armenian Apostolic Church",
    description: "The spiritual home of the AGM community. The church and school share a deep bond rooted in Armenian faith and heritage.",
    x: 70,
    y: 45,
    category: "church",
  },
  {
    id: "gugasian-hall",
    name: "Gugasian Hall",
    description: "The campus event venue hosting the Annual Banquet, cultural celebrations, and community gatherings.",
    x: 75,
    y: 28,
    category: "hall",
  },
  {
    id: "barsamian-center",
    name: "Harut Barsamian Armenian Center",
    description: "A cultural and community center supporting Armenian heritage programming, events, and social gatherings.",
    x: 58,
    y: 62,
    category: "center",
  },
  {
    id: "basketball-court",
    name: "Basketball Court",
    description: "Outdoor basketball court for students, physical education, and after-school programs.",
    x: 22,
    y: 30,
    category: "sports",
  },
  {
    id: "soccer-field",
    name: "Soccer Field",
    description: "Open soccer field used for PE classes, recess, and interschool matches.",
    x: 22,
    y: 55,
    category: "sports",
  },
  {
    id: "preschool",
    name: "Preschool & Outdoor Classroom",
    description: "The preschool division featuring a renovated outdoor classroom with art stations, block stations, and a garden.",
    x: 45,
    y: 75,
    category: "outdoor",
  },
];
