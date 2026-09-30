"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { galaInfo, schedule, speakers } from "@/data/gala";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Calendar, MapPin, Clock, Sparkles } from "lucide-react";

export function Gala() {
  return (
    <SectionWrapper id="gala" className="bg-muted/30">
      <SectionHeading
        badge="November 14, 2026"
        title="Anniversary Gala"
        subtitle="An unforgettable evening celebrating 40 years of excellence."
      />

      {/* Event Info */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {[
          { icon: Calendar, label: "Date", value: galaInfo.date },
          { icon: Clock, label: "Time", value: galaInfo.time },
          { icon: MapPin, label: "Venue", value: galaInfo.venue },
          { icon: Sparkles, label: "Dress Code", value: galaInfo.dressCode },
        ].map((item) => (
          <motion.div key={item.label} variants={fadeInUp}>
            <GlassCard className="flex items-start gap-4">
              <item.icon size={22} className="mt-0.5 flex-shrink-0 text-violet" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{item.label}</p>
                <p className="mt-1 font-medium">{item.value}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-16 lg:grid-cols-2">
        {/* Schedule */}
        <div>
          <h3 className="mb-6 text-2xl font-serif">Evening Schedule</h3>
          {schedule.length === 0 ? (
            <GlassCard className="flex items-center justify-center py-12">
              <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                To Be Announced
              </p>
            </GlassCard>
          ) : (
            <div className="space-y-0">
              {schedule.map((item, i) => (
                <motion.div
                  key={item.time}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-4 border-l-2 border-violet/20 py-4 pl-6 last:border-l-violet"
                >
                  <span className="flex-shrink-0 text-sm font-medium text-violet">{item.time}</span>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Speakers */}
        <div>
          <h3 className="mb-6 text-2xl font-serif">Featured Speakers</h3>
          {speakers.length === 0 ? (
            <GlassCard className="flex items-center justify-center py-12">
              <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                To Be Announced
              </p>
            </GlassCard>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-4 sm:grid-cols-2"
            >
              {speakers.map((speaker) => (
                <motion.div key={speaker.name} variants={fadeInUp}>
                  <GlassCard className="h-full">
                    <div className="mb-3 h-12 w-12 rounded-full bg-violet/10 flex items-center justify-center text-violet font-bold font-serif">
                      {speaker.name.split(" ").pop()?.[0]}
                    </div>
                    <h4 className="font-semibold">{speaker.name}</h4>
                    <p className="text-sm text-violet">{speaker.title}</p>
                    <Badge variant="muted" className="mt-3">{speaker.topic}</Badge>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Donate & Tickets */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 flex justify-center"
      >
        <a href={galaInfo.donateUrl} target="_blank" rel="noopener noreferrer">
          <Button size="lg">Donate &amp; Tickets</Button>
        </a>
      </motion.div>
    </SectionWrapper>
  );
}
