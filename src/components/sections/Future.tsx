"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { visionCards, quotes } from "@/data/future";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Brain, Globe, Leaf, BookOpen, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Brain, Globe, Leaf, BookOpen,
};

export function Future() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const next = useCallback(() => setQuoteIndex((i) => (i + 1) % quotes.length), []);
  const prev = useCallback(() => setQuoteIndex((i) => (i - 1 + quotes.length) % quotes.length), []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <SectionWrapper id="future">
      <SectionHeading
        badge="Vision"
        title="The Next 40 Years"
        subtitle="Bold aspirations for the future of education and innovation."
      />

      {/* Vision Cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-6 sm:grid-cols-2"
      >
        {visionCards.map((card) => {
          const Icon = iconMap[card.icon] || Brain;
          return (
            <motion.div key={card.title} variants={fadeInUp}>
              <GlassCard className="h-full" whileHover={{ y: -4 }}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet/10">
                  <Icon size={24} className="text-violet" />
                </div>
                <h3 className="text-xl font-semibold font-serif">{card.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{card.description}</p>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Quote Carousel */}
      <div className="mx-auto mt-20 max-w-3xl">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-12">
          <Quote size={40} className="absolute left-6 top-6 text-violet/10" />
          <AnimatePresence mode="wait">
            <motion.div
              key={quoteIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <p className="text-xl font-serif leading-relaxed md:text-2xl">
                &ldquo;{quotes[quoteIndex].text}&rdquo;
              </p>
              <div className="mt-6">
                <p className="font-semibold">{quotes[quoteIndex].author}</p>
                <p className="text-sm text-muted-foreground">{quotes[quoteIndex].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Previous quote"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {quotes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setQuoteIndex(i)}
                  className={`h-2 rounded-full transition-all ${i === quoteIndex ? "w-6 bg-violet" : "w-2 bg-muted-foreground/30"}`}
                  aria-label={`Go to quote ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Next quote"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
