"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { stats } from "@/data/honors";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Award, Users, GraduationCap, BookOpen, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const statIcons = [Award, Users, GraduationCap, BookOpen, UserCheck];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="text-3xl font-bold font-serif text-gradient sm:text-5xl">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function Honors() {
  return (
    <SectionWrapper id="honors" className="bg-muted/30">
      <SectionHeading
        badge="Impact"
        title="Honors & Impact"
        subtitle="Four decades of achievements that shaped lives and communities worldwide."
      />

      {/* Stats */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-6 gap-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-5"
      >
        {stats.map((stat, i) => {
          const Icon = statIcons[i];
          return (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              // Phones: 3 cards in the first row, 2 in the second (6-column grid)
              className={cn("text-center md:col-span-1", i < 3 ? "col-span-2" : "col-span-3")}
            >
              <GlassCard className="flex h-full flex-col items-center gap-2 px-2 py-4 sm:gap-3 sm:p-8">
                <Icon size={28} className="h-[22px] w-[22px] text-violet sm:h-7 sm:w-7" />
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <span className="text-xs leading-tight text-muted-foreground sm:text-sm">{stat.label}</span>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
