"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TabsProps {
  tabs: readonly string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onTabChange, className }: TabsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab}
          role="tab"
          aria-selected={activeTab === tab}
          onClick={() => onTabChange(tab)}
          className={cn(
            "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
            activeTab === tab
              ? "text-white"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {activeTab === tab && (
            <motion.span
              layoutId="activeTab"
              className="absolute inset-0 rounded-full bg-violet"
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
          )}
          <span className="relative z-10">{tab}</span>
        </button>
      ))}
    </div>
  );
}
