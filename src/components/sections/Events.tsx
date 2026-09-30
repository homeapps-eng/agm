"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { events, type AGMEvent } from "@/data/events";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn, toInstagramEmbed } from "@/lib/utils";
import { Calendar, Clock, MapPin, Instagram, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function isUpcoming(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.getTime() >= Date.now();
}

function sortEvents(list: AGMEvent[]) {
  return [...list].sort((a, b) => {
    const aUp = isUpcoming(a.date);
    const bUp = isUpcoming(b.date);
    if (aUp && !bUp) return -1;
    if (!aUp && bUp) return 1;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
}

export function Events() {
  const sorted = sortEvents(events);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    // One card width + gap-6 (24px)
    el.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: "smooth" });
  };

  return (
    <SectionWrapper id="events">
      <SectionHeading
        badge="Events"
        title="Around the Gala"
        subtitle="Pop-up gatherings, alumni meetups, and community moments leading up to the 40th Anniversary."
      />

      {sorted.length === 0 ? (
        <GlassCard className="mx-auto flex max-w-md items-center justify-center py-12">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            More events coming soon
          </p>
        </GlassCard>
      ) : (
        <div className="relative">
          {/* Shows 3 cards on desktop, 2 on tablet, 1 on mobile */}
          <motion.div
            ref={scrollRef}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
          >
            {sorted.map((event) => (
              <motion.div
                key={event.id}
                variants={fadeInUp}
                className="w-full flex-shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
              >
                {event.instagramPostUrl ? (
                  <InstagramEmbedCard event={event} />
                ) : (
                  <EventCard event={event} />
                )}
              </motion.div>
            ))}
          </motion.div>

          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Scroll events left"
            className={cn(
              "absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-background/80 p-2.5 text-foreground shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-violet hover:text-violet",
              !canScrollLeft && "pointer-events-none opacity-0"
            )}
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Scroll events right"
            className={cn(
              "absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-background/80 p-2.5 text-foreground shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-violet hover:text-violet",
              !canScrollRight && "pointer-events-none opacity-0"
            )}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </SectionWrapper>
  );
}

function InstagramEmbedCard({ event }: { event: AGMEvent }) {
  const embedSrc = event.instagramPostUrl ? toInstagramEmbed(event.instagramPostUrl) : "";
  return (
    <GlassCard className="flex h-full flex-col overflow-hidden p-0">
      <div className="relative w-full" style={{ aspectRatio: "1 / 1.25" }}>
        <iframe
          src={embedSrc}
          title={event.title}
          className="absolute inset-0 h-full w-full"
          frameBorder={0}
          scrolling="no"
          allow="encrypted-media"
          loading="lazy"
        />
      </div>
      {event.instagramUrl && (
        <a
          href={event.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 border-t border-border bg-card/60 py-3 text-sm font-medium transition-colors hover:text-violet"
        >
          <Instagram size={14} />
          View on Instagram
          <ArrowUpRight size={14} />
        </a>
      )}
    </GlassCard>
  );
}

function EventCard({ event }: { event: AGMEvent }) {
  const upcoming = isUpcoming(event.date);

  return (
    <GlassCard className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <Badge variant={upcoming ? "violet" : "muted"}>
          {upcoming ? "Coming Up" : "Past"}
        </Badge>
        {event.instagramUrl && (
          <a
            href={event.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-violet"
            aria-label={`View ${event.title} on Instagram`}
          >
            <Instagram size={16} />
          </a>
        )}
      </div>

      <h3 className="mb-3 font-serif text-xl leading-tight">{event.title}</h3>

      <div className="mb-4 space-y-1.5 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar size={14} className="flex-shrink-0 text-violet" />
          <span>{formatDate(event.date)}</span>
        </div>
        {event.time && (
          <div className="flex items-center gap-2">
            <Clock size={14} className="flex-shrink-0 text-violet" />
            <span>{event.time}</span>
          </div>
        )}
        {event.location && (
          <div className="flex items-center gap-2">
            <MapPin size={14} className="flex-shrink-0 text-violet" />
            <span>{event.location}</span>
          </div>
        )}
      </div>

      <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
        {event.description}
      </p>

      {event.instagramUrl && (
        <a
          href={event.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-violet hover:text-violet"
        >
          View on Instagram
          <ArrowUpRight size={14} />
        </a>
      )}
    </GlassCard>
  );
}
