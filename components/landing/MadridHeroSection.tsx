"use client";

import Image from "next/image";

export function MadridHeroSection() {
  // Arranca arriba-izquierda y baja hacia la derecha
  const topClip = "polygon(0 0, 100% 3vw, 100% 100%, 0 100%)"; // ← sin paréntesis extra

  return (
    <section className="relative min-h-[120vh] flex items-center justify-start overflow-hidden bg-white">
      {/* Fondo con borde superior en diagonal */}
      <div
        className="absolute inset-0"
        style={{ clipPath: topClip, WebkitClipPath: topClip }}
      >
        <Image
          src="/plazamadrid.jpg"
          alt="Madrid Architecture"
          fill
          className="object-cover blur-[1px]"
          priority
        />
        <div className="absolute inset-0 bg-black/35 pointer-events-none" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 py-20">
        <div className="max-w-3xl ml-4 sm:ml-8 lg:ml-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white playfair-display-sc mb-6">
            Madrid&apos;s Opulent Properties
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Explore elite living with SafeStays Realty—your premium luxury real estate partner to buy or rent in Madrid.
          </p>
          <button className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300">
            Explore Luxury Homes
          </button>
        </div>
      </div>
      {/* Diagonal bottom edge - positioned much lower to show full image */}
        <div className="absolute -bottom-1 left-0 right-0 h-14 bg-white z-20" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0 100%)' }}></div>
    </section>
  );
}
