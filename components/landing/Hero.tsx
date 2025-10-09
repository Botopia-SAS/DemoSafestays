'use client';

import { useState } from 'react';
import { LoadingScreen } from './LoadingScreen';
import { SearchBar } from './SearchBar';
import Image from 'next/image';

export function Hero({ onLoadComplete }: { onLoadComplete?: (isLoaded: boolean) => void }) {
  const [showLoading, setShowLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadComplete = () => {
    setShowLoading(false);
    setIsLoaded(true);
    onLoadComplete?.(true);
  };

  return (
    <>
      {showLoading && <LoadingScreen onComplete={handleLoadComplete} />}

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 animate-scale-in">
          <Image
            src="/image 6.png"
            alt="SafeStays Background"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay with blur effect */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[6px]" />
        </div>

        {/* Content with SearchBar */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-16">
          <SearchBar isLoaded={isLoaded} />
        </div>
      </section>
    </>
  );
}
