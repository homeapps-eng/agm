import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GalaChapterView } from "@/components/sections/GalaChapterView";
import { findChapter, fullGallery, galaChapters } from "@/data/galaChapters";

interface Props {
  params: Promise<{ chapter: string }>;
}

// Only the chapters (and "all") exist; anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return [fullGallery, ...galaChapters].map((c) => ({ chapter: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const chapter = findChapter((await params).chapter);
  return {
    title: `${chapter?.title ?? "Gala Photos"} | AGM 40th Anniversary Gala`,
    description: chapter ? `${chapter.subtitle}. Photos from the AGM 40th Anniversary Gala.` : undefined,
  };
}

export default async function GalaChapterPage({ params }: Props) {
  const { chapter: slug } = await params;
  if (!findChapter(slug)) notFound();
  return (
    <main>
      <GalaChapterView slug={slug} />
    </main>
  );
}
