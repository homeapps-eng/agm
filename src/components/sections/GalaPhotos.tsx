"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, Expand, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { DownloadLink } from "@/components/ui/DownloadLink";
import { PhotoPlayer } from "@/components/ui/PhotoPlayer";
import { galaInfo } from "@/data/gala";
import { galaPhotos } from "@/data/galaPhotos";
import { easeOutExpo } from "@/lib/animations";

type PlayerState = { startIndex: number; autoplay: boolean } | null;

export function GalaPhotos() {
  const [player, setPlayer] = useState<PlayerState>(null);
  const hasPhotos = galaPhotos.length > 0;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 md:pt-32 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easeOutExpo }}
        className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            AGM 40th Anniversary Gala &middot; {galaInfo.date}
          </p>
          <h1 className="mt-3 text-4xl font-normal tracking-tight sm:text-5xl md:text-6xl">The Evening in Pictures</h1>
          {hasPhotos && (
            <p className="mt-3 text-muted-foreground">
              {galaPhotos.length} photos &middot; tap any photo to see it full screen
            </p>
          )}
        </div>
        {hasPhotos && (
          <Button
            size="lg"
            onClick={() => setPlayer({ startIndex: 0, autoplay: true })}
            className="self-start sm:self-auto"
          >
            <Play size={18} fill="currentColor" />
            Play Slideshow
          </Button>
        )}
      </motion.div>

      {hasPhotos ? <PhotoGrid onOpen={(i) => setPlayer({ startIndex: i, autoplay: false })} /> : <ComingSoon />}

      <AnimatePresence>
        {player && (
          <PhotoPlayer
            photos={galaPhotos}
            startIndex={player.startIndex}
            autoplay={player.autoplay}
            onClose={() => setPlayer(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// Justified rows: every photo in a row shares one height and the row fills the width, so the
// photos read left to right in the order they were taken. Each tile starts at the row height
// (--row) times its aspect ratio, then grows in proportion to that ratio to close the gap.
function PhotoGrid({ onOpen }: { onOpen: (index: number) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5 [--row:130px] sm:gap-2 sm:[--row:190px] lg:[--row:240px]">
      {galaPhotos.map((photo, i) => {
        const ratio = photo.width / photo.height;
        return (
          <motion.div
            key={photo.src}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: easeOutExpo, delay: (i % 5) * 0.05 }}
            style={{ flexGrow: ratio, flexBasis: `calc(var(--row) * ${ratio})` }}
            className="group relative overflow-hidden rounded-lg bg-muted ring-offset-2 ring-offset-background has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-violet sm:rounded-xl"
          >
            <button
              type="button"
              onClick={() => onOpen(i)}
              aria-label={`View photo ${i + 1} of ${galaPhotos.length}`}
              className="block w-full focus:outline-none"
            >
              <Image
                src={photo.thumb}
                alt=""
                width={photo.width}
                height={photo.height}
                unoptimized
                className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </button>
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="pointer-events-none absolute bottom-2.5 right-2.5 flex h-8 w-8 translate-y-2 items-center justify-center rounded-full bg-white/90 text-violet-dark opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <Expand size={15} />
            </span>
            <DownloadLink photo={photo} />
          </motion.div>
        );
      })}
      {/* Takes up the slack on the last row so its photos keep the row height instead of stretching */}
      <span aria-hidden className="grow-[1000000]" />
    </div>
  );
}

function ComingSoon() {
  return (
    <GlassCard hover={false} className="mx-auto max-w-xl px-8 py-14 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold">
        <Camera size={26} />
      </span>
      <h2 className="mt-5 text-3xl font-normal">Photos are on their way</h2>
      <p className="mt-3 text-pretty text-muted-foreground">
        We&rsquo;re gathering the best moments from the evening. Check back soon to relive the night.
      </p>
    </GlassCard>
  );
}
