'use client';

import { useState, useEffect } from 'react';
import { LoadingScreen } from './LoadingScreen';
import Image from 'next/image';

const IMAGES = [
  '/imagen1.jpeg',
  '/imagen2.jpeg',
  '/imagen3.jpeg',
  '/imagen4.jpeg',
  '/imagen5.jpeg'
];

export function Hero(props: Readonly<{ onLoadComplete?: (isLoaded: boolean) => void }>) {
  const { onLoadComplete } = props;
  const [showLoading, setShowLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLoadComplete = () => {
    setShowLoading(false);
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
          {/* Overlay with white tint effect */}
          <div className="absolute inset-0 bg-white/50 pointer-events-none" />
          {/* Removed backdrop blur to keep background images sharp */}
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        </div>

        {/* Content overlay: render large heading + paragraph (left) like the reference site */}
        <div className="relative z-10 w-full py-8 md:py-12">
          <div className="container mx-auto px-6 md:px-8 lg:px-12">
            <div className="max-w-2xl text-left">
              <h1 className="playfair-display-sc text-white text-5xl md:text-6xl lg:text-[96px] font-normal leading-tight md:leading-[0.95]">
                Experience Luxurious Living
              </h1>
              <p className="text-lg md:text-xl text-white/90 mt-6 max-w-xl">
                Discover exceptional residences, where elegance meets comfort, offering unparalleled luxury for your ultimate lifestyle dream.
              </p>
              {/* Optional CTA to mimic reference site */}
              <div className="mt-8">
                <button className="inline-block bg-white/95 text-gray-800 rounded-md px-5 py-3 shadow-md border border-white hover:bg-white transition-all duration-300">Begin Your Journey</button>
              </div>
            </div>
          </div>

          {/* SearchBar removed as requested — only hero content remains */}
        </div>
      </section>
    </>
  );
}
