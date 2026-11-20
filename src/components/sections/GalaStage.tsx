"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Camera, LayoutGrid, Play } from "lucide-react";
import { PhotoPlayer } from "@/components/ui/PhotoPlayer";
import { GalaHelix } from "@/components/sections/GalaHelix";
import type { GalaPhoto } from "@/data/galaPhotos";
import { easeOutExpo } from "@/lib/animations";
import { cn } from "@/lib/utils";

/** How long each background photo shows before the next fades in */
const BACKDROP_MS = 6000;
const BACKDROP_FADE_S = 1.6;

// Gold sparks drifting up the screen. Spread out by fixed steps (not Math.random)
// so the server and browser render the same positions.
const sparks = Array.from({ length: 30 }, (_, i) => ({
  left: (i * 37.3) % 100,
  size: 2 + ((i * 7) % 4),
  duration: 9 + ((i * 5) % 9),
  delay: -((i * 2.7) % 17),
}));

/** Square outline button in the style of the Oscars timeline, in the gala's gold */
export const outlineButton =
  "inline-flex items-center justify-center gap-2 border px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light sm:px-8";

interface GalaStageProps {
  photos: GalaPhoto[];
  /** Wide photos that crossfade behind everything */
  backdrop: GalaPhoto[];
  /** False while the intro is still counting: the title sits centered and no photos show yet */
  ready: boolean;
  /** Type at the top of the screen */
  title: React.ReactNode;
}

// The full-screen gala photo stage shared by /gallery and each chapter: navy and gold, photos
// crossfading behind, the spiral of photos across the middle, and the controls at the bottom.
export function GalaStage({ photos, backdrop, ready, title }: GalaStageProps) {
  const [player, setPlayer] = useState<{ startIndex: number; autoplay: boolean } | null>(null);
  const [active, setActive] = useState(0);
  const hasPhotos = photos.length > 0;

  return (
    <div className="bg-gala-table relative h-svh min-h-[34rem] overflow-hidden text-white">
      {backdrop.length > 0 && <Backdrop photos={backdrop} show={ready} paused={player !== null} />}

      <div aria-hidden className="pointer-events-none absolute inset-0 motion-reduce:hidden">
        {sparks.map((s, i) => (
          <span
            key={i}
            className="animate-spark absolute -bottom-2 rounded-full bg-gold-light"
            style={{
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {ready && hasPhotos && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute inset-0"
        >
          <GalaHelix
            photos={photos}
            paused={player !== null}
            onActiveChange={setActive}
            onOpen={(index) => setPlayer({ startIndex: index, autoplay: false })}
          />
        </motion.div>
      )}

      {/* Shade the top and bottom of the spiral so the title and buttons stay readable */}
      {ready && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[5]">
          <div className="absolute inset-x-0 top-0 h-[34%] bg-gradient-to-b from-[#0B1731]/80 via-[#0B1731]/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#0B1731]/95 via-[#0B1731]/60 to-transparent" />
        </div>
      )}

      {/* Gold hairline frame, like the printed program */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-3 z-20 rounded-[1.5rem] ring-1 ring-inset ring-gold/25 sm:inset-5 sm:rounded-[2rem]"
      />

      <Link
        href="/"
        className="absolute left-7 top-7 z-30 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white sm:left-12 sm:top-9"
      >
        <ArrowLeft size={16} />
        <span className="font-serif text-xl font-bold text-white">AGM</span>
        <span className="-ml-1 text-sm">40</span>
        <span className="sr-only">Back to the anniversary site</span>
      </Link>

      {/* Type sits over the spiral; clicks and drags fall through to it except on the buttons */}
      <div
        className={cn(
          "pointer-events-none relative z-10 flex h-full flex-col items-center px-6 text-center",
          ready ? "justify-between pb-7 pt-16 sm:pt-14" : "justify-center pb-10"
        )}
      >
        {title}

        {ready && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: easeOutExpo }}
            className="flex flex-col items-center"
          >
            {hasPhotos ? (
              <>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60 drop-shadow">
                  <span className="tabular-nums text-gold-light">
                    {active + 1} / {photos.length}
                  </span>
                  <span className="hidden sm:inline"> &middot; scroll or drag to explore</span>
                </p>
                <div className="pointer-events-auto flex flex-col items-stretch gap-3 sm:flex-row">
                  <Link
                    href="/gallery/categories"
                    className={cn(outlineButton, "border-gold/80 bg-[#0B1731]/40 hover:bg-gold hover:text-violet-dark")}
                  >
                    <LayoutGrid size={14} />
                    All Categories
                  </Link>
                  <button
                    type="button"
                    onClick={() => setPlayer({ startIndex: active, autoplay: true })}
                    className={cn(outlineButton, "border-white/30 bg-[#0B1731]/40 hover:border-white/70 hover:bg-white/10")}
                  >
                    <Play size={13} fill="currentColor" />
                    Play Slideshow
                  </button>
                </div>
              </>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-sm font-medium text-gold-light">
                <Camera size={16} />
                Photos coming soon
              </span>
            )}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {player && (
          <PhotoPlayer
            photos={photos}
            startIndex={player.startIndex}
            autoplay={player.autoplay}
            onClose={() => setPlayer(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Full-screen photos crossfading behind the stage under a navy tint. Mounted from the start
// (hidden) so the first photo is already loaded when the stage is ready.
function Backdrop({ photos, show, paused }: { photos: GalaPhoto[]; show: boolean; paused: boolean }) {
  const [index, setIndex] = useState(0);
  const running = show && !paused;

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % photos.length), BACKDROP_MS);
    return () => window.clearInterval(timer);
  }, [running, photos.length]);

  const photo = photos[index];
  const next = photos[(index + 1) % photos.length];

  return (
    <motion.div
      aria-hidden
      initial={false}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="pointer-events-none absolute inset-0"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={photo.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: BACKDROP_FADE_S, ease: "easeInOut" }}
        >
          <div
            className="animate-ken-burns absolute inset-0"
            style={{
              animationDuration: `${BACKDROP_MS + BACKDROP_FADE_S * 1000}ms`,
              animationPlayState: running ? "running" : "paused",
            }}
          >
            <Image src={photo.src} alt="" fill unoptimized priority className="object-cover" />
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute h-px w-px overflow-hidden opacity-0">
        <Image src={next.src} alt="" width={next.width} height={next.height} unoptimized />
      </div>
      {/* Navy tint keeps the gold and white type readable over any photo */}
      <div className="absolute inset-0 bg-[#0B1731]/75" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(7,13,26,0.75)_100%)]" />
    </motion.div>
  );
}
