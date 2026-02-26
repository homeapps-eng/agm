"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { stats, notableAlumni, achievements } from "@/data/honors";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Award, Users, Globe, BookOpen } from "lucide-react";

const statIcons = [Award, Users, Globe, BookOpen];

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
    <span ref={ref} className="text-4xl font-bold font-serif text-gradient sm:text-5xl">
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
        className="grid grid-cols-2 gap-6 md:grid-cols-4"
      >
        {stats.map((stat, i) => {
          const Icon = statIcons[i];
          return (
            <motion.div key={stat.label} variants={fadeInUp} className="text-center">
              <GlassCard className="flex flex-col items-center gap-3 p-8">
                <Icon size={28} className="text-violet" />
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Notable Alumni */}
      <div className="mt-20">
        <h3 className="mb-8 text-center text-2xl font-serif">Notable Alumni</h3>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {notableAlumni.map((alum) => (
            <motion.div key={alum.name} variants={fadeInUp}>
              <GlassCard className="h-full">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">{alum.name}</h4>
                    <p className="text-sm text-violet">{alum.role}</p>
                  </div>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    &apos;{String(alum.year).slice(-2)}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{alum.achievement}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Achievement Ticker */}
      <div className="mt-16 overflow-hidden">
        <div className="flex animate-[scroll_30s_linear_infinite] gap-6">
          {[...achievements, ...achievements].map((a, i) => (
            <div
              key={i}
              className="flex-shrink-0 whitespace-nowrap rounded-full border border-border bg-card px-5 py-2 text-sm"
            >
              <span className="font-medium text-violet">{a.year}</span>
              <span className="mx-2 text-muted-foreground">&mdash;</span>
              <span>{a.text}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </SectionWrapper>
  );
}
