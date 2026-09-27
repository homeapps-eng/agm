"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { Badge } from "./Badge";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}

export function SectionHeading({ badge, title, subtitle, className, align = "center", as: Heading = "h2" }: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {badge && (
        <Badge variant="violet" className="mb-4">
          {badge}
        </Badge>
      )}
      <Heading className="text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </Heading>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
