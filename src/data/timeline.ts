export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  decade: string;
  highlight?: boolean;
}

export const timelineEvents: TimelineEvent[] = [
  { year: 1986, title: "AGM Founded", description: "Established as a pioneering institution dedicated to advancing knowledge and innovation.", decade: "1980s", highlight: true },
  { year: 1988, title: "First Graduating Class", description: "32 students received their diplomas in a ceremony that set the tone for decades of excellence.", decade: "1980s" },
  { year: 1990, title: "Research Center Opens", description: "The state-of-the-art research center opened its doors, catalyzing groundbreaking work.", decade: "1990s" },
  { year: 1993, title: "International Exchange Program", description: "Partnerships with 12 universities worldwide launched our global academic network.", decade: "1990s" },
  { year: 1995, title: "Library Expansion", description: "The Harutyunyan Library doubled in size, becoming the region's largest academic collection.", decade: "1990s" },
  { year: 1998, title: "10,000th Student Enrolled", description: "A milestone marking AGM's growing impact on education in the region.", decade: "1990s", highlight: true },
  { year: 2001, title: "Technology Hub Launched", description: "AGM became a regional leader in computer science and engineering education.", decade: "2000s" },
  { year: 2004, title: "Accreditation Excellence", description: "Received international accreditation, affirming world-class educational standards.", decade: "2000s" },
  { year: 2006, title: "20th Anniversary Celebration", description: "Two decades of impact celebrated with alumni from across the globe.", decade: "2000s", highlight: true },
  { year: 2009, title: "Sustainability Initiative", description: "AGM committed to carbon neutrality with campus-wide green infrastructure.", decade: "2000s" },
  { year: 2011, title: "Innovation Center", description: "A new facility dedicated to startups and entrepreneurial ventures by students and faculty.", decade: "2010s" },
  { year: 2014, title: "Global Top 200 Ranking", description: "Recognized among the world's top 200 institutions for research output.", decade: "2010s", highlight: true },
  { year: 2016, title: "30th Anniversary & New Campus", description: "Opened a second campus with cutting-edge facilities for 5,000 additional students.", decade: "2010s" },
  { year: 2018, title: "AI Research Breakthrough", description: "AGM researchers published groundbreaking work in machine learning, cited over 2,000 times.", decade: "2010s" },
  { year: 2020, title: "Digital Transformation", description: "Seamlessly transitioned to hybrid learning, setting a model for institutions worldwide.", decade: "2020s" },
  { year: 2022, title: "Community Impact Award", description: "Recognized by UNESCO for outstanding contributions to community development.", decade: "2020s" },
  { year: 2024, title: "50,000 Alumni Milestone", description: "AGM's alumni network spans 80+ countries and every major industry.", decade: "2020s", highlight: true },
  { year: 2026, title: "40th Anniversary", description: "Four decades of knowledge, innovation, and a future without limits.", decade: "2020s", highlight: true },
];
