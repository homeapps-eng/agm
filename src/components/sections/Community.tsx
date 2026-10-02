"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { donationTiers, type DonationTier } from "@/data/shop";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Heart, Check, Send, Star, User, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const GIVEBUTTER_URL = "https://givebutter.com/agm40";

function formatAmount(amount: number) {
  return amount.toLocaleString("en-US");
}

function PerkList({ perks, className }: { perks: string[]; className?: string }) {
  return (
    <ul className={cn("space-y-2", className)}>
      {perks.map((perk) => (
        <li key={perk} className="flex items-start gap-2 text-sm">
          <Check size={14} className="mt-0.5 flex-shrink-0 text-emerald-500" />
          <span>{perk}</span>
        </li>
      ))}
    </ul>
  );
}

// Phones show two compact, equal-size cards per row with the perks behind "Read more"
function TierCard({
  tier,
  selected,
  onSelect,
  onReadMore,
}: {
  tier: DonationTier;
  selected: boolean;
  onSelect: () => void;
  onReadMore: () => void;
}) {
  return (
    <GlassCard
      className={cn(
        "relative flex h-full cursor-pointer flex-col p-4 transition-all sm:p-6",
        selected ? "ring-2 ring-violet shadow-lg shadow-violet/10" : "hover:ring-1 hover:ring-violet/50"
      )}
      onClick={onSelect}
    >
      {/* Same navy-to-gold border as the sponsor cards */}
      <span aria-hidden className="gradient-border pointer-events-none absolute -inset-px rounded-2xl" />
      {tier.featured && (
        <div className="absolute top-3 right-3">
          <Star size={16} className="text-amber-400 fill-amber-400" />
        </div>
      )}
      <div className={cn("mb-1 flex items-center gap-2", tier.featured && "pr-5")}>
        <Heart
          size={18}
          className={cn(
            "h-4 w-4 flex-shrink-0 text-muted-foreground sm:h-[18px] sm:w-[18px]",
            selected && "text-violet fill-violet"
          )}
        />
        <h3 className={cn("text-sm font-semibold leading-snug", tier.featured ? "sm:text-lg" : "sm:text-base")}>
          {tier.name}
        </h3>
      </div>
      <p className={cn("font-bold font-serif text-violet", tier.featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl")}>
        ${formatAmount(tier.amount)}
      </p>
      <p className="mt-1 line-clamp-3 text-xs text-muted-foreground sm:mt-2 sm:line-clamp-none sm:text-sm">
        {tier.description}
      </p>
      <PerkList perks={tier.perks} className="mt-4 hidden sm:block" />
      <button
        type="button"
        onClick={onReadMore}
        className="mt-auto self-start pt-2 text-xs font-semibold text-violet underline-offset-2 hover:underline sm:hidden"
      >
        Read more
      </button>
    </GlassCard>
  );
}

export function Community() {
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [openTier, setOpenTier] = useState<DonationTier | null>(null);

  const handleDonate = () => {
    if (selectedTier === null) return;
    window.open(GIVEBUTTER_URL, "_blank");
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
        className="grid auto-rows-fr grid-cols-2 gap-3 sm:auto-rows-auto sm:gap-6"
      >
        {featuredTiers.map((tier) => (
          <motion.div key={tier.name} variants={fadeInUp}>
            <TierCard
              tier={tier}
              selected={selectedTier === donationTiers.indexOf(tier)}
              onSelect={() => setSelectedTier(donationTiers.indexOf(tier))}
              onReadMore={() => setOpenTier(tier)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Standard Tiers */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-3 grid auto-rows-fr grid-cols-2 gap-3 sm:mt-6 sm:auto-rows-auto sm:gap-6 lg:grid-cols-3"
      >
        {standardTiers.map((tier) => (
          <motion.div key={tier.name} variants={fadeInUp}>
            <TierCard
              tier={tier}
              selected={selectedTier === donationTiers.indexOf(tier)}
              onSelect={() => setSelectedTier(donationTiers.indexOf(tier))}
              onReadMore={() => setOpenTier(tier)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Phones list the perks here instead of on the card */}
      <Modal isOpen={openTier !== null} onClose={() => setOpenTier(null)} className="max-w-lg">
        {openTier && (
          <div>
            <div className="mb-1 flex items-center gap-2 pr-10">
              {openTier.featured && <Star size={16} className="flex-shrink-0 text-amber-400 fill-amber-400" />}
              <h3 className="font-semibold text-xl">{openTier.name}</h3>
            </div>
            <p className="text-3xl font-bold font-serif text-violet">${formatAmount(openTier.amount)}</p>
            <p className="mt-2 text-sm text-muted-foreground">{openTier.description}</p>
            <PerkList perks={openTier.perks} className="mt-4" />
            <Button className="mt-6 w-full" onClick={() => window.open(GIVEBUTTER_URL, "_blank")}>
              Sponsor as {openTier.name}
            </Button>
          </div>
        )}
      </Modal>

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
              href="mailto:gala@agmschool.org"
              className="flex w-full items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors hover:border-violet"
            >
              <Mail size={16} className="text-violet" />
              gala@agmschool.org
            </a>
            <a href="mailto:gala@agmschool.org" className="block">
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
