import { galaPhotos, type GalaChapterKey, type GalaPhoto } from "./galaPhotos";

export interface GalaChapter {
  /** URL segment: /gallery/<slug> */
  slug: string;
  title: string;
  subtitle: string;
  photos: GalaPhoto[];
}

const chapter = (key: GalaChapterKey, slug: string, title: string, subtitle: string): GalaChapter => ({
  slug,
  title,
  subtitle,
  photos: galaPhotos.filter((p) => p.chapter === key),
});

// The four parts of the night, in the order shown on /gallery/categories.
// Each photo's chapter is set on its line in galaPhotos.ts.
export const galaChapters: GalaChapter[] = [
  chapter("auction", "silent-auction", "The Silent Auction", "Treasures up for bid"),
  chapter("reception", "welcome-reception", "The Welcome Reception", "Arrivals and portraits at the 40th backdrop"),
  chapter("ballroom", "grand-ballroom", "The Grand Ballroom", "The room, dressed for the celebration"),
  chapter("celebration", "celebration", "The Celebration", "Speeches, dinner and dancing into the night"),
];

/** Every photo, as one more "chapter" at /gallery/all */
export const fullGallery: GalaChapter = {
  slug: "all",
  title: "The Full Gallery",
  subtitle: "Every photo from the night",
  photos: galaPhotos,
};

export function findChapter(slug: string): GalaChapter | undefined {
  return slug === fullGallery.slug ? fullGallery : galaChapters.find((c) => c.slug === slug);
}

/** Up to `count` photos spread evenly through a list */
export function sample<T>(items: T[], count: number): T[] {
  if (items.length <= count) return items;
  return Array.from({ length: count }, (_, i) => items[Math.floor((i * items.length) / count)]);
}
