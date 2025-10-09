'use client';

import { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { HighlightedProperties } from "@/components/landing/HighlightedProperties";
import { Features } from "@/components/landing/Features";
import { ContentSection } from "@/components/landing/ContentSection";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar isLoaded={isLoaded} />

      {/* Main Content */}
      <main>
        <Hero onLoadComplete={setIsLoaded} />
        <HighlightedProperties />
        <Features />
        <ContentSection />
      </main>

      <Footer />
    </div>
  );
}
