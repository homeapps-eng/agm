"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { events, type AGMEvent } from "@/data/events";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Calendar, Clock, MapPin, Instagram, ArrowUpRight } from "lucide-react";

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
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {sorted.map((event) => (
            <motion.div key={event.id} variants={fadeInUp}>
              {event.instagramPostUrl ? (
                <InstagramEmbedCard event={event} />
              ) : (
                <EventCard event={event} />
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </SectionWrapper>
  );
}

function InstagramEmbedCard({ event }: { event: AGMEvent }) {
  const embedSrc = event.instagramPostUrl?.replace(/\/?$/, "/") + "embed";
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
