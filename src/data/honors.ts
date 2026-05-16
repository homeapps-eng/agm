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
  { label: "Students", value: 3456, suffix: "" },
  { label: "Alumni", value: 246, suffix: "" },
  { label: "Students Enrolled", value: 188, suffix: "" },
  { label: "Faculty Members", value: 36, suffix: "" },
];

export const notableAlumni: Alumni[] = [
  { name: "To Be Provided", role: "", achievement: "Achievement", year: 2000 },
  { name: "To Be Provided", role: "", achievement: "Achievement", year: 2000 },
  { name: "To Be Provided", role: "", achievement: "Achievement", year: 2000 },
  { name: "To Be Provided", role: "", achievement: "Achievement", year: 2000 },
  { name: "To Be Provided", role: "", achievement: "Achievement", year: 2000 },
  { name: "To Be Provided", role: "", achievement: "Achievement", year: 2000 },
];

export const achievements: Achievement[] = [
  { text: "Achievement", year: 2000 },
  { text: "Achievement", year: 2000 },
  { text: "Achievement", year: 2000 },
  { text: "Achievement", year: 2000 },
  { text: "Achievement", year: 2000 },
  { text: "Achievement", year: 2000 },
  { text: "Achievement", year: 2000 },
  { text: "Achievement", year: 2000 },
];
