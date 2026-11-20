"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion, useReducedMotion } from "framer-motion";
import { GalaStage } from "@/components/sections/GalaStage";
import { galaInfo } from "@/data/gala";
import { backdropPhotoIds, galaPhotos } from "@/data/galaPhotos";
import { easeOutExpo, revealUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

const FOUNDED = 1986;
const GALA_YEAR = 2026;
const COUNT_DELAY_S = 0.4;
const COUNT_DURATION_S = 3.4;
const LAYOUT = { duration: 1.2, ease: easeOutExpo };

const backdropPhotos = backdropPhotoIds.flatMap((id) => galaPhotos.filter((p) => p.id === id));

// Full-screen opening for the gala photos. The year counts up from the founding year to the
// gala year; when it lands, it shrinks to the top, photos start crossfading behind everything,
// and every photo from the night spins in on a 3D spiral across the screen.
export function GalaIntro() {
  const { year, done } = useYearCount();
  const elapsed = year - FOUNDED;

  return (
    <GalaStage
      photos={galaPhotos}
      backdrop={backdropPhotos}
      ready={done}
      title={
        <motion.div layout="position" transition={{ layout: LAYOUT }} className="flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-light/85 sm:text-xs"
          >
            AGM 40th Anniversary Gala
          </motion.p>

          <div className={cn("relative", done ? "mt-2" : "mt-5")}>
            {/* Gold bloom once the count lands on the gala year */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0, scale: 0.5 }}
              animate={done ? { opacity: [0, 1, 0.55], scale: 1 } : {}}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="absolute -inset-x-10 -inset-y-6 rounded-full bg-[radial-gradient(closest-side,rgba(224,188,106,0.35),transparent)] blur-2xl"
            />
            {/* Huge while counting, then shrinks to make room for the photos */}
            <motion.p
              layout
              transition={{ layout: LAYOUT }}
              className={cn(
                "relative flex font-serif leading-none",
                done
                  ? "text-[clamp(2.5rem,min(11vw,7svh),4.5rem)]"
                  : "text-[clamp(4.5rem,min(25vw,30svh),20rem)]"
              )}
            >
              <span className="sr-only">
                {FOUNDED} to {GALA_YEAR}
              </span>
              {String(year)
                .split("")
                .map((digit, place) => (
                  <RollingDigit key={place} digit={digit} />
                ))}
            </motion.p>
          </div>

          {!done && (
            <div className="mt-6 w-[min(28rem,80vw)]" aria-hidden>
              <div className="flex justify-between text-xs font-medium tabular-nums tracking-widest text-white/50">
                <span>{FOUNDED}</span>
                <span className="text-gold-light">
                  {elapsed} {elapsed === 1 ? "year" : "years"}
                </span>
                <span>{GALA_YEAR}</span>
              </div>
              <div className="mt-2 h-px overflow-hidden bg-white/15">
                <div
                  className="h-full origin-left bg-gradient-to-r from-gold/60 to-gold-light"
                  style={{ transform: `scaleX(${elapsed / (GALA_YEAR - FOUNDED)})` }}
                />
              </div>
            </div>
          )}

          {done && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }}
              className="flex flex-col items-center"
            >
              <motion.h1
                variants={revealUp}
                className="mt-3 text-balance text-[clamp(1.6rem,min(4.2vw,4.2svh),2.6rem)] font-normal leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
              >
                Forty years. One unforgettable night.
              </motion.h1>
              <motion.p variants={revealUp} className="mt-2 text-balance text-sm text-white/70 sm:text-base">
                {galaInfo.weekday}, {galaInfo.date} &middot; {galaInfo.venueName}
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      }
    />
  );
}

function useYearCount() {
  const reduceMotion = useReducedMotion();
  const [year, setYear] = useState(FOUNDED);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const controls = animate(FOUNDED, GALA_YEAR, {
      delay: COUNT_DELAY_S,
      duration: COUNT_DURATION_S,
      ease: easeOutExpo,
      onUpdate: (v) => setYear(Math.round(v)),
      onComplete: () => setDone(true),
    });
    return () => controls.stop();
  }, [reduceMotion]);

  return reduceMotion ? { year: GALA_YEAR, done: true } : { year, done };
}

// One digit of the year; a new value slides up from below as the old one leaves through the top
function RollingDigit({ digit }: { digit: string }) {
  return (
    <span aria-hidden className="relative inline-block h-[1.08em] w-[0.56em] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.span
          key={digit}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.32, ease: easeOutExpo }}
          className="text-gold-foil absolute inset-0 text-center leading-[1.08]"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
