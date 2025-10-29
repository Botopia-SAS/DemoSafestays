"use client";

import Link from "next/link";
import { BedDouble, Bath, Calendar, MapPin } from "lucide-react";

interface PropertyCardProps {
  property: {
    CODE?: string;
    Location?: string;
    Date?: string;
    Month?: string;
    Price?: string | number;
    Beds?: string | number;
    Baths?: string | number;
    Utilities?: string;
    Street?: string;
    Brochure?: string;
    Video?: string;
    images?: string;
  };
  index: number;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  imageUrl: string;
  formatPrice: (price: string | number) => string;
  getAvailableDate: (prop: PropertyCardProps["property"]) => string;
}

export function PropertyCard({
  property,
  index,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  imageUrl,
  formatPrice,
  getAvailableDate,
}: PropertyCardProps) {
  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="group block">
      <div
        className={`bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ${
          isHovered ? "scale-105 shadow-2xl" : "scale-100"
        }`}
      >
        <Link href={`/property/${encodeURIComponent(property.CODE || index)}`}>
          <div className="relative h-72 overflow-hidden cursor-pointer">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={property.Location || "Property"}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isHovered ? "scale-110" : "scale-100"
                }`}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-accent to-muted flex items-center justify-center">
                <MapPin className="w-16 h-16 text-muted-foreground/30" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-2xl font-bold text-white playfair-display-sc mb-1">
                {property.Location || "Madrid"}
              </h3>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <Calendar className="w-4 h-4" />
                <span>Disponible: {getAvailableDate(property)}</span>
              </div>
            </div>

            {property.CODE && (
              <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                {property.CODE}
              </div>
            )}
          </div>
        </Link>
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">
              {property.Street || "Centro"}
            </span>
            <span className="text-2xl font-bold text-primary">
              {formatPrice(property.Price || 0)}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {property.Beds && (
              <div className="flex items-center gap-2">
                <BedDouble className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">
                  {property.Beds} {Number(property.Beds) === 1 ? "Habitación" : "Habitaciones"}
                </span>
              </div>
            )}
            {property.Baths && (
              <div className="flex items-center gap-2">
                <Bath className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">
                  {property.Baths} {Number(property.Baths) === 1 ? "Baño" : "Baños"}
                </span>
              </div>
            )}
          </div>
          {property.Utilities && (
            <div className="text-sm text-muted-foreground mb-3">
              <strong>Servicios:</strong> {property.Utilities}
            </div>
          )}
          <div
            className={`overflow-hidden transition-all duration-500 ${
              isHovered ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="border-t border-border pt-4 mt-2">
              <div className="flex gap-2">
                {property.Brochure && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(property.Brochure as string, "_blank", "noopener,noreferrer");
                    }}
                    className="flex-1 px-3 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 text-center"
                  >
                    Ver Brochure
                  </button>
                )}
                {property.Video && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(property.Video as string, "_blank", "noopener,noreferrer");
                    }}
                    className="flex-1 px-3 py-2 bg-secondary text-white text-sm rounded-lg hover:bg-secondary/90 text-center"
                  >
                    Ver Video
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
