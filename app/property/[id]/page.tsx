"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Property } from "@/types/property";
import { createClient } from "@/lib/supabase/client";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import {
  BedDouble,
  Bath,
  Square,
  MapPin,
  Star,
  Check,
} from "lucide-react";

export default function PropertyDetailPage() {
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const loadProperty = useCallback(async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) throw error;
      setProperty(data);
    } catch (error) {
      console.error("Error loading property:", error);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    loadProperty();
  }, [loadProperty]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <>
        <Navbar isLoaded={isLoaded} alwaysShowBackground={true} />
        <div className="min-h-screen bg-background flex items-center justify-center pt-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading property...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!property) {
    return (
      <>
        <Navbar isLoaded={isLoaded} alwaysShowBackground={true} />
        <div className="min-h-screen bg-background flex items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-4 playfair-display-sc">
              Property Not Found
            </h1>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar isLoaded={isLoaded} alwaysShowBackground={true} />
      <div className="min-h-screen bg-background pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="rounded-2xl overflow-hidden shadow-xl mb-4 relative h-[500px]">
                {property.images.length > 0 ? (
                  <Image
                    src={property.images[selectedImageIndex].url}
                    alt={property.images[selectedImageIndex].alt}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-accent to-muted flex items-center justify-center">
                    <MapPin className="w-24 h-24 text-muted-foreground/30" />
                  </div>
                )}
              </div>

              {property.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`rounded-lg overflow-hidden transition-all relative h-24 ${
                        selectedImageIndex === index
                          ? "ring-4 ring-primary shadow-lg"
                          : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm font-semibold rounded-full">
                    {property.listing_type}
                  </span>
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-semibold rounded-full">
                    {property.property_type}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-primary playfair-display-sc mb-3">
                  {property.title}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{property.location}</span>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-bold text-primary playfair-display-sc">
                    {formatPrice(property.price)}
                  </span>
                  {property.listing_type === "For Rent" && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-background rounded-lg">
                    <BedDouble className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-primary">{property.bedrooms}</p>
                    <p className="text-xs text-muted-foreground">Bedrooms</p>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg">
                    <Bath className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-primary">{property.bathrooms}</p>
                    <p className="text-xs text-muted-foreground">Bathrooms</p>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg">
                    <Square className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-primary">{property.area}</p>
                    <p className="text-xs text-muted-foreground">SQMT</p>
                  </div>
                </div>

                <button className="w-full py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold text-lg">
                  Book Now
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-8 shadow-lg mb-6">
                <h2 className="text-2xl font-bold text-primary playfair-display-sc mb-4">
                  Description
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </div>

              {property.features.length > 0 && (
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h2 className="text-2xl font-bold text-primary playfair-display-sc mb-6">
                    Features & Amenities
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {property.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="bg-white rounded-xl p-6 shadow-lg sticky top-24">
                <h3 className="text-xl font-bold text-primary playfair-display-sc mb-4">
                  Property Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Property ID</span>
                    <span className="font-semibold text-foreground">
                      {property.listing_id}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-semibold text-foreground">
                      {property.property_type}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Agency Fee</span>
                    <span className="font-semibold text-foreground">
                      {formatPrice(property.agency_fee)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Listed</span>
                    <span className="font-semibold text-foreground">
                      {new Date(property.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
