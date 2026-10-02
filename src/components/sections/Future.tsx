"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Modal } from "@/components/ui/Modal";
import { visionIntro, visionCards, visionStatement, quotes, type VisionCard } from "@/data/future";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Sprout, Lightbulb, Heart, Landmark, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Sprout, Lightbulb, Heart, Landmark,
};

// On phones each description is cut to 6 lines so the cards match; cut-off ones get "Read more"
function VisionCardItem({ card, onReadMore }: { card: VisionCard; onReadMore: () => void }) {
  const Icon = iconMap[card.icon] || Sprout;
  const textRef = useRef<HTMLParagraphElement>(null);
  const [truncated, setTruncated] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    // Fires once on observe, then whenever the card is resized (e.g. crossing the breakpoint)
    const observer = new ResizeObserver(() => setTruncated(el.scrollHeight > el.clientHeight + 1));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <GlassCard className="flex h-full flex-col p-4 sm:p-6" whileHover={{ y: -4 }}>
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-violet/10 sm:mb-4 sm:h-12 sm:w-12 sm:rounded-xl">
        <Icon size={24} className="h-[18px] w-[18px] text-violet sm:h-6 sm:w-6" />
      </div>
      <h3 className="text-base font-semibold font-serif leading-snug sm:text-xl">{card.title}</h3>
      <p
        ref={textRef}
        className="mt-2 line-clamp-6 text-xs text-muted-foreground leading-relaxed sm:line-clamp-none sm:text-base"
      >
        {card.description}
      </p>
      {truncated && (
        <button
          type="button"
          onClick={onReadMore}
          className="mt-auto self-start pt-2 text-xs font-semibold text-violet underline-offset-2 hover:underline"
        >
          Read more
        </button>
      )}
    </GlassCard>
  );
}

export function Future() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [openCard, setOpenCard] = useState<VisionCard | null>(null);

  const next = useCallback(() => setQuoteIndex((i) => (i + 1) % quotes.length), []);
  const prev = useCallback(() => setQuoteIndex((i) => (i - 1 + quotes.length) % quotes.length), []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const OpenIcon = (openCard && iconMap[openCard.icon]) || Sprout;

  return (
    <SectionWrapper id="future">
      <SectionHeading
        badge="Vision"
        title="The Next 40 Years"
        subtitle={visionIntro}
      />

      {/* Vision Cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid auto-rows-fr grid-cols-2 gap-3 sm:auto-rows-auto sm:gap-6"
      >
        {visionCards.map((card) => (
          <motion.div key={card.title} variants={fadeInUp}>
            <VisionCardItem card={card} onReadMore={() => setOpenCard(card)} />
          </motion.div>
        ))}
      </motion.div>

      <Modal isOpen={openCard !== null} onClose={() => setOpenCard(null)} className="max-w-lg">
        {openCard && (
          <div className="pr-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet/10">
              <OpenIcon size={24} className="text-violet" />
            </div>
            <h3 className="text-xl font-semibold font-serif">{openCard.title}</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">{openCard.description}</p>
          </div>
        )}
      </Modal>

      {/* Main Vision */}
      <motion.p
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto mt-16 max-w-3xl text-balance text-center text-2xl font-serif leading-relaxed text-violet md:text-3xl"
      >
        {visionStatement}
      </motion.p>

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
