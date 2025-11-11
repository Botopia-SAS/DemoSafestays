"use client";

export function LuxurySection() {
  return (
    <section 
      className="relative bg-white py-32"
      style={{
        clipPath: 'polygon(0 6vw, 100% 0, 100% calc(100% - 6vw), 0 100%)',
        WebkitClipPath: 'polygon(0 6vw, 100% 0, 100% calc(100% - 6vw), 0 100%)',
        marginTop: '-6vw',
        marginBottom: '-6vw',
        paddingTop: '12vw',
        paddingBottom: '12vw'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-left">
          <p className="text-xs font-light text-gray-600 mb-4 tracking-[0.2em] uppercase">From Vision to Legacy</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-primary playfair-display-sc leading-tight">
            The New Standard of Refined <br />Living
          </h2>
        </div>
      </div>
    </section>
  );
}
