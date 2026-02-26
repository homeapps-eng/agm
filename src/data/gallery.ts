export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
}

export const galleryCategories = ["All", "Campus", "Events", "People", "Research"] as const;
export type GalleryCategory = (typeof galleryCategories)[number];

export const galleryImages: GalleryImage[] = [
  { id: 1, src: "/gallery/campus-1.jpg", alt: "Main campus building at sunset", category: "Campus", width: 800, height: 600 },
  { id: 2, src: "/gallery/event-1.jpg", alt: "Graduation ceremony 2024", category: "Events", width: 600, height: 800 },
  { id: 3, src: "/gallery/people-1.jpg", alt: "Students collaborating in lab", category: "People", width: 800, height: 500 },
  { id: 4, src: "/gallery/research-1.jpg", alt: "AI research lab", category: "Research", width: 700, height: 700 },
  { id: 5, src: "/gallery/campus-2.jpg", alt: "Library interior", category: "Campus", width: 800, height: 600 },
  { id: 6, src: "/gallery/event-2.jpg", alt: "Annual science fair", category: "Events", width: 600, height: 400 },
  { id: 7, src: "/gallery/people-2.jpg", alt: "Faculty award ceremony", category: "People", width: 800, height: 600 },
  { id: 8, src: "/gallery/research-2.jpg", alt: "Quantum computing facility", category: "Research", width: 700, height: 500 },
  { id: 9, src: "/gallery/campus-3.jpg", alt: "New campus aerial view", category: "Campus", width: 900, height: 500 },
  { id: 10, src: "/gallery/event-3.jpg", alt: "International conference", category: "Events", width: 800, height: 600 },
  { id: 11, src: "/gallery/people-3.jpg", alt: "Alumni reunion 2023", category: "People", width: 600, height: 800 },
  { id: 12, src: "/gallery/research-3.jpg", alt: "Biotech lab breakthrough", category: "Research", width: 800, height: 600 },
];
