"use client";

import Image from "next/image";

export function ExperienceSection() {
  return (
    <section 
      className="relative bg-white py-20 pb-12"
      style={{
        clipPath: 'polygon(0 6vw, 100% 0, 100% 100%, 0 100%)',
        WebkitClipPath: 'polygon(0 6vw, 100% 0, 100% 100%, 0 100%)',
        marginTop: '-6vw',
        paddingTop: '12vw'
      }}
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/ExperienceLuxury.webp"
              alt="Private Jet Interior - Luxury Travel"
              fill
              className="object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="text-gray-800">
            <h2 className="text-4xl md:text-5xl font-light text-primary playfair-display-sc mb-8 leading-tight">
              Experience Luxury Living
            </h2>

            <p className="text-base font-light leading-relaxed mb-6">
              SafeStays is dedicated to offering unparalleled luxury real estate solutions worldwide.
            </p>

            <p className="text-base font-light leading-relaxed mb-6">
              Whether you aspire to live in the world&apos;s most prestigious cities, charter a private jet, or secure an exclusive residence, we know how to make it happen.
            </p>

            <p className="text-base font-light leading-relaxed">
             We specialize in connecting discerning clients with exceptional properties distinguished by their design, comfort, and exclusivity. From short-term stays to permanent residences, SafeStays delivers a seamless, personalized experience tailored to your lifestyle and aspirations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
