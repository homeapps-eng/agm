"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { DownloadLink } from "@/components/ui/DownloadLink";
import type { GalaPhoto } from "@/data/galaPhotos";

// Every gala photo on one spiral ribbon that turns around a vertical axis, in the order the
// photos were taken. The photo at the front is shown big and bright; the ribbon curves away to
// either side and slopes down to the left, so earlier photos trail below in a dimmer row.
// It turns on its own; scrolling, dragging and the arrow keys move it, and a click opens a photo.

/** Seconds the auto-spin takes to bring the next photo to the front */
const SECONDS_PER_PHOTO = 4.5;
/** After the visitor scrolls or drags, wait this long before spinning on again */
const IDLE_BEFORE_SPIN_MS = 3500;
/** How long the opening spin takes to settle before the slow turning starts */
const SPIN_IN_MS = 2200;
/** How quickly the ribbon catches up with where it's been sent (higher is snappier) */
const FOLLOW = 4;
/** Arc distance moved per pixel dragged */
const DRAG_GAIN = 1.6;
/** Turns of the spiral drawn behind (below) and ahead of the front photo */
const TURNS_BEHIND = 1.6;
const TURNS_AHEAD = 0.45;

const mod = (a: number, n: number) => ((a % n) + n) % n;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function subscribeResize(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}

function useViewport() {
  const size = useSyncExternalStore(
    subscribeResize,
    () => `${window.innerWidth}x${window.innerHeight}`,
    () => "1440x900"
  );
  const [vw, vh] = size.split("x").map(Number);
  return { vw, vh };
}

interface Geometry {
  cardH: number;
  widths: number[];
  starts: number[];
  centers: number[];
  /** Length of the whole ribbon; positions wrap around it so the spin never ends */
  total: number;
  /** Average distance between photo centers */
  step: number;
  radius: number;
  /** Ribbon length of one full turn */
  turn: number;
  /** How far the ribbon drops per turn */
  pitch: number;
  /** Where the front photo's center sits, from the top of the screen */
  centerY: number;
  /** Turns of spiral drawn below and above the front; fewer when there are few photos */
  behind: number;
  ahead: number;
}

function helixGeometry(photos: GalaPhoto[], vw: number, vh: number): Geometry {
  // Big enough that about three photos fill the front of the ribbon
  const cardH = Math.round(clamp(Math.min(vh * 0.44, vw * (vw < 640 ? 0.62 : 0.36)), 150, 520));
  const gap = Math.round(cardH * 0.07);
  const widths = photos.map((p) => Math.round((cardH * p.width) / p.height));
  const starts: number[] = [];
  const centers: number[] = [];
  let total = 0;
  for (const w of widths) {
    starts.push(total);
    centers.push(total + w / 2);
    total += w + gap;
  }
  const step = total / photos.length;
  const radius = Math.max(vw * 0.6, step * 2.2);
  const turn = 2 * Math.PI * radius;
  // Each photo appears once, so never draw more than half the ribbon either way
  const half = total / turn / 2 - 0.05;
  return {
    cardH,
    widths,
    starts,
    centers,
    total,
    step,
    radius,
    turn,
    pitch: cardH * 1.1,
    centerY: vh * 0.575,
    behind: clamp(half, 0.3, TURNS_BEHIND),
    ahead: clamp(half, 0.2, TURNS_AHEAD),
  };
}

/** The photo whose slot on the ribbon contains this position */
function indexAt(g: Geometry, arc: number) {
  const a = mod(arc, g.total);
  let lo = 0;
  let hi = g.starts.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (g.starts[mid] <= a) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}

/** Signed ribbon distance from the front to a photo's center, the short way around */
function offsetOf(g: Geometry, index: number, pos: number) {
  return mod(g.centers[index] - pos + g.total / 2, g.total) - g.total / 2;
}

function visibleRange(g: Geometry, pos: number) {
  if ((g.behind + g.ahead) * g.turn >= g.total - g.step) return { first: 0, last: g.starts.length - 1 };
  return {
    first: indexAt(g, pos - g.behind * g.turn),
    last: indexAt(g, pos + g.ahead * g.turn),
  };
}

interface GalaHelixProps {
  photos: GalaPhoto[];
  /** Stop spinning and ignore keys, e.g. while the slideshow is open over it */
  paused: boolean;
  onOpen: (index: number) => void;
  onActiveChange?: (index: number) => void;
}

export function GalaHelix({ photos, paused, onOpen, onActiveChange }: GalaHelixProps) {
  const { vw, vh } = useViewport();
  const g = useMemo(() => helixGeometry(photos, vw, vh), [photos, vw, vh]);
  const reduceMotion = useReducedMotion();
  const count = photos.length;

  // Opens with a fast spin that settles on the first photo, then starts turning on its own
  const firstCenter = g.centers[0];
  const startPos = reduceMotion ? firstCenter : firstCenter - 0.9 * g.turn;
  const pos = useMotionValue(startPos);
  const goal = useRef(firstCenter);
  const lastInput = useRef(SPIN_IN_MS - IDLE_BEFORE_SPIN_MS);
  const hovering = useRef(false);
  const drag = useRef<{ x: number; goal: number; moved: boolean; lastX: number; lastT: number; v: number } | null>(
    null
  );
  const justDragged = useRef(false);
  const sceneRef = useRef<HTMLDivElement>(null);

  const [range, setRange] = useState(() => visibleRange(g, startPos));
  const [active, setActive] = useState(0);

  useAnimationFrame((time, delta) => {
    const dt = Math.min(delta, 64) / 1000;
    const idle = time - lastInput.current > IDLE_BEFORE_SPIN_MS;
    if (!reduceMotion && !paused && !hovering.current && !drag.current && idle) {
      goal.current += (g.step / SECONDS_PER_PHOTO) * dt;
    }
    const p = pos.get();
    const next = p + (goal.current - p) * (1 - Math.exp(-dt * FOLLOW));
    pos.set(next);

    const r = visibleRange(g, next);
    if (r.first !== range.first || r.last !== range.last) setRange(r);
    const a = indexAt(g, next);
    if (a !== active) {
      setActive(a);
      onActiveChange?.(a);
    }
  });

  const markInput = () => (lastInput.current = performance.now());

  // Scroll wheel and trackpad move the ribbon instead of the page
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      goal.current += (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * 1.2;
      lastInput.current = performance.now();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    if (paused) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const from = indexAt(g, goal.current);
      const to = mod(from + (e.key === "ArrowRight" ? 1 : -1), count);
      goal.current += offsetOf(g, to, goal.current);
      lastInput.current = performance.now();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paused, g, count]);

  const shown: number[] = [];
  for (let i = range.first, k = 0; k < count; k++, i = (i + 1) % count) {
    shown.push(i);
    if (i === range.last) break;
  }

  return (
    <div
      ref={sceneRef}
      role="group"
      aria-roledescription="carousel"
      aria-label={`All ${count} gala photos`}
      className="absolute inset-0 cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing"
      style={{ perspective: g.radius * 1.35, perspectiveOrigin: `50% ${g.centerY}px` }}
      onPointerDown={(e) => {
        if (e.button !== 0) return;
        const now = performance.now();
        drag.current = { x: e.clientX, goal: goal.current, moved: false, lastX: e.clientX, lastT: now, v: 0 };
        markInput();
      }}
      onPointerMove={(e) => {
        const d = drag.current;
        if (!d) return;
        const dx = e.clientX - d.x;
        if (!d.moved && Math.abs(dx) > 6) {
          d.moved = true;
          e.currentTarget.setPointerCapture(e.pointerId);
        }
        if (!d.moved) return;
        const now = performance.now();
        d.v = (e.clientX - d.lastX) / Math.max(1, now - d.lastT);
        d.lastX = e.clientX;
        d.lastT = now;
        goal.current = d.goal - dx * DRAG_GAIN;
        markInput();
      }}
      onPointerUp={() => {
        const d = drag.current;
        drag.current = null;
        if (!d?.moved) return;
        // Carry on a little in the direction of the flick
        goal.current -= d.v * DRAG_GAIN * 250;
        justDragged.current = true;
        window.setTimeout(() => (justDragged.current = false), 0);
        markInput();
      }}
      onPointerCancel={() => (drag.current = null)}
    >
      {shown.map((i) => (
        <HelixCard
          key={photos[i].id}
          photo={photos[i]}
          index={i}
          count={count}
          g={g}
          pos={pos}
          sharp={Math.abs(offsetOf(g, i, g.centers[active])) <= g.step * 2.5}
          onHover={(over) => (hovering.current = over)}
          onOpen={() => !justDragged.current && onOpen(i)}
        />
      ))}
    </div>
  );
}

function HelixCard({
  photo,
  index,
  count,
  g,
  pos,
  sharp,
  onHover,
  onOpen,
}: {
  photo: GalaPhoto;
  index: number;
  count: number;
  g: Geometry;
  pos: MotionValue<number>;
  /** Near the front: load the full-size photo over the thumbnail */
  sharp: boolean;
  onHover: (over: boolean) => void;
  onOpen: () => void;
}) {
  const offset = useTransform(pos, (p) => offsetOf(g, index, p));
  const transform = useTransform(offset, (s) => {
    const angle = s / g.radius;
    const turns = s / g.turn;
    const x = g.radius * Math.sin(angle);
    const z = g.radius * (Math.cos(angle) - 1);
    const y = -turns * g.pitch;
    // Each turn back is a little smaller, so the spiral narrows as it trails away
    const scale = 1 - 0.1 * clamp(-turns, 0, 2);
    const deg = mod((angle * 180) / Math.PI + 180, 360) - 180;
    return `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${deg.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
  });
  // Fade in and out at the ends of the drawn stretch of spiral
  const opacity = useTransform(offset, (s) => {
    const t = s / g.turn;
    return clamp(Math.min((g.ahead - t) / 0.15, (t + g.behind) / 0.25), 0, 1);
  });
  // Navy veil: clear at the front, deeper toward the sides and on the rows below
  const veil = useTransform(offset, (s) => {
    const angle = Math.abs(mod(s / g.radius + Math.PI, 2 * Math.PI) - Math.PI);
    const turnsBack = clamp(-s / g.turn - 0.3, 0, 1.3);
    return Math.min(0.9, 0.6 * Math.min(1, angle / 1.2) + 0.75 * turnsBack);
  });
  // Nearer cards on top; where rows touch, the front row wins over the turns below it
  const zIndex = useTransform(offset, (s) =>
    Math.round(1000 + g.radius * (Math.cos(s / g.radius) - 1) - 40 * clamp(-s / g.turn, 0, 2))
  );

  return (
    <motion.div
      onPointerEnter={(e) => e.pointerType === "mouse" && onHover(true)}
      onPointerLeave={() => onHover(false)}
      style={{
        transform,
        opacity,
        zIndex,
        top: g.centerY,
        width: g.widths[index],
        height: g.cardH,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
      className="group absolute left-1/2 overflow-hidden rounded-[3px] bg-violet-dark shadow-2xl shadow-black/60 ring-1 ring-gold/25 transition-shadow hover:ring-gold/70 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold-light"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View photo ${index + 1} of ${count}`}
        className="absolute inset-0 focus:outline-none"
      >
        <Image src={photo.thumb} alt="" fill unoptimized draggable={false} className="object-cover" />
        {sharp && <Image src={photo.src} alt="" fill unoptimized draggable={false} className="object-cover" />}
      </button>
      <motion.span aria-hidden className="pointer-events-none absolute inset-0 bg-[#0B1731]" style={{ opacity: veil }} />
      <DownloadLink photo={photo} />
    </motion.div>
  );
}
