"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Property } from "@/types/property";
import { createClient } from "@/lib/supabase/client";
import { BedDouble, Square, MapPin, Star } from "lucide-react";

export function HighlightedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) {
        console.error("Supabase error:", error.message, error.details, error.hint);
        setProperties([]);
        return;
      }

      setProperties(data || []);
    } catch (error) {
      console.error("Error loading properties:", error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(price);
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

  if (properties.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary playfair-display-sc mb-4">
            Highlighted Properties
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our curated selection of luxury accommodations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Link
              key={property.id}
              href={`/property/${property.id}`}
              onMouseEnter={() => setHoveredId(property.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group block"
            >
              <div
                className={`bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ${
                  hoveredId === property.id
                    ? "scale-105 shadow-2xl"
                    : "scale-100"
                }`}
              >
                <div className="relative h-72 overflow-hidden">
                  {property.images.length > 0 ? (
                    <img
                      src={property.images[0].url}
                      alt={property.images[0].alt}
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        hoveredId === property.id ? "scale-110" : "scale-100"
                      }`}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-accent to-muted flex items-center justify-center">
                      <MapPin className="w-16 h-16 text-muted-foreground/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white playfair-display-sc mb-1">
                      {property.location.split(",")[0]}
                    </h3>
                    <div className="flex items-center gap-1 text-white/90">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-white" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-muted-foreground">
                      {property.property_type}
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(property.price)}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <BedDouble className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">
                        {property.bedrooms} Bedrooms
                      </span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <Square className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">
                        {property.area} SQMT
                      </span>
                    </div>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      hoveredId === property.id
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="border-t border-border pt-4 mt-2">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {property.description}
                      </p>
                      {property.features.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {property.features.slice(0, 3).map((feature, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 bg-accent rounded-full text-accent-foreground"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
