"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

interface SectionWrapperProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function SectionWrapper({ id, className, children, fullWidth }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
      className={cn(
        "relative py-24 md:py-32",
        !fullWidth && "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </motion.section>
  );
}
