"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-start justify-center overflow-hidden bg-gradient-hero pt-20 sm:pt-24"
    >
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-violet/10 blur-3xl animate-float" />
        <div className="absolute right-1/4 bottom-1/3 h-64 w-64 rounded-full bg-gold/10 blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
        {/* Animated Logo - starts filling the screen, shrinks into place */}
        <motion.div
          initial={{ scale: 5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            scale: { duration: 3, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 1.5, ease: "easeOut" },
          }}
          className="mx-auto mb-4"
        >
          <Image
            src="/agmlogo.avif"
            alt="AGM Logo"
            width={160}
            height={160}
            priority
            className="mx-auto h-42 w-42 sm:h-54 sm:w-54 md:h-60 md:w-60 object-contain transition-[filter] duration-500 dark:invert dark:brightness-200"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.5 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-violet/20 bg-violet/5 px-4 py-1.5 text-sm font-medium text-violet">
            <span className="h-2 w-2 rounded-full bg-violet animate-pulse" />
            Celebrating 1986 &ndash; 2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="text-5xl font-normal leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="block">Honoring our past</span>
          <span className="text-gradient">Shaping the future</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          A Future Without Limits. Join us in celebrating four decades of
          excellence, innovation, and the boundless potential of education.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3.5 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a href="#gala">
            <Button size="lg">
              RSVP to Gala
            </Button>
          </a>
          <a href="#timeline">
            <Button variant="outline" size="lg">
              Explore Our Story
            </Button>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={20} className="text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
