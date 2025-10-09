'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for fade out animation
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Background image with blur and dark overlay */}
      <div className="absolute inset-0">
        <Image
          src="/image 6.png"
          alt="SafeStays"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay with blur effect (backdrop-filter) */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>

      {/* Content with animation */}
      <div className="relative z-10 text-center animate-fade-in-up">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 playfair-display-sc">
          SafeStays
        </h1>
        <p className="text-xl md:text-2xl text-white/90 playfair-display-sc tracking-wider">
          Redefining Luxury Living
        </p>
      </div>
    </div>
  );
}
