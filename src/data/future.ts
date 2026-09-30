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

export const visionIntro =
  "As we celebrate 40 years of Ari Guiragos Minassian Armenian School, we are not only reflecting on how far we have come, but we are looking ahead to all that is still possible.";

export const visionCards: VisionCard[] = [
  { title: "Growth & Expansion", description: "Our vision for the next 40 years is one of growth, expansion, and continued excellence. As our school community grows, so does our commitment to creating opportunities for our students to continue their educational journey at AGM. An important part of that future is the expansion of our program into the junior high years, allowing our students to remain rooted in the community, values, and Armenian identity that have shaped their earliest years.", icon: "Sprout" },
  { title: "Excellence & Innovation", description: "We envision an AGM that continues to strengthen its academic programs, thoughtfully embraces innovation, invests in exceptional educators, expands and enhances its campus and facilities, and provides students with even greater opportunities to learn, lead, create, and serve.", icon: "Lightbulb" },
  { title: "The Heart of AGM", description: "Through all of that growth, however, the heart of AGM will remain unchanged: our children and our Armenian identity.", icon: "Heart" },
  { title: "Carrying Our Heritage Forward", description: "For the next 40 years and beyond, our responsibility is to ensure that generations of Armenian-American children have a place where academic excellence and Armenian identity grow side by side—a place where they know who they are, understand where they come from, and recognize their responsibility to carry our language, culture, faith, and heritage forward.", icon: "Landmark" },
];

export const visionStatement =
  "Our story began 40 years ago. Our legacy is what was built. Our future is what we build together.";

export const quotes: Quote[] = [
  { text: "Train up a child in the way he should go, and when he is old, he will not depart from it.", author: "Vahram Shemmasin", role: "Principal, 1995" },
  { text: "AGM is home away from home.", author: "PTO", role: "1999" },
  { text: "Իմ նշանաբանս է կեանքի մեջ միշտ փորձել յաջողիլ", author: "Saro Baghjajian", role: "Class of 1993, Credit Card Consulting Vice President" },
  { text: "Ես ազատ եմ ըլլալու Բարկացկոտ, թէեւ կ՚ըսեն Գործօն եմ երբ բան մը չսիրեմ Դժգոհ կ՚ըլլամ, որովհետեւ Եզակի եմ։ Ուրախ Զուարթ եմ, Էականը այդ չէ՞ միթէ։", author: "Vache A. Thomassian", role: "Class of 1996, Employment and Labor Lawyer" },
  { text: "Anything worth doing is worth doing well", author: "Karine Codilian", role: "Class of 2012, UCLA Senior and AUF PR Committee Chair" },
];
