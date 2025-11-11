"use client";

export function MadridHeroSection() {
  return (
    <section 
      className="relative min-h-[120vh] flex items-center justify-start overflow-visible"
      style={{
        clipPath: 'polygon(0 6vw, 100% 0, 100% calc(100% - 6vw), 0 100%)',
        WebkitClipPath: 'polygon(0 6vw, 100% 0, 100% calc(100% - 6vw), 0 100%)',
        marginTop: '-6vw',
        marginBottom: '-6vw',
        paddingTop: '7vw',
        paddingBottom: '7vw'
      }}
    >
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/Madrid.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-white/40 pointer-events-none" />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white playfair-display-sc mb-6 leading-tight">
              Spain&apos;s Opulent<br />Properties
            </h2>
            <p className="text-lg font-light text-white/90 mb-8 leading-relaxed max-w-2xl">
              Explore elite living with SafeStays Realty—your premium luxury real estate partner to buy or rent in Madrid.
            </p>
            <button className="px-8 py-3 bg-white text-gray-900 font-normal text-sm rounded-md hover:bg-gray-100 transition-all duration-300 shadow-lg">
              Explore Luxury Homes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
