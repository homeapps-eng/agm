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

            {/* Road at top */}
            <rect x="0" y="0" width="160" height="5" className="fill-stone-200 dark:fill-stone-800" />
            <line x1="0" y1="2.5" x2="160" y2="2.5" className="stroke-stone-300 dark:stroke-stone-600" strokeWidth="0.3" strokeDasharray="3 2" />

            {/* Road at bottom */}
            <rect x="0" y="95" width="160" height="5" className="fill-stone-200 dark:fill-stone-800" />
            <line x1="0" y1="97.5" x2="160" y2="97.5" className="stroke-stone-300 dark:stroke-stone-600" strokeWidth="0.3" strokeDasharray="3 2" />

            {/* Paths / walkways */}
            <path d="M30 45 L48 45" fill="none" className="stroke-stone-300 dark:stroke-stone-700" strokeWidth="0.8" strokeDasharray="2 1.5" />
            <path d="M72 55 L72 65" fill="none" className="stroke-stone-300 dark:stroke-stone-700" strokeWidth="0.8" strokeDasharray="2 1.5" />
            <path d="M72 45 L100 45" fill="none" className="stroke-stone-300 dark:stroke-stone-700" strokeWidth="0.8" strokeDasharray="2 1.5" />
            <path d="M30 55 L30 65" fill="none" className="stroke-stone-300 dark:stroke-stone-700" strokeWidth="0.8" strokeDasharray="2 1.5" />

            {/* ===== TOP-LEFT: Parking ===== */}
            <rect x="5" y="7" width="30" height="12" rx="1" className="fill-stone-200/60 dark:fill-stone-700/30 stroke-stone-300 dark:stroke-stone-600" strokeWidth="0.3" />
            {[9, 15, 21, 27].map((px) => (
              <rect key={px} x={px} y={9} width="3" height="7" rx="0.5" className="fill-stone-300/40 dark:fill-stone-600/30 stroke-stone-400/30" strokeWidth="0.2" />
            ))}
            <text x="20" y="6" textAnchor="middle" className="fill-stone-400 dark:fill-stone-500" fontSize="2">Parking</text>

            {/* ===== TOP-RIGHT: Gugasian Hall ===== */}
            <rect x="55" y="7" width="55" height="18" rx="2" className="fill-emerald-50 dark:fill-emerald-900/20 stroke-emerald-400/40" strokeWidth="0.6" />
            {[60, 67, 74, 81, 88, 95, 102].map((wx) => (
              <rect key={wx} x={wx} y={12} width="2.5" height="2.5" rx="0.3" className="fill-emerald-400/15 stroke-emerald-400/25" strokeWidth="0.2" />
            ))}
            {[60, 67, 74, 81, 88, 95, 102].map((wx) => (
              <rect key={`b${wx}`} x={wx} y={18} width="2.5" height="2.5" rx="0.3" className="fill-emerald-400/15 stroke-emerald-400/25" strokeWidth="0.2" />
            ))}
            <text x="82" y="6" textAnchor="middle" className="fill-emerald-600/50 dark:fill-emerald-400/40" fontSize="2.8">Gugasian Hall</text>

            {/* ===== LEFT: Preschool (below parking) ===== */}
            <rect x="5" y="23" width="30" height="16" rx="2" className="fill-sky-50 dark:fill-sky-900/20 stroke-sky-400/40" strokeWidth="0.6" />
            <circle cx="13" cy="31" r="1" className="fill-sky-300/30" />
            <circle cx="18" cy="29" r="1.2" className="fill-sky-300/30" />
            <circle cx="23" cy="32" r="0.8" className="fill-sky-300/30" />
            <circle cx="28" cy="30" r="1" className="fill-sky-300/30" />
            <text x="20" y="22" textAnchor="middle" className="fill-sky-600/50 dark:fill-sky-400/40" fontSize="2.5">Preschool</text>

            {/* ===== Small parking above AGM ===== */}
            <rect x="38" y="28" width="22" height="8" rx="1" className="fill-stone-200/60 dark:fill-stone-700/30 stroke-stone-300 dark:stroke-stone-600" strokeWidth="0.3" />
            {[41, 46, 51].map((px) => (
              <rect key={px} x={px} y={30} width="3" height="4" rx="0.5" className="fill-stone-300/40 dark:fill-stone-600/30 stroke-stone-400/30" strokeWidth="0.2" />
            ))}

            {/* ===== CENTER: AGM Main School Building ===== */}
            <rect x="5" y="38" width="68" height="26" rx="2" className="fill-violet/10 stroke-violet/40" strokeWidth="0.6" />
            {/* Entrance */}
            <rect x="35" y="64" width="8" height="3" rx="0.5" className="fill-violet/20 stroke-violet/30" strokeWidth="0.3" />
            {/* Windows row 1 */}
            {[10, 18, 26, 34, 42, 50, 58, 66].map((wx) => (
              <rect key={wx} x={wx} y={43} width="3" height="3" rx="0.3" className="fill-violet/15 stroke-violet/25" strokeWidth="0.2" />
            ))}
            {/* Windows row 2 */}
            {[10, 18, 26, 34, 42, 50, 58, 66].map((wx) => (
              <rect key={`b${wx}`} x={wx} y={51} width="3" height="3" rx="0.3" className="fill-violet/15 stroke-violet/25" strokeWidth="0.2" />
            ))}
            <text x="39" y="36" textAnchor="middle" className="fill-violet/60 dark:fill-violet/40" fontSize="3.5" fontWeight="bold">AGM</text>

            {/* ===== Barsamian Center (from AGM right wall) ===== */}
            <rect x="73" y="38" width="22" height="26" rx="2" className="fill-rose-50 dark:fill-rose-900/20 stroke-rose-400/40" strokeWidth="0.6" />
            {[76, 82, 88].map((wx) => (
              <rect key={wx} x={wx} y={46} width="2" height="2" rx="0.3" className="fill-rose-400/15 stroke-rose-400/25" strokeWidth="0.2" />
            ))}
            <text x="84" y="36" textAnchor="middle" className="fill-rose-600/50 dark:fill-rose-400/40" fontSize="2.2">Barsamian Center</text>

            {/* ===== Small parking above Church ===== */}
            <rect x="118" y="30" width="24" height="7" rx="1" className="fill-stone-200/60 dark:fill-stone-700/30 stroke-stone-300 dark:stroke-stone-600" strokeWidth="0.3" />
            {[122, 128, 134].map((px) => (
              <rect key={px} x={px} y={32} width="3" height="3.5" rx="0.5" className="fill-stone-300/40 dark:fill-stone-600/30 stroke-stone-400/30" strokeWidth="0.2" />
            ))}

            {/* ===== RIGHT: Church ===== */}
            <rect x="114" y="40" width="32" height="24" rx="2" className="fill-amber-50 dark:fill-amber-900/20 stroke-gold/40" strokeWidth="0.6" />
            {/* Cross on church */}
            <line x1="130" y1="34" x2="130" y2="40" className="stroke-gold/60" strokeWidth="0.6" />
            <line x1="127.5" y1="36.5" x2="132.5" y2="36.5" className="stroke-gold/60" strokeWidth="0.6" />
            {/* Dome */}
            <path d="M124 40 Q130 32 136 40" fill="none" className="stroke-gold/50" strokeWidth="0.5" />
            {/* Door */}
            <rect x="128" y="58" width="4" height="6" rx="1" className="fill-gold/15 stroke-gold/30" strokeWidth="0.3" />
            {/* Windows */}
            {[118, 124, 136, 142].map((wx) => (
              <rect key={wx} x={wx} y={47} width="2.5" height="2.5" rx="0.3" className="fill-gold/15 stroke-gold/25" strokeWidth="0.2" />
            ))}

            {/* ===== BOTTOM-LEFT: Basketball Court ===== */}
            <rect x="5" y="65" width="28" height="14" rx="1.5" className="fill-orange-100 dark:fill-orange-900/30 stroke-orange-300 dark:stroke-orange-700" strokeWidth="0.5" />
            <circle cx="19" cy="72" r="3.5" fill="none" className="stroke-orange-300 dark:stroke-orange-600" strokeWidth="0.4" />
            <line x1="19" y1="65" x2="19" y2="79" className="stroke-orange-300 dark:stroke-orange-600" strokeWidth="0.3" strokeDasharray="1 1" />
            <text x="19" y="63" textAnchor="middle" className="fill-orange-500/50 dark:fill-orange-400/40" fontSize="2.2">Basketball</text>

            {/* ===== BOTTOM-LEFT: Soccer Field (below basketball) ===== */}
            <rect x="5" y="81" width="28" height="13" rx="1.5" className="fill-emerald-100 dark:fill-emerald-900/30 stroke-emerald-400 dark:stroke-emerald-700" strokeWidth="0.5" />
            <circle cx="19" cy="87.5" r="3" fill="none" className="stroke-emerald-400 dark:stroke-emerald-600" strokeWidth="0.4" />
            <line x1="19" y1="81" x2="19" y2="94" className="stroke-emerald-400 dark:stroke-emerald-600" strokeWidth="0.3" strokeDasharray="1 1" />
            {/* Goals */}
            <rect x="5" y="84" width="2" height="7" rx="0.5" fill="none" className="stroke-emerald-500 dark:stroke-emerald-500" strokeWidth="0.4" />
            <rect x="31" y="84" width="2" height="7" rx="0.5" fill="none" className="stroke-emerald-500 dark:stroke-emerald-500" strokeWidth="0.4" />
            <text x="19" y="80" textAnchor="middle" className="fill-emerald-500/50 dark:fill-emerald-400/40" fontSize="2.2">Soccer</text>

            {/* ===== BOTTOM: Large Parking Lot ===== */}
            <rect x="40" y="82" width="55" height="12" rx="1" className="fill-stone-200/60 dark:fill-stone-700/30 stroke-stone-300 dark:stroke-stone-600" strokeWidth="0.3" />
            {[44, 50, 56, 62, 68, 74, 80, 86].map((px) => (
              <rect key={px} x={px} y={84} width="3.5" height="8" rx="0.5" className="fill-stone-300/40 dark:fill-stone-600/30 stroke-stone-400/30" strokeWidth="0.2" />
            ))}
            <rect x="100" y="82" width="50" height="12" rx="1" className="fill-stone-200/60 dark:fill-stone-700/30 stroke-stone-300 dark:stroke-stone-600" strokeWidth="0.3" />
            {[104, 110, 116, 122, 128, 134, 140].map((px) => (
              <rect key={`p2${px}`} x={px} y={84} width="3.5" height="8" rx="0.5" className="fill-stone-300/40 dark:fill-stone-600/30 stroke-stone-400/30" strokeWidth="0.2" />
            ))}
            <text x="92" y="80" textAnchor="middle" className="fill-stone-400 dark:fill-stone-500" fontSize="2.5">Parking</text>

            {/* Trees scattered */}
            {[
              [40, 12], [85, 15], [88, 50], [82, 70], [38, 72],
              [140, 72], [150, 45], [90, 30], [78, 60],
            ].map(([tx, ty], i) => (
              <g key={i}>
                <circle cx={tx} cy={ty} r="3" className="fill-emerald-300/25 dark:fill-emerald-600/15" />
                <circle cx={tx} cy={(ty as number) - 1} r="2" className="fill-emerald-400/20 dark:fill-emerald-500/15" />
              </g>
            ))}
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
