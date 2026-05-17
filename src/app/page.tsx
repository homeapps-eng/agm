"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/Toast";
import { Hero } from "@/components/sections/Hero";
import { Timeline } from "@/components/sections/Timeline";
import { Honors } from "@/components/sections/Honors";
import { Gallery } from "@/components/sections/Gallery";
import { Gala } from "@/components/sections/Gala";
import { Events } from "@/components/sections/Events";
import { CampusMap } from "@/components/sections/CampusMap";
import { Shop } from "@/components/sections/Shop";
import { Future } from "@/components/sections/Future";
import { Community } from "@/components/sections/Community";

export default function Home() {
  return (
    <ToastProvider>
      <Header />
      <main>
        <Hero />
        <Timeline />
        <Gallery />
        <Gala />
        <Events />
        {/* <Shop /> */}
        <Community />
        <Honors />
        <CampusMap />
        <Future />
      </main>
      <Footer />
    </ToastProvider>
  );
}
