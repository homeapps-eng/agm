"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { sponsors, anonymousSponsorCount } from "@/data/sponsors";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const topSponsors = sponsors.slice(0, 6);
const otherSponsors = sponsors.slice(6);

const formatAmount = (amount: number) => `$${amount.toLocaleString("en-US")}`;

export function Sponsors() {
  return (
    <SectionWrapper id="sponsors">
      <SectionHeading
        badge="Thank You"
        title="Our Sponsors"
        subtitle="With gratitude to everyone supporting AGM's 40th anniversary."
      />

      {/* Top Sponsors */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {topSponsors.map((sponsor) => (
          <motion.div key={sponsor.name} variants={fadeInUp}>
            <GlassCard className="h-full">
              <h4 className="font-semibold">{sponsor.name}</h4>
              {sponsor.amount && <p className="text-sm text-violet">{formatAmount(sponsor.amount)}</p>}
              {sponsor.note && (
                <p className="mt-3 text-sm text-muted-foreground">{sponsor.note}</p>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Sponsor Ticker */}
      <div className="mt-16 overflow-hidden">
        <div
          className="flex w-max animate-[ticker_40s_linear_infinite] gap-6 pr-6"
          style={{ animationDuration: `${(otherSponsors.length + 1) * 7}s` }}
        >
          {[0, 1].map((copy) => (
            <Fragment key={copy}>
              {otherSponsors.map((sponsor) => (
                <div
                  key={sponsor.name}
                  className="flex-shrink-0 whitespace-nowrap rounded-full border border-border bg-card px-5 py-2 text-sm"
                >
                  {sponsor.amount && (
                    <>
                      <span className="font-medium text-violet">{formatAmount(sponsor.amount)}</span>
                      <span className="mx-2 text-muted-foreground">&mdash;</span>
                    </>
                  )}
                  <span>{sponsor.name}</span>
                  {sponsor.note && <span className="text-muted-foreground"> &middot; {sponsor.note}</span>}
                </div>
              ))}
              <div className="flex-shrink-0 whitespace-nowrap rounded-full border border-border bg-card px-5 py-2 text-sm">
                <span className="font-medium text-violet">{anonymousSponsorCount}</span>
                <span className="ml-1">anonymous donors</span>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
