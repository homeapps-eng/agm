"use client";

import { motion } from "framer-motion";
import { GalaStage } from "@/components/sections/GalaStage";
import { findChapter, fullGallery, galaChapters, sample } from "@/data/galaChapters";
import { revealUp } from "@/lib/animations";

// One chapter of the night (or every photo, for "all") on the spiral, titled at the top
export function GalaChapterView({ slug }: { slug: string }) {
  const chapter = findChapter(slug) ?? fullGallery;
  const number = galaChapters.indexOf(chapter) + 1;
  const backdrop = sample(
    chapter.photos.filter((p) => p.width > p.height),
    14
  );

  return (
    <GalaStage
      photos={chapter.photos}
      backdrop={backdrop}
      ready
      title={
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="flex flex-col items-center"
        >
          <motion.p
            variants={revealUp}
            className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-light/85 sm:text-xs"
          >
            {number > 0 ? `Chapter ${number} of ${galaChapters.length}` : "AGM 40th Anniversary Gala"}
          </motion.p>
          <motion.h1
            variants={revealUp}
            className="text-gold-foil mt-3 text-balance pb-1 font-serif text-[clamp(2.4rem,min(8vw,7.5svh),4.75rem)] leading-none"
          >
            {chapter.title}
          </motion.h1>
          <motion.p variants={revealUp} className="mt-3 text-balance text-sm text-white/70 sm:text-base">
            {chapter.subtitle} &middot; {chapter.photos.length} photos
          </motion.p>
        </motion.div>
      }
    />
  );
}
