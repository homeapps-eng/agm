import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GalaPhotos } from "@/components/sections/GalaPhotos";

export const metadata: Metadata = {
  title: "Gala Photos | AGM 40th Anniversary",
  description: "Photos from the AGM 40th Anniversary Gala at the Richard Nixon Presidential Library.",
};

export default function GalaPhotosPage() {
  return (
    <>
      <Header />
      <main>
        <GalaPhotos />
      </main>
      <Footer />
    </>
  );
}
