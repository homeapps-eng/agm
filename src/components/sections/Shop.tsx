"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { products } from "@/data/shop";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { ArrowUpRight } from "lucide-react";

export function Shop() {
  return (
    <SectionWrapper id="shop" className="bg-muted/30">
      <SectionHeading
        badge="Merchandise"
        title="Anniversary Shop"
        subtitle="Commemorate 40 years with exclusive anniversary merchandise."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3"
      >
        {products.map((product) => (
          <motion.div key={product.id} variants={fadeInUp}>
            <GlassCard className="group h-full overflow-hidden p-0" whileHover={{ y: -4 }}>
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col"
              >
                <div className="relative aspect-[3/2] bg-white">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-3 sm:p-5">
                  <span className="text-xs text-muted-foreground">{product.category}</span>
                  <h3 className="mt-1 text-sm font-semibold leading-snug sm:text-base">{product.name}</h3>
                  <p className="mt-1 flex-1 text-xs text-muted-foreground sm:text-sm">{product.description}</p>
                  <div className="mt-3 flex items-center justify-between sm:mt-4">
                    <span className="text-base font-bold text-violet sm:text-lg">${product.price}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium transition-colors group-hover:text-violet sm:gap-1.5 sm:text-sm">
                      Shop now
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </a>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
