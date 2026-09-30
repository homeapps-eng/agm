"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { donationTiers } from "@/data/shop";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Heart, Check, Send, Star, User, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

function formatAmount(amount: number) {
  return amount.toLocaleString("en-US");
}

export function Community() {
  const [selectedTier, setSelectedTier] = useState<number | null>(null);

  const handleDonate = () => {
    if (selectedTier === null) return;
    window.open("https://givebutter.com/agm40", "_blank");
  };

  const featuredTiers = donationTiers.filter((t) => t.featured);
  const standardTiers = donationTiers.filter((t) => !t.featured);

  return (
    <SectionWrapper id="community" className="bg-muted/30">
      <SectionHeading
        badge="Give Back"
        title="Sponsorship Tiers"
        subtitle="Support AGM's 40th Anniversary Gala and leave a lasting legacy."
      />

      {/* Featured Tiers */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-6 md:grid-cols-2"
      >
        {featuredTiers.map((tier, i) => {
          const globalIndex = donationTiers.indexOf(tier);
          return (
            <motion.div key={tier.name} variants={fadeInUp}>
              <GlassCard
                className={cn(
                  "cursor-pointer h-full transition-all relative overflow-hidden",
                  selectedTier === globalIndex
                    ? "ring-2 ring-violet shadow-lg shadow-violet/10"
                    : "hover:ring-1 hover:ring-violet/50"
                )}
                onClick={() => setSelectedTier(globalIndex)}
              >
                <div className="absolute top-3 right-3">
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                </div>
                <div className="mb-1 flex items-center gap-2">
                  <Heart
                    size={18}
                    className={cn(
                      "text-muted-foreground",
                      selectedTier === globalIndex && "text-violet fill-violet"
                    )}
                  />
                  <h3 className="font-semibold text-lg">{tier.name}</h3>
                </div>
                <p className="text-3xl font-bold font-serif text-violet">
                  ${formatAmount(tier.amount)}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
                <ul className="mt-4 space-y-2">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-sm">
                      <Check size={14} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Standard Tiers */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {standardTiers.map((tier) => {
          const globalIndex = donationTiers.indexOf(tier);
          return (
            <motion.div key={tier.name} variants={fadeInUp}>
              <GlassCard
                className={cn(
                  "cursor-pointer h-full transition-all",
                  selectedTier === globalIndex
                    ? "ring-2 ring-violet shadow-lg shadow-violet/10"
                    : "hover:ring-1 hover:ring-violet/50"
                )}
                onClick={() => setSelectedTier(globalIndex)}
              >
                <div className="mb-1 flex items-center gap-2">
                  <Heart
                    size={18}
                    className={cn(
                      "text-muted-foreground",
                      selectedTier === globalIndex && "text-violet fill-violet"
                    )}
                  />
                  <h3 className="font-semibold">{tier.name}</h3>
                </div>
                <p className="text-2xl font-bold font-serif text-violet">
                  ${formatAmount(tier.amount)}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
                <ul className="mt-4 space-y-2">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-sm">
                      <Check size={14} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>

      {selectedTier !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <Button onClick={handleDonate} size="lg">
            Sponsor as {donationTiers[selectedTier].name} — ${formatAmount(donationTiers[selectedTier].amount)}
          </Button>
        </motion.div>
      )}

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mt-20 max-w-lg"
      >
        <GlassCard className="p-8">
          <h3 className="mb-6 text-center text-2xl font-serif">Get in Touch</h3>
          <div className="space-y-4">
            <div className="flex w-full items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm">
              <User size={16} className="text-violet" />
              Support Team
            </div>
            <a
              href="mailto:Talar@apelinc.net"
              className="flex w-full items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors hover:border-violet"
            >
              <Mail size={16} className="text-violet" />
              Talar@apelinc.net
            </a>
            <a href="mailto:Talar@apelinc.net" className="block">
              <Button className="w-full gap-2">
                <Send size={16} />
                Send Message
              </Button>
            </a>
          </div>
        </GlassCard>
      </motion.div>
    </SectionWrapper>
  );
}
