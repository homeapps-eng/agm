"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { timelineEvents } from "@/data/timeline";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const decades = Array.from(
  new Set(timelineEvents.map((e) => e.decade))
);

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeDecade, setActiveDecade] = useState<string>(decades[0]);

  const mobileEvents = useMemo(
    () => timelineEvents.filter((e) => e.decade === activeDecade),
    [activeDecade]
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    // Card width (w-72 = 288px) + gap-8 (32px)
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <SectionWrapper id="timeline" fullWidth className="overflow-hidden px-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Our Journey"
          title="40 Years of Milestones"
          subtitle="From a bold vision in 1986 to a global institution in 2026."
        />
      </div>

      <div ref={containerRef} className="relative">
        {/* Progress line */}
        <div className="absolute left-0 top-1/2 hidden h-0.5 w-full -translate-y-1/2 bg-border md:block">
          <motion.div
            className="h-full bg-gradient-to-r from-violet to-gold"
            style={{ width: lineWidth }}
          />
        </div>

        {/* Mobile: decade-tabbed vertical timeline */}
        <div className="mx-auto max-w-2xl px-4 md:hidden">
          <Tabs
            tabs={decades}
            activeTab={activeDecade}
            onTabChange={setActiveDecade}
            className="mb-8 justify-center"
          />
          <div className="relative border-l-2 border-violet/30 pl-8">
            {mobileEvents.map((event, i) => (
              <motion.div
                key={event.id ?? event.year}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative mb-10 last:mb-0"
              >
                <div className="absolute -left-[41px] top-0 h-4 w-4 rounded-full border-2 border-violet bg-background" />
                <Badge variant={event.highlight ? "gold" : "muted"} className="mb-2">
                  {event.year}
                </Badge>
                <h3 className="text-lg font-semibold font-serif">{event.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop: horizontal scroll */}
        <div className="relative hidden md:block">
          <div
            ref={scrollRef}
            className="hide-scrollbar flex gap-8 overflow-x-auto px-8 pb-8 pt-16 snap-x snap-mandatory"
          >
            {timelineEvents.map((event, i) => (
              <motion.div
                key={event.id ?? event.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "relative flex-shrink-0 snap-center w-72 rounded-2xl border border-border bg-card p-6 shadow-sm",
                  event.highlight && "border-violet/30 shadow-violet/5 shadow-lg"
                )}
              >
                <div className="absolute -top-3 left-6">
                  <Badge variant={event.highlight ? "gold" : "violet"}>
                    {event.year}
                  </Badge>
                </div>
                <div className="absolute -top-8 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-violet bg-background" />
                <h3 className="mt-2 text-lg font-semibold font-serif">{event.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                <span className="mt-3 block text-xs text-muted-foreground">{event.decade}</span>
              </motion.div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Scroll timeline left"
            className={cn(
              "absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-background/80 p-2.5 text-foreground shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-violet hover:text-violet",
              !canScrollLeft && "pointer-events-none opacity-0"
            )}
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Scroll timeline right"
            className={cn(
              "absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-background/80 p-2.5 text-foreground shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-violet hover:text-violet",
              !canScrollRight && "pointer-events-none opacity-0"
            )}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
