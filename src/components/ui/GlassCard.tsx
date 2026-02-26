"use client";

import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  hover?: boolean;
}

export function GlassCard({ className, hover = true, children, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "glass rounded-2xl p-6",
        hover && "transition-shadow duration-300 hover:shadow-xl hover:shadow-violet/5",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
