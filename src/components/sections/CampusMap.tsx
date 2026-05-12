"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildings, type Building } from "@/data/buildings";
import { RotateCw } from "lucide-react";

const GOOGLE_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

function streetViewUrl(b: Building, size = "600x400") {
  if (!GOOGLE_KEY) return null;
  return `https://maps.googleapis.com/maps/api/streetview?size=${size}&location=${b.lat},${b.lng}&heading=${b.heading}&pitch=10&fov=85&key=${GOOGLE_KEY}`;
}

export function CampusMap() {
  return (
    <SectionWrapper id="campus" className="overflow-hidden">
      <SectionHeading
        badge="Campus"
        title="The AGM Deck"
        subtitle="Every corner of campus, one card at a time. Tap any card to flip it."
      />

      <div className="-mx-4 overflow-x-auto px-4 pb-4">
        <div
          className="flex min-w-max gap-5"
          style={{ perspective: "1600px" }}
        >
          {buildings.map((b) => (
            <FlipCard key={b.id} building={b} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function FlipCard({ building }: { building: Building }) {
  const [flipped, setFlipped] = useState(false);
  const photoUrl = streetViewUrl(building);

  return (
    <motion.div
      className="relative h-[420px] w-[280px] flex-shrink-0 cursor-pointer"
      style={{ transformStyle: "preserve-3d" }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 110, damping: 22 }}
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 overflow-hidden rounded-3xl border border-border bg-card shadow-xl"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div className="relative h-[55%] w-full overflow-hidden bg-muted">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={building.name}
                fill
                sizes="280px"
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-full items-center justify-center text-center text-xs text-muted-foreground">
                Add NEXT_PUBLIC_GOOGLE_MAPS_KEY
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-x-4 bottom-4">
              <p
                className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.15em]"
                style={{ color: building.accentColor }}
              >
                {building.category}
              </p>
              <h3 className="font-serif text-xl leading-tight text-white">
                {building.name}
              </h3>
            </div>
          </div>
          <div className="flex h-[45%] flex-col justify-between p-4">
            <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {building.description}
            </p>
            <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
              <RotateCw size={12} />
              Tap to flip
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 overflow-hidden rounded-3xl border border-border shadow-xl"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(135deg, ${building.accentColor}26, ${building.accentColor}05 60%, transparent)`,
          }}
        >
          <div className="flex h-full flex-col p-5">
            <p
              className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em]"
              style={{ color: building.accentColor }}
            >
              {building.category}
            </p>
            <h3 className="mb-4 font-serif text-xl leading-tight">
              {building.name}
            </h3>
            <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
              {building.description}
            </p>
            <ul className="space-y-2 text-sm">
              {building.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span
                    className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: building.accentColor }}
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
              <RotateCw size={12} />
              Tap to flip back
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
