"use client";

import Image from "next/image";

export function MilanSection() {
  return (
    <section 
      className="relative min-h-[100vh] flex items-center justify-start overflow-visible"
      style={{
        clipPath: 'polygon(0 0, 100% 6vw, 100% calc(100% - 6vw), 0 100%)',
        WebkitClipPath: 'polygon(0 0, 100% 6vw, 100% calc(100% - 6vw), 0 100%)',
        marginTop: '-6vw',
        marginBottom: '-6vw',
        paddingTop: '7vw',
        paddingBottom: '7vw'
      }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/milan.webp"
          alt="Milan Cathedral - Duomo di Milano"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/60 pointer-events-none" />
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full py-8 md:py-12">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white playfair-display-sc mb-6 leading-tight">
              The Epitome of Elegance<br />Arrives in Milan
            </h2>
            <p className="text-lg font-light text-white/90 mb-8 leading-relaxed max-w-2xl">
              Milan welcomes a new standard of prestige
            </p>
            <button className="px-8 py-3 bg-white text-gray-900 font-normal text-sm rounded-md hover:bg-gray-100 transition-all duration-300 shadow-lg cursor-default">
              Begin Your Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
