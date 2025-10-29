'use client';

import { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { PropertiesFromSheets } from "@/components/landing/PropertiesFromSheets";
import { LuxurySection } from "@/components/landing/LuxurySection";
import { MadridHeroSection } from "@/components/landing/MadridHeroSection";
import { ImageCarousel } from "@/components/landing/ImageCarousel";
import { ExperienceSection } from "@/components/landing/ExperienceSection";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar isLoaded={isLoaded} />

      {/* Main Content */}
      <main>
        <Hero onLoadComplete={setIsLoaded} />
        <PropertiesFromSheets />
        <LuxurySection />
        <MadridHeroSection />
        <ImageCarousel />
        <ExperienceSection />
      </main>

      <Footer />
    </div>
  );
}
