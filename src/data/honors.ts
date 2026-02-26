export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export interface Alumni {
  name: string;
  role: string;
  achievement: string;
  year: number;
}

export interface Achievement {
  text: string;
  year: number;
}

export const stats: Stat[] = [
  { label: "Years of Excellence", value: 40, suffix: "" },
  { label: "Graduates Worldwide", value: 50000, suffix: "+" },
  { label: "Countries Represented", value: 80, suffix: "+" },
  { label: "Research Publications", value: 12000, suffix: "+" },
];

export const notableAlumni: Alumni[] = [
  { name: "Dr. Ani Sargsyan", role: "Chief Scientist, CERN", achievement: "Led particle physics research team", year: 1994 },
  { name: "Armen Gevorgyan", role: "CEO, TechVision Global", achievement: "Built a $2B tech company", year: 1998 },
  { name: "Dr. Lilit Hakobyan", role: "Dean, MIT Engineering", achievement: "Pioneer in quantum computing", year: 2001 },
  { name: "Vardan Petrosyan", role: "UN Ambassador", achievement: "Championed education policy globally", year: 1992 },
  { name: "Nare Avagyan", role: "Founder, GreenTech AI", achievement: "Forbes 30 Under 30 honoree", year: 2016 },
  { name: "Hayk Martirosyan", role: "Director, WHO Regional", achievement: "Led pandemic response strategy", year: 2005 },
];

export const achievements: Achievement[] = [
  { text: "UNESCO Education Excellence Award 2022", year: 2022 },
  { text: "Top 200 Global University Ranking", year: 2014 },
  { text: "National Innovation Prize", year: 2019 },
  { text: "Best Research Output in Region", year: 2021 },
  { text: "Carbon Neutral Campus Certification", year: 2023 },
  { text: "International Accreditation Renewed", year: 2024 },
  { text: "Community Impact Leader Award", year: 2025 },
  { text: "Digital Learning Pioneer Recognition", year: 2020 },
];
