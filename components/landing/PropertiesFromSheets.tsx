"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BedDouble, Square, MapPin, Star, Bath, Calendar } from "lucide-react";

interface SheetProperty {
  [key: string]: string | number | undefined;
  // Columnas del Google Sheet según la estructura proporcionada
  CODE?: string | undefined;
  Location?: string | undefined;
  Date?: string | undefined;
  Month?: string | undefined;
  Price?: string | number | undefined;
  Beds?: string | number | undefined;
  Baths?: string | number | undefined;
  Utilities?: string | undefined;
  mts?: string | number | undefined;
  Street?: string | undefined;
  "#"?: string | undefined; // Número de calle
  Agency?: string | undefined;
  ID?: string | undefined;
  Brochure?: string | undefined;
  Video?: string | undefined;
  "Whatsapp Message"?: string | undefined;
  images?: string | undefined;
  video?: string | undefined;
}

// Helper function to get first image from Cloudinary JSON array or direct URL
const getFirstImageUrl = (imagesField: string | undefined): string => {
  if (!imagesField) return "";

  // Check if it's a JSON array (Cloudinary format)
  if (imagesField.startsWith("[")) {
    try {
      const parsed = JSON.parse(imagesField);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed[0]; // Return first image URL from Cloudinary
      }
    } catch (e) {
      console.error("Error parsing images JSON:", e);
    }
  }

  // If it's a regular URL (Cloudinary or other), return it
  if (imagesField.startsWith("http")) {
    return imagesField;
  }

  // If it's just text (not a URL), return empty
  return "";
};

export function PropertiesFromSheets() {
  const [properties, setProperties] = useState<SheetProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const response = await fetch("/api/properties");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch properties");
      }

      const data = await response.json();
      console.log("Properties loaded from Google Sheets:", data);
      setProperties(data.properties || []);
      setError(null);
    } catch (error) {
      console.error("Error loading properties:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: string | number) => {
    const numPrice =
      typeof price === "string"
        ? parseFloat(price.replace(/[^0-9.-]/g, ""))
        : price;
    if (isNaN(numPrice)) return price;

    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(numPrice);
  };

  const getAvailableDate = (prop: SheetProperty) => {
    if (prop.Month && prop.Date) {
      return `${prop.Month} ${prop.Date}`;
    }
    return prop.Date || "Disponible ahora";
  };

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600 mb-4">
              Error al cargar las propiedades: {error}
            </p>
            <button
              onClick={loadProperties}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Reintentar
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (properties.length === 0) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-muted-foreground">
              No hay propiedades disponibles en este momento.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary playfair-display-sc mb-4">
            Propiedades Disponibles
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre nuestras propiedades disponibles en{" "}
            {properties[0].Location || "Madrid"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => {
            const imageUrl = getFirstImageUrl(property.images);
            return (
              <div
                key={property.CODE || index}
                onMouseEnter={() =>
                  setHoveredId((property.CODE as string) || String(index))
                }
                onMouseLeave={() => setHoveredId(null)}
                className="group block"
              >
                <div
                  className={`bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ${
                    hoveredId === (property.CODE || String(index))
                      ? "scale-105 shadow-2xl"
                      : "scale-100"
                  }`}
                >
                  <Link
                    href={`/property/${encodeURIComponent(
                      property.CODE || index
                    )}`}
                  >
                    <div className="relative h-72 overflow-hidden cursor-pointer">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={(property.Location as string) || "Property"}
                          className={`w-full h-full object-cover transition-transform duration-700 ${
                            hoveredId === (property.CODE || String(index))
                              ? "scale-110"
                              : "scale-100"
                          }`}
                          onError={(e) => {
                            // Fallback if image fails to load
                            (e.target as HTMLImageElement).style.display =
                              "none";
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
                            {property.Beds}{" "}
                            {Number(property.Beds) === 1
                              ? "Habitación"
                              : "Habitaciones"}
                          </span>
                        </div>
                      )}
                      {property.Baths && (
                        <div className="flex items-center gap-2">
                          <Bath className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">
                            {property.Baths}{" "}
                            {Number(property.Baths) === 1 ? "Baño" : "Baños"}
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
                        hoveredId === (property.CODE || String(index))
                          ? "max-h-40 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="border-t border-border pt-4 mt-2">
                        <div className="flex gap-2">
                          {property.Brochure && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                window.open(
                                  property.Brochure as string,
                                  "_blank",
                                  "noopener,noreferrer"
                                );
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
                                window.open(
                                  property.Video as string,
                                  "_blank",
                                  "noopener,noreferrer"
                                );
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
          })}
        </div>
      </div>
    </section>
  );
}
