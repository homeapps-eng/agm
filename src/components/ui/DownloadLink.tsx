"use client";

import { Download } from "lucide-react";
import { downloadName, type GalaPhoto } from "@/data/galaPhotos";
import { cn } from "@/lib/utils";

/** Small download button tucked in a photo's corner; shows on hover or keyboard focus */
export function DownloadLink({ photo, className }: { photo: GalaPhoto; className?: string }) {
  return (
    <a
      href={photo.src}
      download={downloadName(photo)}
      aria-label={`Download photo ${photo.id}`}
      title="Download photo"
      onPointerDown={(e) => e.stopPropagation()}
      className={cn(
        "absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#0B1731]/70 text-white opacity-0 shadow-lg ring-1 ring-gold/40 backdrop-blur-sm transition-opacity duration-300 hover:bg-gold hover:text-violet-dark focus:outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-gold-light group-hover:opacity-100",
        className
      )}
    >
      <Download size={15} />
    </a>
  );
}
