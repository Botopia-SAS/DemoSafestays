"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dir, setDir] = useState<"next" | "prev">("next"); // ← dirección del movimiento

  const images = [
    "/carrusel1.webp",
    "/carrusel2.webp",
    "/carrusel3.webp",
    "/carrusel4.webp",
    "/carrusel5.webp"
  ];

  const nextSlide = () => {
    setDir("next"); // ← marca dirección
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setDir("prev"); // ← marca dirección
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const getSlideIndex = (offset: number) => {
    return (currentSlide + offset + images.length) % images.length;
  };

  return (
    <section className="relative bg-white py-32 overflow-hidden">
      <div className="relative w-full">
        <div className="relative h-[700px] flex items-center justify-center gap-4">
          {/* Left side image - blurred */}
          <div className={`relative w-[25%] h-[500px] rounded-2xl overflow-hidden opacity-80 blur-xs transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform`}>
            <Image
              src={images[getSlideIndex(-1)]}
              alt="Previous slide"
              fill
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            />
          </div>

          {/* Center main image */}
          <div
            className={`relative w-[100%] h-[500px] rounded-3xl overflow-hidden shadow-2xl z-10
                        transition-all duration-700 ease-in-out transform
                        ${dir === "next" ? "animate-slide-in-left" : "animate-slide-in-right"}`}
          >
            <Image
              key={images[currentSlide]} // ← reinicia la animación al cambiar
              src={images[currentSlide]}
              alt={`Carousel image ${currentSlide + 1}`}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right side image - blurred */}
          <div className={`relative w-[25%] h-[500px] rounded-2xl overflow-hidden opacity-80 blur-xs transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform`}>
            <Image
              src={images[getSlideIndex(1)]}
              alt="Next slide"
              fill
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center hover:bg-white/50 transition-all z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-10 h-10 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center hover:bg-white/50 transition-all z-20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-10 h-10 text-white" />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white w-8"
                    : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Keyframes de la animación de deslizamiento suave */}
      <style jsx>{`
        @keyframes slideInLeft {
          from { transform: translateX(28px); opacity: 0.0; }
          to   { transform: translateX(0);     opacity: 1;   }
        }
        @keyframes slideInRight {
          from { transform: translateX(-28px); opacity: 0.0; }
          to   { transform: translateX(0);      opacity: 1;   }
        }
        .animate-slide-in-left  {
          animation: slideInLeft 500ms cubic-bezier(0.22,1,0.36,1);
        }
        .animate-slide-in-right {
          animation: slideInRight 500ms cubic-bezier(0.22,1,0.36,1);
        }
      `}</style>
    </section>
  );
}
