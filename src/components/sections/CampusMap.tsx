"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { campusLocations, type CampusLocation } from "@/data/campus";
import { X, School, Church, Building, TreePine, Landmark, Dribbble } from "lucide-react";
import { cn } from "@/lib/utils";

const categoryIcons = {
  school: School,
  church: Church,
  hall: Building,
  center: Landmark,
  sports: Dribbble,
  outdoor: TreePine,
};

const categoryColors = {
  school: "bg-violet text-white",
  church: "bg-gold text-white",
  hall: "bg-emerald-500 text-white",
  center: "bg-rose-500 text-white",
  sports: "bg-blue-500 text-white",
  outdoor: "bg-sky-500 text-white",
};

const categoryLabels = {
  school: "School",
  church: "Church",
  hall: "Hall",
  center: "Center",
  sports: "Sports",
  outdoor: "Outdoor",
};

export function CampusMap() {
  const [selected, setSelected] = useState<CampusLocation | null>(null);

  return (
    <SectionWrapper id="campus">
      <SectionHeading
        badge="Explore"
        title="Our Campus"
        subtitle="5315 W McFadden Ave, Santa Ana, CA — home to AGM and Forty Martyrs Armenian Apostolic Church."
      />

      <div className="relative mx-auto max-w-4xl">
        {/* SVG Campus Illustration */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-muted/50">
          <svg
            viewBox="0 0 160 100"
            className="absolute inset-0 h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ground / grass */}
            <rect x="0" y="0" width="160" height="100" className="fill-emerald-50 dark:fill-emerald-950/20" />

            {/* Paths / walkways */}
            <path d="M35 35 L75 35" fill="none" className="stroke-stone-300 dark:stroke-stone-700" strokeWidth="0.8" strokeDasharray="2 1.5" />
            <path d="M80 35 L80 62" fill="none" className="stroke-stone-300 dark:stroke-stone-700" strokeWidth="0.8" strokeDasharray="2 1.5" />
            <path d="M80 45 L110 45" fill="none" className="stroke-stone-300 dark:stroke-stone-700" strokeWidth="0.8" strokeDasharray="2 1.5" />
            <path d="M80 62 L93 62" fill="none" className="stroke-stone-300 dark:stroke-stone-700" strokeWidth="0.8" strokeDasharray="2 1.5" />
            <path d="M72 75 L80 62" fill="none" className="stroke-stone-300 dark:stroke-stone-700" strokeWidth="0.8" strokeDasharray="2 1.5" />

            {/* Road at top */}
            <rect x="0" y="0" width="160" height="6" className="fill-stone-200 dark:fill-stone-800" />
            <line x1="0" y1="3" x2="160" y2="3" className="stroke-stone-300 dark:stroke-stone-600" strokeWidth="0.3" strokeDasharray="3 2" />

            {/* Road at bottom */}
            <rect x="0" y="94" width="160" height="6" className="fill-stone-200 dark:fill-stone-800" />
            <line x1="0" y1="97" x2="160" y2="97" className="stroke-stone-300 dark:stroke-stone-600" strokeWidth="0.3" strokeDasharray="3 2" />

            {/* Basketball Court (left side) */}
            <rect x="12" y="20" width="22" height="16" rx="1.5" className="fill-orange-100 dark:fill-orange-900/30 stroke-orange-300 dark:stroke-orange-700" strokeWidth="0.5" />
            <circle cx="23" cy="28" r="4" fill="none" className="stroke-orange-300 dark:stroke-orange-600" strokeWidth="0.4" />
            <line x1="23" y1="20" x2="23" y2="36" className="stroke-orange-300 dark:stroke-orange-600" strokeWidth="0.3" strokeDasharray="1 1" />

            {/* Soccer Field (left side, below basketball) */}
            <rect x="8" y="44" width="30" height="20" rx="1.5" className="fill-emerald-100 dark:fill-emerald-900/30 stroke-emerald-400 dark:stroke-emerald-700" strokeWidth="0.5" />
            <circle cx="23" cy="54" r="4" fill="none" className="stroke-emerald-400 dark:stroke-emerald-600" strokeWidth="0.4" />
            <line x1="23" y1="44" x2="23" y2="64" className="stroke-emerald-400 dark:stroke-emerald-600" strokeWidth="0.3" strokeDasharray="1 1" />
            {/* Goals */}
            <rect x="8" y="50" width="2" height="8" rx="0.5" fill="none" className="stroke-emerald-500 dark:stroke-emerald-500" strokeWidth="0.4" />
            <rect x="36" y="50" width="2" height="8" rx="0.5" fill="none" className="stroke-emerald-500 dark:stroke-emerald-500" strokeWidth="0.4" />

            {/* Main School Building (center) */}
            <rect x="60" y="24" width="28" height="18" rx="2" className="fill-violet/10 stroke-violet/40" strokeWidth="0.6" />
            <rect x="71" y="42" width="6" height="3" rx="0.5" className="fill-violet/20 stroke-violet/30" strokeWidth="0.3" />
            {/* Windows */}
            {[64, 69, 74, 79, 84].map((wx) => (
              <rect key={wx} x={wx} y={28} width="2.5" height="2.5" rx="0.3" className="fill-violet/15 stroke-violet/25" strokeWidth="0.2" />
            ))}
            {[64, 69, 74, 79, 84].map((wx) => (
              <rect key={`b${wx}`} x={wx} y={34} width="2.5" height="2.5" rx="0.3" className="fill-violet/15 stroke-violet/25" strokeWidth="0.2" />
            ))}
            <text x="74" y="21" textAnchor="middle" className="fill-violet/60 dark:fill-violet/40" fontSize="3" fontWeight="bold">AGM</text>

            {/* Church (right of school) */}
            <rect x="102" y="34" width="20" height="18" rx="2" className="fill-amber-50 dark:fill-amber-900/20 stroke-gold/40" strokeWidth="0.6" />
            {/* Cross on church */}
            <line x1="112" y1="28" x2="112" y2="34" className="stroke-gold/60" strokeWidth="0.6" />
            <line x1="109.5" y1="30.5" x2="114.5" y2="30.5" className="stroke-gold/60" strokeWidth="0.6" />
            {/* Dome */}
            <path d="M107 34 Q112 26 117 34" fill="none" className="stroke-gold/50" strokeWidth="0.5" />
            {/* Door */}
            <rect x="110" y="46" width="4" height="6" rx="1" className="fill-gold/15 stroke-gold/30" strokeWidth="0.3" />

            {/* Gugasian Hall (upper right) */}
            <rect x="110" y="14" width="22" height="12" rx="2" className="fill-emerald-50 dark:fill-emerald-900/20 stroke-emerald-400/40" strokeWidth="0.6" />
            {[114, 119, 124].map((wx) => (
              <rect key={wx} x={wx} y={17} width="2" height="2" rx="0.3" className="fill-emerald-400/15 stroke-emerald-400/25" strokeWidth="0.2" />
            ))}
            <text x="121" y="12" textAnchor="middle" className="fill-emerald-600/50 dark:fill-emerald-400/40" fontSize="2.5">Gugasian Hall</text>

            {/* Barsamian Center (center-right, lower) */}
            <rect x="82" y="54" width="24" height="14" rx="2" className="fill-rose-50 dark:fill-rose-900/20 stroke-rose-400/40" strokeWidth="0.6" />
            {[86, 91, 96, 101].map((wx) => (
              <rect key={wx} x={wx} y={58} width="2" height="2" rx="0.3" className="fill-rose-400/15 stroke-rose-400/25" strokeWidth="0.2" />
            ))}
            <text x="94" y="52" textAnchor="middle" className="fill-rose-600/50 dark:fill-rose-400/40" fontSize="2.2">Barsamian Center</text>

            {/* Preschool (lower center) */}
            <rect x="58" y="72" width="18" height="12" rx="2" className="fill-sky-50 dark:fill-sky-900/20 stroke-sky-400/40" strokeWidth="0.6" />
            {/* Play area dots */}
            <circle cx="63" cy="78" r="1" className="fill-sky-300/30" />
            <circle cx="67" cy="76" r="1.2" className="fill-sky-300/30" />
            <circle cx="71" cy="79" r="0.8" className="fill-sky-300/30" />
            <text x="67" y="70" textAnchor="middle" className="fill-sky-600/50 dark:fill-sky-400/40" fontSize="2.2">Preschool</text>

            {/* Trees scattered */}
            {[
              [5, 15], [45, 18], [52, 50], [140, 25], [145, 60], [42, 85],
              [100, 75], [130, 70], [15, 80], [48, 42], [135, 45],
            ].map(([tx, ty], i) => (
              <g key={i}>
                <circle cx={tx} cy={ty} r="3" className="fill-emerald-300/25 dark:fill-emerald-600/15" />
                <circle cx={tx} cy={(ty as number) - 1} r="2" className="fill-emerald-400/20 dark:fill-emerald-500/15" />
              </g>
            ))}

            {/* Parking lot */}
            <rect x="130" y="58" width="20" height="12" rx="1" className="fill-stone-200/60 dark:fill-stone-700/30 stroke-stone-300 dark:stroke-stone-600" strokeWidth="0.3" />
            {[134, 139, 144].map((px) => (
              <rect key={px} x={px} y={61} width="3" height="6" rx="0.5" className="fill-stone-300/40 dark:fill-stone-600/30 stroke-stone-400/30" strokeWidth="0.2" />
            ))}
            <text x="140" y="56" textAnchor="middle" className="fill-stone-400 dark:fill-stone-500" fontSize="2">Parking</text>
          </svg>

          {/* Clickable Pins */}
          {campusLocations.map((loc) => {
            const Icon = categoryIcons[loc.category];
            return (
              <button
                key={loc.id}
                onClick={() => setSelected(selected?.id === loc.id ? null : loc)}
                className={cn(
                  "absolute z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-md transition-transform hover:scale-125",
                  categoryColors[loc.category],
                  selected?.id === loc.id && "scale-125 ring-2 ring-white ring-offset-2 ring-offset-background"
                )}
                style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                aria-label={loc.name}
              >
                <Icon size={14} />
              </button>
            );
          })}
        </div>

        {/* Info Panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-4"
            >
              <GlassCard className="flex items-start gap-4">
                <div className={cn("flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full", categoryColors[selected.category])}>
                  {(() => { const Icon = categoryIcons[selected.category]; return <Icon size={18} />; })()}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{selected.name}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{selected.description}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-full p-1 text-muted-foreground hover:text-foreground"
                  aria-label="Close info"
                >
                  <X size={18} />
                </button>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {Object.entries(categoryIcons).map(([key, Icon]) => (
            <div key={key} className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className={cn("flex h-5 w-5 items-center justify-center rounded-full", categoryColors[key as keyof typeof categoryColors])}>
                <Icon size={10} />
              </div>
              <span>{categoryLabels[key as keyof typeof categoryLabels]}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
