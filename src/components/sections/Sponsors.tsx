"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { sponsors, anonymousSponsorCount, type Sponsor } from "@/data/sponsors";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const TOP_SPONSOR_COUNT = 12;
const TICKER_SPEED = 40; // px per second
const TICKER_RESUME_DELAY = 2500; // ms after the visitor stops scrolling
const TICKER_COPIES = 3; // start in the middle copy so there is room to scroll both ways
const ARROW_STEP = 320;

const sortedSponsors = [...sponsors].sort((a, b) => (b.amount ?? 0) - (a.amount ?? 0));
const topSponsors = sortedSponsors.slice(0, TOP_SPONSOR_COUNT);
const otherSponsors = sortedSponsors.slice(TOP_SPONSOR_COUNT);
const half = Math.ceil(otherSponsors.length / 2);
const tickerRows = [otherSponsors.slice(0, half), otherSponsors.slice(half)];

const formatAmount = (amount: number) => `$${amount.toLocaleString("en-US")}`;

// Keeps a horizontally scrollable row running in a seamless loop. Visitors can take over by
// swiping, trackpad/wheel scrolling, dragging with the mouse or the arrow buttons; the row
// pauses while they do (and on hover) and picks up again a moment later.
function useTicker(direction: 1 | -1) {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef(0);
  const expected = useRef(0);
  const nudge = useRef(0);
  const hovering = useRef(false);
  const pausedUntil = useRef(0);
  const drag = useRef<{ x: number; left: number } | null>(null);

  const pause = (ms = TICKER_RESUME_DELAY) => {
    pausedUntil.current = performance.now() + ms;
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const loopWidth = () => el.scrollWidth / TICKER_COPIES;
    let visible = false;

    pos.current = loopWidth();
    el.scrollLeft = pos.current;
    expected.current = el.scrollLeft;

    const onScroll = () => {
      // Anything we didn't set ourselves came from the visitor
      if (Math.abs(el.scrollLeft - expected.current) > 1) {
        pos.current = el.scrollLeft;
        expected.current = el.scrollLeft;
        nudge.current = 0;
        pause();
      }
    };
    const onHold = () => pause(Infinity);
    const onRelease = () => pause();
    const onWheel = () => pause();
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("touchstart", onHold, { passive: true });
    el.addEventListener("touchend", onRelease, { passive: true });
    el.addEventListener("touchcancel", onRelease, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: true });

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(el);

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      if (visible && !drag.current) {
        let delta = 0;
        if (nudge.current) {
          const step = Math.abs(nudge.current) < 1 ? nudge.current : nudge.current * Math.min(1, dt / 120);
          nudge.current -= step;
          delta += step;
        }
        const idle = now >= pausedUntil.current;
        if (idle && !hovering.current && !reduceMotion) delta += (direction * TICKER_SPEED * dt) / 1000;
        if (delta || idle) {
          const loop = loopWidth();
          let next = pos.current + delta;
          if (loop > 0) {
            while (next < loop) next += loop;
            while (next >= 2 * loop) next -= loop;
          }
          pos.current = next;
          if (Math.abs(el.scrollLeft - next) >= 0.5) {
            el.scrollLeft = next;
            expected.current = el.scrollLeft;
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("touchstart", onHold);
      el.removeEventListener("touchend", onRelease);
      el.removeEventListener("touchcancel", onRelease);
      el.removeEventListener("wheel", onWheel);
    };
  }, [direction]);

  const scrollBy = (dir: 1 | -1) => {
    nudge.current += dir * ARROW_STEP;
    pause();
  };

  const endDrag = () => {
    if (!drag.current) return;
    drag.current = null;
    pause();
  };

  const bind = {
    ref,
    onPointerEnter: (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovering.current = true;
    },
    onPointerLeave: () => {
      hovering.current = false;
    },
    // Touch scrolls natively; mouse users can drag the row
    onPointerDown: (e: PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      drag.current = { x: e.clientX, left: e.currentTarget.scrollLeft };
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    onPointerMove: (e: PointerEvent<HTMLDivElement>) => {
      if (!drag.current) return;
      e.currentTarget.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
    },
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
  };

  return { bind, scrollBy };
}

function DonorPill({ sponsor }: { sponsor: Sponsor }) {
  return (
    <div className="flex-shrink-0 relative whitespace-nowrap gradient-border rounded-full bg-card px-5 py-2 text-sm">
      {sponsor.amount && (
        <>
          <span className="font-medium text-violet">{formatAmount(sponsor.amount)}</span>
          <span className="mx-2 text-muted-foreground">&mdash;</span>
        </>
      )}
      <span>{sponsor.name}</span>
      {sponsor.note && <span className="text-muted-foreground"> &middot; {sponsor.note}</span>}
    </div>
  );
}

export function Sponsors() {
  const rowA = useTicker(1);
  const rowB = useTicker(-1);
  const tickers = [rowA, rowB];

  const scrollRows = (dir: 1 | -1) => tickers.forEach((t) => t.scrollBy(dir));

  return (
    <SectionWrapper id="sponsors">
      <SectionHeading
        badge="Thank You"
        title="Our Sponsors"
        subtitle="With gratitude to everyone supporting AGM's 40th anniversary."
      />

      {/* Top Sponsors */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3"
      >
        {topSponsors.map((sponsor, i) => (
          <motion.div key={`${sponsor.name}-${i}`} variants={fadeInUp}>
            <GlassCard className="relative h-full p-4 sm:p-6">
              {/* Covers the glass border so the gradient matches the ticker pills */}
              <span aria-hidden className="gradient-border pointer-events-none absolute -inset-px rounded-2xl" />
              <h4 className="text-sm font-semibold leading-snug sm:text-base">{sponsor.name}</h4>
              {sponsor.amount && <p className="mt-0.5 text-xs text-violet sm:mt-0 sm:text-sm">{formatAmount(sponsor.amount)}</p>}
              {sponsor.note && (
                <p className="mt-2 text-xs text-muted-foreground sm:mt-3 sm:text-sm">{sponsor.note}</p>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Sponsor Ticker: two rows running opposite ways, scrollable by swipe, drag or arrows */}
      <div className="relative mt-16 space-y-4">
        {tickerRows.map((row, r) => (
          <div
            key={r}
            {...tickers[r].bind}
            className="hide-scrollbar cursor-grab select-none overflow-x-auto py-1 active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,black_56px,black_calc(100%-56px),transparent)]"
          >
            <div className="flex w-max gap-4 pr-4">
              {Array.from({ length: TICKER_COPIES }, (_, copy) => (
                <div key={copy} aria-hidden={copy > 0} className="flex gap-4">
                  {row.map((sponsor, i) => (
                    <DonorPill key={`${sponsor.name}-${i}`} sponsor={sponsor} />
                  ))}
                  {r === tickerRows.length - 1 && (
                    <div className="flex-shrink-0 relative whitespace-nowrap gradient-border rounded-full bg-card px-5 py-2 text-sm">
                      <span className="font-medium text-violet">{anonymousSponsorCount}</span>
                      <span className="ml-1">anonymous donors</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => scrollRows(-1)}
          aria-label="Scroll donors left"
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-background/80 p-2.5 text-foreground shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-violet hover:text-violet"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => scrollRows(1)}
          aria-label="Scroll donors right"
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-background/80 p-2.5 text-foreground shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-violet hover:text-violet"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </SectionWrapper>
  );
}
