import type { Metadata } from "next";
import { GalaCategories } from "@/components/sections/GalaCategories";

export const metadata: Metadata = {
  title: "Gala Photo Chapters | AGM 40th Anniversary",
  description: "Photos from the AGM 40th Anniversary Gala, by part of the night.",
};

export default function GalaCategoriesPage() {
  return (
    <main>
      <GalaCategories />
    </main>
  );
}
