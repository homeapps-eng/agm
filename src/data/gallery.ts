import { instagramPostedAt } from "@/lib/utils";

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
  instagramPostUrl?: string;
}

export const galleryCategories = ["All", "Soaring Stories", "Campus", "Events", "People", "Athletics"] as const;
export type GalleryCategory = (typeof galleryCategories)[number];

// Shown newest first by Instagram post date, which is read from each post's link
// (see instagramPostedAt), so new posts can be added anywhere; posts without an Instagram
// link go last. On mobile the gallery shows only the first 5 per tab (see
// MOBILE_PREVIEW_COUNT in Gallery.tsx), with a "Show all" button for the rest.
const posts: GalleryImage[] = [
  { id: 24, src: "", alt: "AGM 40th birthday celebration", category: "Events", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/reel/DdnJQEXCKNU/" },
  { id: 23, src: "", alt: "40 years of AGM", category: "Soaring Stories", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/p/DdmblEmD00J/" },
  { id: 26, src: "", alt: "Armenian Independence Day", category: "Events", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/reel/DdjsxFNitRl/" },
  { id: 25, src: "", alt: "First church visit of the school year", category: "Events", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/p/DdcDW0WmAX0/" },
  { id: 27, src: "", alt: "Honoring our tenured staff", category: "People", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/p/DdXKVqvEh1n/" },
  { id: 28, src: "", alt: "Our Story. Our Legacy. Our Future.", category: "Soaring Stories", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/p/Db6bfU6kjiU/" },
  { id: 6, src: "/gallery/event-2.jpg", alt: "Annual science fair", category: "Events", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/p/DYQ4F0fEbgu/?img_index=8" },
  { id: 2, src: "/gallery/event-1.jpg", alt: "Graduation ceremony", category: "Events", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/p/DYP6LQDBC1Q/" },
  { id: 18, src: "", alt: "Athletics", category: "Athletics", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/p/DYFxcR0hakX/" },
  { id: 3, src: "/gallery/people-1.jpg", alt: "AGM Teachers Appreciation", category: "People", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/p/DX7akjWAZSC/?img_index=1" },
  { id: 4, src: "/gallery/research-1.jpg", alt: "AGM in 90s", category: "People", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/p/DXXRe_OD5PO/" },
  { id: 11, src: "", alt: "Alumni reunion", category: "Soaring Stories", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/reel/DXISL5ggYAd/" },
  { id: 20, src: "", alt: "Campus", category: "Campus", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/p/DXAxtSgCRTc/" },
  { id: 19, src: "", alt: "Campus", category: "Campus", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/p/DW-U4bWgh2h/" },
  { id: 10, src: "/gallery/event-3.jpg", alt: "AGM coverage", category: "Events", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/p/DW7lw10iTpb/" },
  { id: 14, src: "", alt: "From @agm40years", category: "Soaring Stories", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/reel/DVolFraEcUp/" },
  { id: 7, src: "", alt: "Athletics", category: "Athletics", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/p/DVaEyCAj22K/" },
  { id: 8, src: "", alt: "Achievement Trophy", category: "Athletics", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/p/DVZ8feKkVgz/?img_index=1" },
  { id: 15, src: "", alt: "Soaring Stories", category: "Soaring Stories", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/reel/DTyHurbkrxs/" },
  { id: 16, src: "", alt: "Soaring Stories reel", category: "Soaring Stories", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/reel/DTd9XcEkuCs/" },
  { id: 17, src: "", alt: "Soaring Stories reel", category: "Soaring Stories", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/reel/DR2m7NZEsqK/" },
  { id: 21, src: "", alt: "Soaring Stories", category: "Soaring Stories", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/p/DQH9Y5JEo10/" },
  { id: 22, src: "", alt: "Soaring Stories", category: "Soaring Stories", width: 600, height: 800, instagramPostUrl: "https://www.instagram.com/p/DPEpXalCbqr/" },
  { id: 13, src: "/gallery/people-4.jpg", alt: "Special Guest", category: "People", width: 1000, height: 800 },
];

export const galleryImages: GalleryImage[] = [...posts].sort(
  (a, b) => postedAt(b) - postedAt(a)
);

function postedAt(img: GalleryImage): number {
  return (img.instagramPostUrl && instagramPostedAt(img.instagramPostUrl)) || 0;
}
