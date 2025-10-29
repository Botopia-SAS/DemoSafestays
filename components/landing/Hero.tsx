'use client';

import { useState, useEffect } from 'react';
import { LoadingScreen } from './LoadingScreen';
import { SearchBar } from './SearchBar';
import Image from 'next/image';

const IMAGES = [
  '/imagen1.jpeg',
  '/imagen2.jpeg',
  '/imagen3.jpeg',
  '/imagen4.jpeg',
  '/imagen5.jpeg'
];

export function Hero({ onLoadComplete }: { onLoadComplete?: (isLoaded: boolean) => void }) {
  const [showLoading, setShowLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLoadComplete = () => {
    setShowLoading(false);
    setIsLoaded(true);
    onLoadComplete?.(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {showLoading && <LoadingScreen onComplete={handleLoadComplete} />}

      <section className="relative min-h-[120vh] flex items-center justify-center overflow-hidden">
        {/* Background images carousel */}
        <div className="absolute inset-0">
          {IMAGES.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image}
                alt={`SafeStays Background ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
          {/* Dark overlay with blur effect */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>

        {/* Content with SearchBar */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-16">
          <SearchBar isLoaded={isLoaded} />
        </div>

        {/* Diagonal bottom edge - positioned much lower to show full image */}
        <div className="absolute -bottom-1 left-0 right-0 h-14 bg-white z-20" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0 100%)' }}></div>
      </section>
    </>
  );
}
