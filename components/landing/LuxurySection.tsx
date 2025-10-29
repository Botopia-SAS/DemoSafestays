"use client";

export function LuxurySection() {
  return (
    <section className="relative bg-white py-16 -mb-1">
      {/* Diagonal top edge */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-white -mt-1" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-left">
          <p className="text-sm font-medium text-gray-600 mb-4">Madrid Opulence</p>
          <h2 className="text-5xl md:text-6xl font-bold text-primary playfair-display-sc leading-tight">
            Luxury Living Awaits in Spain&apos;s<br />Capital
          </h2>
        </div>
      </div>

      {/* Diagonal bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-24 -mb-1" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0 100%)' }}></div>
    </section>
  );
}
