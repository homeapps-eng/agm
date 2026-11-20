import type { Metadata } from "next";
import { GalaIntro } from "@/components/sections/GalaIntro";

export const metadata: Metadata = {
  title: "Gala Gallery | AGM 40th Anniversary",
  description: "Photos from the AGM 40th Anniversary Gala at the Richard Nixon Presidential Library.",
};

// Full-screen opening, without the site header and footer; the photos are on /gallery/photos
export default function GalleryPage() {
  return (
    <main>
      <GalaIntro />
    </main>
  );
}
