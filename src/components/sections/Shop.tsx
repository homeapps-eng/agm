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
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs text-muted-foreground">{product.category}</span>
                  <h3 className="mt-1 font-semibold">{product.name}</h3>
                  <p className="mt-1 flex-1 text-sm text-muted-foreground">{product.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-violet">${product.price}</span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors group-hover:text-violet">
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
