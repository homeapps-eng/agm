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
  { text: "Train up a child in the way he should go, and when he is old, he will not depart from it.", author: "Vahram Shemmasin", role: "Principal, 1995" },
  { text: "AGM is home away from home.", author: "PTO", role: "1999" },
  { text: "Իմ նշանաբանս է կեանքի մեջ միշտ փորձել յաջողիլ", author: "Saro Baghjajian", role: "Class of 1993, Credit Card Consulting Vice President" },
  { text: "Ես ազատ եմ ըլլալու Բարկացկոտ, թէեւ կ՚ըսեն Գործօն եմ երբ բան մը չսիրեմ Դժգոհ կ՚ըլլամ, որովհետեւ Եզակի եմ։ Ուրախ Զուարթ եմ, Էականը այդ չէ՞ միթէ։", author: "Vache A. Thomassian", role: "Class of 1996, Employment and Labor Lawyer" },
  { text: "Anything worth doing is worth doing well", author: "Karine Codilian", role: "Class of 2012, UCLA Senior and AUF PR Committee Chair" },
];
