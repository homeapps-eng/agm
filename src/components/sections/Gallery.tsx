"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tabs } from "@/components/ui/Tabs";
import { Modal } from "@/components/ui/Modal";
import { galleryImages, galleryCategories, type GalleryCategory } from "@/data/gallery";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Gallery() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filtered = activeTab === "All"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeTab);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (selectedIndex === null) return;
      const next = selectedIndex + dir;
      if (next >= 0 && next < filtered.length) setSelectedIndex(next);
    },
    [selectedIndex, filtered.length]
  );

  return (
    <SectionWrapper id="gallery">
      <SectionHeading
        badge="Memories"
        title="Photo Gallery"
        subtitle="A visual journey through four decades of campus life."
      />

      <Tabs
        tabs={galleryCategories}
        activeTab={activeTab}
        onTabChange={(t) => {
          setActiveTab(t as GalleryCategory);
          setSelectedIndex(null);
        }}
        className="mb-10 justify-center"
      />

      <motion.div layout className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((img, i) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="mb-4 break-inside-avoid cursor-pointer overflow-hidden rounded-xl"
              onClick={() => setSelectedIndex(i)}
            >
              <div
                className={cn(
                  "relative bg-muted transition-transform duration-300 hover:scale-[1.02]",
                )}
                style={{ aspectRatio: `${img.width}/${img.height}` }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                  {img.alt}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <Modal
        isOpen={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
        className="max-w-4xl bg-black p-2"
      >
        {selectedIndex !== null && filtered[selectedIndex] && (
          <div className="relative">
            <div
              className="flex items-center justify-center rounded-xl bg-muted/20 text-white"
              style={{
                aspectRatio: `${filtered[selectedIndex].width}/${filtered[selectedIndex].height}`,
                maxHeight: "70vh",
              }}
            >
              <span className="text-lg">{filtered[selectedIndex].alt}</span>
            </div>
            <p className="mt-3 text-center text-sm text-white/70">
              {filtered[selectedIndex].alt} &mdash; {filtered[selectedIndex].category}
            </p>
            {selectedIndex > 0 && (
              <button
                onClick={() => navigate(-1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            {selectedIndex < filtered.length - 1 && (
              <button
                onClick={() => navigate(1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>
        )}
      </Modal>
    </SectionWrapper>
  );
}
