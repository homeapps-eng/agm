"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, Maximize, Minimize, Pause, Play, X } from "lucide-react";
import { downloadName, type GalaPhoto } from "@/data/galaPhotos";
import { cn } from "@/lib/utils";

/** How long each photo stays on screen while playing */
const SLIDE_MS = 5000;
const FADE_S = 0.9;
/** Controls fade out after this long without input while playing */
const IDLE_MS = 2500;
/** Horizontal drag distance that counts as a swipe */
const SWIPE_PX = 60;

interface PhotoPlayerProps {
  photos: GalaPhoto[];
  startIndex: number;
  /** Start the slideshow right away; otherwise open paused, as a lightbox */
  autoplay: boolean;
  onClose: () => void;
}

// Full-screen viewer: crossfading slideshow with a slow zoom, or a paused lightbox.
// Keys: ←/→ step, Space plays/pauses, F toggles fullscreen, Esc closes. Swipe on touch screens.
export function PhotoPlayer({ photos, startIndex, autoplay, onClose }: PhotoPlayerProps) {
  const count = photos.length;
  const [index, setIndex] = useState(startIndex);
  const [playing, setPlaying] = useState(autoplay);
  const [idle, setIdle] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  // Only ever rendered in the browser (opened by a click), so document is available
  const [canFullscreen] = useState(() => document.fullscreenEnabled);
  const progress = useMotionValue(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const idleTimer = useRef<number | undefined>(undefined);

  const go = useCallback(
    (step: 1 | -1) => {
      progress.set(0);
      setIndex((i) => (i + step + count) % count);
    },
    [count, progress]
  );

  const wake = useCallback(() => {
    setIdle(false);
    window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => setIdle(true), IDLE_MS);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen();
    else rootRef.current?.requestFullscreen();
  }, []);

  // Advance on a timer that pauses in place, so Play resumes where it stopped
  useEffect(() => {
    if (!playing || count < 2) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const next = progress.get() + (now - last) / SLIDE_MS;
      last = now;
      if (next >= 1) {
        progress.set(0);
        setIndex((i) => (i + 1) % count);
      } else {
        progress.set(next);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, count, progress]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      wake();
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "f" || e.key === "F") toggleFullscreen();
      else if (e.key === "d" || e.key === "D") downloadRef.current?.click();
      else if (e.key === " " && !(e.target as HTMLElement).closest("button")) {
        // Space on a focused button presses that button instead
        e.preventDefault();
        setPlaying((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose, toggleFullscreen, wake]);

  // Lock page scroll, take focus, and hand both back on close
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    rootRef.current?.focus();
    const onFullscreenChange = () => setFullscreen(document.fullscreenElement === rootRef.current);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    idleTimer.current = window.setTimeout(() => setIdle(true), IDLE_MS);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      if (document.fullscreenElement) document.exitFullscreen();
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(idleTimer.current);
      previousFocus?.focus();
    };
  }, []);

  const photo = photos[index];
  const nextPhoto = photos[(index + 1) % count];
  const hideChrome = playing && idle;

  return (
    <motion.div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Gala photo slideshow"
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onPointerMove={wake}
      onPointerDown={wake}
      className={cn(
        "fixed inset-0 z-[70] select-none overflow-hidden bg-black text-white outline-none",
        hideChrome && "cursor-none"
      )}
    >
      {/* Slides */}
      <motion.div
        className="absolute inset-0 touch-pan-y"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        dragSnapToOrigin
        onDragEnd={(_, info) => {
          if (info.offset.x < -SWIPE_PX) go(1);
          else if (info.offset.x > SWIPE_PX) go(-1);
        }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: FADE_S, ease: "easeInOut" }}
          >
            {/* Blurred copy fills the bars around photos that don't match the screen's shape */}
            <Image
              src={photo.thumb}
              alt=""
              fill
              unoptimized
              className="scale-110 object-cover opacity-40 blur-3xl"
              draggable={false}
            />
            <div
              className="animate-ken-burns absolute inset-0"
              style={{
                animationDuration: `${SLIDE_MS + FADE_S * 1000}ms`,
                animationPlayState: playing ? "running" : "paused",
              }}
            >
              <Image
                src={photo.src}
                alt={`Gala photo ${index + 1} of ${count}`}
                fill
                unoptimized
                priority
                className="object-contain"
                draggable={false}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Load the next photo ahead of time so the crossfade never shows an empty frame */}
      {count > 1 && (
        <div aria-hidden className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0">
          <Image src={nextPhoto.src} alt="" width={nextPhoto.width} height={nextPhoto.height} unoptimized />
        </div>
      )}

      {/* Controls */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-500",
          hideChrome ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent px-4 pb-10 pt-4 sm:px-6">
          <p className="text-sm font-medium tabular-nums tracking-wider text-white/80" aria-live="polite">
            {index + 1} <span className="text-white/40">/ {count}</span>
          </p>
          <div className="pointer-events-auto flex items-center gap-1">
            <a
              ref={downloadRef}
              href={photo.src}
              download={downloadName(photo)}
              aria-label="Download this photo"
              title="Download this photo (D)"
              className="flex items-center justify-center rounded-full p-2.5 text-white/85 transition-colors hover:bg-white/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Download size={20} />
            </a>
            {canFullscreen && (
              <IconButton label={fullscreen ? "Exit full screen" : "Full screen"} onClick={toggleFullscreen}>
                {fullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </IconButton>
            )}
            <IconButton label="Close" onClick={onClose}>
              <X size={22} />
            </IconButton>
          </div>
        </div>

        {count > 1 && (
          <>
            <IconButton
              label="Previous photo"
              onClick={() => go(-1)}
              className="pointer-events-auto absolute left-3 top-1/2 hidden -translate-y-1/2 bg-white/10 p-3 backdrop-blur-md sm:flex"
            >
              <ChevronLeft size={26} />
            </IconButton>
            <IconButton
              label="Next photo"
              onClick={() => go(1)}
              className="pointer-events-auto absolute right-3 top-1/2 hidden -translate-y-1/2 bg-white/10 p-3 backdrop-blur-md sm:flex"
            >
              <ChevronRight size={26} />
            </IconButton>
          </>
        )}

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 bg-gradient-to-t from-black/70 to-transparent px-4 pb-8 pt-16">
          {count > 1 && (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold text-violet-dark shadow-lg shadow-black/30 transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            >
              {playing ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" className="ml-0.5" />}
            </button>
          )}
        </div>
      </div>

      {/* Time left on this photo; stays visible so a paused slideshow still shows where it is */}
      {count > 1 && (
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
          <motion.div className="h-full origin-left bg-gold" style={{ scaleX: progress }} />
        </div>
      )}
    </motion.div>
  );
}

function IconButton({
  label,
  onClick,
  className,
  children,
}: {
  label: string;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "flex items-center justify-center rounded-full p-2.5 text-white/85 transition-colors hover:bg-white/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
        className
      )}
    >
      {children}
    </button>
  );
}
