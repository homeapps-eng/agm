export interface VisionCard {
  title: string;
  description: string;
  icon: string;
}

export interface Quote {
  text: string;
  author: string;
  role: string;
}

export const visionCards: VisionCard[] = [
  { title: "AI-Powered Learning", description: "Personalized education pathways driven by artificial intelligence, adapting to every student's unique journey.", icon: "Brain" },
  { title: "Global Campus Network", description: "Satellite campuses on three continents, connected by immersive virtual collaboration technology.", icon: "Globe" },
  { title: "Sustainability Leadership", description: "Net-zero operations by 2030 with renewable energy, green architecture, and sustainable research.", icon: "Leaf" },
  { title: "Open Knowledge", description: "All research and coursework freely available, democratizing access to world-class education.", icon: "BookOpen" },
];

export const quotes: Quote[] = [
  { text: "AGM gave me not just knowledge, but the courage to reimagine what's possible.", author: "Dr. Ani Sargsyan", role: "Class of 1994" },
  { text: "The friendships and mentorship I found here shaped every success that followed.", author: "Armen Gevorgyan", role: "Class of 1998" },
  { text: "This institution proves that a commitment to excellence transcends borders.", author: "Dr. Maria Chen", role: "Visiting Scholar" },
  { text: "Forty years of impact — and the best is yet to come.", author: "Prof. David Abrahamyan", role: "AGM President" },
  { text: "AGM taught me that innovation starts with asking the right questions.", author: "Nare Avagyan", role: "Class of 2016" },
];
