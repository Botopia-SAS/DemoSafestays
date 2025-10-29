"use client";

import Image from "next/image";

export function ExperienceSection() {
  return (
    <section className="relative bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative h-[350px] rounded-3xl overflow-hidden">
            <Image
              src="/ExperienceLuxury.webp"
              alt="Madrid Architecture"
              fill
              className="object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="text-gray-600">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 playfair-display-sc">
              Experience Luxury Living in Madrid
            </h2>
            <p className="text-lg leading-relaxed text-gray-800">
              SafeStays is dedicated to offering unparalleled luxury real estate solutions in the heart of Madrid, Spain. We specialize in connecting discerning clientele with exquisite properties that boast exceptional design, comfort, and exclusivity. Whether you&apos;re seeking a temporary stay or a permanent residence, SafeStays ensures a seamless experience tailored to your unique lifestyle demands.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
