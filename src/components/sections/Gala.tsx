"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { galaInfo, schedule } from "@/data/gala";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { Armchair, ArrowUpRight, CalendarDays, MapPin, Sparkles, type LucideIcon } from "lucide-react";

const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${galaInfo.venueName}, ${galaInfo.address}`
)}`;

interface Detail {
  icon: LucideIcon;
  label: string;
  value: string;
  note: string;
  link?: { href: string; label: string };
}

const details: Detail[] = [
  { icon: CalendarDays, label: "When", value: `${galaInfo.weekday}, ${galaInfo.date}`, note: galaInfo.time },
  {
    icon: MapPin,
    label: "Where",
    value: galaInfo.venueName,
    note: galaInfo.address,
    link: { href: directionsUrl, label: "Get directions" },
  },
  { icon: Sparkles, label: "Dress Code", value: galaInfo.dressCode, note: galaInfo.dressCodeNote },
];

function DetailCard({ icon: Icon, label, value, note, link }: Detail) {
  return (
    // Icon stacks above the text while three cards share a narrow row (md to lg)
    <GlassCard className="flex h-full items-start gap-4 md:flex-col xl:flex-row">
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-violet/10 text-violet">
        <Icon size={20} />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="mt-1 text-balance font-medium leading-snug">{value}</p>
        <p className="mt-0.5 text-pretty text-sm text-muted-foreground">{note}</p>
        {link && (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-violet hover:underline"
          >
            {link.label}
            <ArrowUpRight size={14} />
          </a>
        )}
      </div>
    </GlassCard>
  );
}

function Ornament({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex items-center justify-center gap-3", className)}>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold/80" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  );
}

// Laid out like the printed program in the ad book, in the navy and gold of the seating cards
function Program() {
  return (
    <motion.article
      variants={fadeInUp}
      className="bg-gala-table mx-auto max-w-3xl rounded-3xl p-2 text-white shadow-2xl shadow-violet-dark/25"
    >
      <div className="rounded-[1.25rem] px-6 py-12 ring-1 ring-inset ring-gold/35 sm:px-12 md:py-14">
        <header className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold-light/80">
            The Evening&rsquo;s
          </p>
          <h3 className="text-gold-foil mt-2 text-5xl leading-none sm:text-6xl">Program</h3>
        </header>

        <Ornament className="my-8" />

        {schedule.map((segment, s) => (
          <section key={segment.time} className="text-center">
            {s > 0 && (
              // Thin gold rule between parts of the evening
              <div
                aria-hidden
                className="mx-auto my-10 h-px max-w-xs bg-gradient-to-r from-transparent via-gold/70 to-transparent"
              />
            )}
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-gold-light/80">
              {segment.time}
            </p>
            <ul className="space-y-7">
              {segment.items.map((item) => (
                <li key={item.title}>
                  <p className="text-balance font-serif text-2xl leading-tight sm:text-[1.75rem]">{item.title}</p>
                  {item.speaker && (
                    <p className="mt-1.5 text-balance text-sm text-white/60 sm:text-base">
                      <span className="font-semibold text-gold-light">{item.speaker}</span>
                      {item.role && (
                        <>
                          <span aria-hidden className="mx-2 text-gold/60">
                            &middot;
                          </span>
                          <span className="sr-only">, </span>
                          {item.role}
                        </>
                      )}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <Ornament className="mt-10" />
      </div>
    </motion.article>
  );
}

export function Gala() {
  return (
    <SectionWrapper id="gala" className="bg-muted/30">
      <SectionHeading
        badge={galaInfo.date}
        title="Anniversary Gala"
        subtitle="An unforgettable evening celebrating 40 years of excellence."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="mb-16 grid gap-6 md:grid-cols-3"
      >
        {details.map((detail) => (
          <motion.div key={detail.label} variants={fadeInUp}>
            <DetailCard {...detail} />
          </motion.div>
        ))}
      </motion.div>

      {schedule.length > 0 && (
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          <Program />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center"
      >
        <Link href="/seating">
          <Button size="lg" className="w-full">
            <Armchair size={20} />
            Find Your Table
          </Button>
        </Link>
        <a href={galaInfo.donateUrl} target="_blank" rel="noopener noreferrer">
          <Button size="lg" variant="outline" className="w-full">
            Donate &amp; Tickets
          </Button>
        </a>
      </motion.div>
    </SectionWrapper>
  );
}
