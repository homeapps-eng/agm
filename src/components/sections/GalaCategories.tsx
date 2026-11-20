"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, LayoutGrid } from "lucide-react";
import { outlineButton } from "@/components/sections/GalaStage";
import { fullGallery, galaChapters, sample, type GalaChapter } from "@/data/galaChapters";
import { revealUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

const DRUM_CARDS = 12;
const CARD_W = 104;
const CARD_H = 142;
const CARD_GAP = 8;
/** Radius at which the drum's cards sit edge to edge */
const DRUM_R = Math.round((DRUM_CARDS * (CARD_W + CARD_GAP)) / (2 * Math.PI));

// The chapters of the night, each a small turning drum of its photos with its name underneath,
// laid out like the Oscars timeline's category picker. Every photo comes first, then the four
// chapters; each opens that set on the spiral.
export function GalaCategories() {
  const entries = [fullGallery, ...galaChapters];

  return (
    <div className="bg-gala-table relative flex min-h-svh flex-col overflow-hidden text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-3 rounded-[1.5rem] ring-1 ring-inset ring-gold/25 sm:inset-5 sm:rounded-[2rem]"
      />
      <Link
        href="/"
        className="absolute left-7 top-7 z-10 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white sm:left-12 sm:top-9"
      >
        <ArrowLeft size={16} />
        <span className="font-serif text-xl font-bold text-white">AGM</span>
        <span className="-ml-1 text-sm">40</span>
        <span className="sr-only">Back to the anniversary site</span>
      </Link>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="relative flex flex-1 flex-col items-center justify-center gap-[clamp(2rem,7svh,4.5rem)] py-20"
      >
        <div className="px-6 text-center">
          <motion.p
            variants={revealUp}
            className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-light/85 sm:text-xs"
          >
            AGM 40th Anniversary Gala
          </motion.p>
          <motion.h1
            variants={revealUp}
            className="text-gold-foil mt-3 pb-1 font-serif text-[clamp(2.4rem,min(8vw,8svh),4.75rem)] leading-none"
          >
            The Night in Four Chapters
          </motion.h1>
        </div>

        <div className="hide-scrollbar w-full snap-x snap-mandatory overflow-x-auto">
          <ul className="mx-auto flex w-max gap-4 px-[max(1.5rem,calc(50vw-9rem))] sm:gap-6 lg:px-12">
            {entries.map((chapter) => (
              <motion.li key={chapter.slug} variants={revealUp} className="snap-center">
                <ChapterLink chapter={chapter} />
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div variants={revealUp}>
          <Link
            href="/gallery/photos"
            className={cn(outlineButton, "border-white/30 hover:border-white/70 hover:bg-white/10")}
          >
            <LayoutGrid size={14} />
            See every photo in a grid
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

function ChapterLink({ chapter }: { chapter: GalaChapter }) {
  return (
    <Link
      href={`/gallery/${chapter.slug}`}
      className="group flex w-[min(18rem,72vw)] flex-col items-center text-center focus:outline-none sm:w-[clamp(12.5rem,17vw,16.5rem)]"
    >
      <div className="relative w-full py-6">
        {/* Thin gold line through the middle of the drum, as on the timeline */}
        <span aria-hidden className="absolute inset-y-0 left-1/2 w-px bg-gold/45" />
        <Drum chapter={chapter} />
      </div>
      <span className="mt-4 text-balance text-sm font-semibold uppercase leading-relaxed tracking-[0.3em] text-white transition-colors duration-300 group-hover:text-gold-light group-focus-visible:text-gold-light">
        {chapter.title}
      </span>
      <span className="mt-1 text-xs tracking-wider text-white/50">{chapter.photos.length} photos</span>
      <span
        aria-hidden
        className="mt-3 h-px w-10 bg-gold transition-all duration-500 group-hover:w-24 group-focus-visible:w-24"
      />
    </Link>
  );
}

function Drum({ chapter }: { chapter: GalaChapter }) {
  const cards = sample(chapter.photos, DRUM_CARDS);
  const step = 360 / cards.length;

  return (
    <div
      className="relative mx-auto overflow-hidden transition-transform duration-500 [mask-image:linear-gradient(90deg,transparent,#000_20%,#000_80%,transparent)] [perspective:640px] group-hover:scale-105"
      style={{ height: CARD_H + 16 }}
    >
      <div
        className="animate-drum absolute left-1/2 top-1/2 h-0 w-0"
        style={{ "--drum-r": `${DRUM_R}px` } as React.CSSProperties}
      >
        {cards.map((photo, i) => (
          <div
            key={photo.id}
            className="absolute overflow-hidden bg-violet-dark [backface-visibility:hidden]"
            style={{
              left: -CARD_W / 2,
              top: -CARD_H / 2,
              width: CARD_W,
              height: CARD_H,
              transform: `rotateY(${i * step}deg) translateZ(${DRUM_R}px)`,
            }}
          >
            <Image src={photo.thumb} alt="" fill unoptimized sizes={`${CARD_W}px`} className="object-cover" />
            <span className="absolute inset-0 bg-[#0B1731]/25 transition-opacity duration-500 group-hover:opacity-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
