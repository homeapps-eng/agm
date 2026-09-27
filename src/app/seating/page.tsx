import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Seating } from "@/components/sections/Seating";

export const metadata: Metadata = {
  title: "Table Seating & Guest List | AGM 40th Anniversary Gala",
  description: "Find your table at the AGM 40th Anniversary Gala.",
  // Guest names are personal; keep this page out of search results
  robots: { index: false, follow: false },
};

export default function SeatingPage() {
  return (
    <>
      <Header />
      <main>
        <Seating />
      </main>
      <Footer />
    </>
  );
}
