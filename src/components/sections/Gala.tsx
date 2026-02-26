"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { galaInfo, schedule, speakers } from "@/data/gala";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Calendar, MapPin, Clock, Sparkles } from "lucide-react";

export function Gala() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", guests: "1" });

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    toast(`Thank you, ${formData.name}! Your RSVP has been received.`, "success");
    setFormData({ name: "", email: "", guests: "1" });
  };

  return (
    <SectionWrapper id="gala" className="bg-muted/30">
      <SectionHeading
        badge="September 15, 2026"
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
        </div>

        {/* Speakers */}
        <div>
          <h3 className="mb-6 text-2xl font-serif">Featured Speakers</h3>
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
        </div>
      </div>

      {/* RSVP Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mt-20 max-w-lg"
      >
        <GlassCard className="p-8">
          <h3 className="mb-6 text-center text-2xl font-serif">RSVP Now</h3>
          <form onSubmit={handleRSVP} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-violet focus:outline-none focus:ring-1 focus:ring-violet"
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-violet focus:outline-none focus:ring-1 focus:ring-violet"
            />
            <select
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-violet focus:outline-none focus:ring-1 focus:ring-violet"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
              ))}
            </select>
            <Button type="submit" className="w-full">
              Confirm RSVP
            </Button>
          </form>
        </GlassCard>
      </motion.div>
    </SectionWrapper>
  );
}
