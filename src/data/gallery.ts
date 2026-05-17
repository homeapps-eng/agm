export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
  instagramPostUrl?: string;
}

export const galleryCategories = ["All", "Campus", "Events", "People", "Research"] as const;
export type GalleryCategory = (typeof galleryCategories)[number];

export const galleryImages: GalleryImage[] = [
  { id: 11, src: "/gallery/people-3.jpg", alt: "Alumni reunion", category: "People", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/p/DXISL5ggYAd/" },
  { id: 14, src: "", alt: "From @agm40years", category: "People", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/p/DVolFraEcUp/" },
  { id: 13, src: "/gallery/people-4.jpg", alt: "Special Guest", category: "People", width: 1000, height: 800 },
  { id: 1, src: "/gallery/campus-1.jpg", alt: "Main campus building at sunset", category: "Campus", width: 800, height: 600 },
  { id: 2, src: "/gallery/event-1.jpg", alt: "Graduation ceremony", category: "Events", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/p/DYP6LQDBC1Q/" },
  { id: 3, src: "/gallery/people-1.jpg", alt: "AGM Teachers Appreciation", category: "People", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/p/DX7akjWAZSC/?img_index=1" },
  { id: 4, src: "/gallery/research-1.jpg", alt: "AGM in 90s", category: "Research", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/p/DXXRe_OD5PO/" },
  { id: 5, src: "/gallery/campus-2.jpg", alt: "Library interior", category: "Campus", width: 800, height: 600 },
  { id: 6, src: "/gallery/event-2.jpg", alt: "Annual science fair", category: "Events", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/p/DYQ4F0fEbgu/?img_index=8" },
  { id: 7, src: "/gallery/people-2.jpg", alt: "Faculty award ceremony", category: "People", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/p/DVaEyCAj22K/" },
  { id: 8, src: "/gallery/research-2.jpg", alt: "Achievement Trophy", category: "Research", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/p/DVZ8feKkVgz/?img_index=1" },
  { id: 10, src: "/gallery/event-3.jpg", alt: "AGM coverage", category: "Events", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/p/DW7lw10iTpb/" },
  { id: 15, src: "", alt: "Soaring Stories", category: "People", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/reel/DTyHurbkrxs/" },
];
