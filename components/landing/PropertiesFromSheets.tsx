"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PropertyCard } from "./PropertyCard";

interface SheetProperty {
  [key: string]: string | number | undefined;
  CODE?: string;
  Location?: string;
  Date?: string;
  Month?: string;
  Price?: string | number;
  Beds?: string | number;
  Baths?: string | number;
  Utilities?: string;
  mts?: string | number;
  Street?: string;
  "#"?: string;
  Agency?: string;
  ID?: string;
  Brochure?: string;
  Video?: string;
  "Whatsapp Message"?: string;
  images?: string;
  video?: string;
}

const getFirstImageUrl = (imagesField: string | undefined): string => {
  if (!imagesField) return "";

  if (imagesField.startsWith("[")) {
    try {
      const parsed = JSON.parse(imagesField);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed[0];
      }
    } catch (e) {
      console.error("Error parsing images JSON:", e);
    }
  }

  if (imagesField.startsWith("http")) {
    return imagesField;
  }

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

  const formatPrice = (price: string | number): string => {
    const numPrice =
      typeof price === "string"
        ? parseFloat(price.replace(/[^0-9.-]/g, ""))
        : price;
    if (isNaN(numPrice)) return String(price);

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

  const displayedProperties = properties.slice(0, 3);

  return (
    <section className="py-20 pb-12 bg-white">
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
          {displayedProperties.map((property, index) => {
            const imageUrl = getFirstImageUrl(property.images);
            const propertyId = (property.CODE as string) || String(index);
            return (
              <PropertyCard
                key={property.CODE || index}
                property={property}
                index={index}
                isHovered={hoveredId === propertyId}
                onMouseEnter={() => setHoveredId(propertyId)}
                onMouseLeave={() => setHoveredId(null)}
                imageUrl={imageUrl}
                formatPrice={formatPrice}
                getAvailableDate={getAvailableDate}
              />
            );
          })}
        </div>

        {properties.length > 3 && (
          <div className="text-center mt-12">
            <Link href="/propiedadesdisponibles">
              <button className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl">
                Ver más
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
