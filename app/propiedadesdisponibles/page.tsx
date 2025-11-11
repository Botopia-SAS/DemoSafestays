"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BedDouble, Square, MapPin, Star, Bath, Calendar, ArrowLeft, X, Lock } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Footer } from "@/components/landing/Footer";

interface SheetProperty {
  [key: string]: string | number | undefined;
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
  "#"?: string | undefined;
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
        return parsed[0];
      }
    } catch (e) {
      console.error("Error parsing images JSON:", e);
    }
  }

  // If it's a regular URL (Cloudinary or other), return it
  if (imagesField.startsWith("http")) {
    return imagesField;
  }

  return "";
};

export default function PropiedadesDisponiblesPage() {
  const [properties, setProperties] = useState<SheetProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([1000, 25000]);
  const [listingType, setListingType] = useState("all");
  const [propertyTypes, setPropertyTypes] = useState<string[]>(["House", "Apartment"]);
  const [bedrooms, setBedrooms] = useState([0, 7]);
  const [availableFrom, setAvailableFrom] = useState("");
  const [features, setFeatures] = useState<string[]>([]);

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
      <>
        <Navbar isLoaded={true} alwaysShowBackground={false} />
        <Hero />
        <section 
          className="relative min-h-screen py-20 bg-white overflow-visible"
          style={{
            clipPath: 'polygon(0 6vw, 100% 0, 100% 100%, 0 100%)',
            WebkitClipPath: 'polygon(0 6vw, 100% 0, 100% 100%, 0 100%)',
            marginTop: '-6vw',
            paddingTop: '12vw'
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            </div>
          </div>
        </section>
        
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar isLoaded={true} alwaysShowBackground={false} />
        <Hero />
        <section 
          className="relative min-h-screen py-20 bg-white overflow-visible"
          style={{
            clipPath: 'polygon(0 6vw, 100% 0, 100% 100%, 0 100%)',
            WebkitClipPath: 'polygon(0 6vw, 100% 0, 100% 100%, 0 100%)',
            marginTop: '-6vw',
            paddingTop: '12vw'
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-red-600 mb-4 font-light">
                Error loading properties: {error}
              </p>
              <button
                onClick={loadProperties}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-light"
              >
                Retry
              </button>
            </div>
          </div>
        </section>
        
        <Footer />
      </>
    );
  }

  if (properties.length === 0) {
    return (
      <>
        <Navbar isLoaded={true} alwaysShowBackground={false} />
        <Hero />
        <section 
          className="relative min-h-screen py-20 bg-white overflow-visible"
          style={{
            clipPath: 'polygon(0 6vw, 100% 0, 100% 100%, 0 100%)',
            WebkitClipPath: 'polygon(0 6vw, 100% 0, 100% 100%, 0 100%)',
            marginTop: '-6vw',
            paddingTop: '12vw'
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-600 font-light">
                No properties available at the moment.
              </p>
            </div>
          </div>
        </section>
        
        <Footer />
      </>
    );
  }

  const togglePropertyType = (type: string) => {
    setPropertyTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleFeature = (feature: string) => {
    setFeatures(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  return (
    <>
      <Navbar isLoaded={true} alwaysShowBackground={false} />
      <Hero />

      <section 
        className="relative min-h-screen py-20 bg-white overflow-visible"
        style={{
          clipPath: 'polygon(0 6vw, 100% 0, 100% 100%, 0 100%)',
          WebkitClipPath: 'polygon(0 6vw, 100% 0, 100% 100%, 0 100%)',
          marginTop: '-6vw',
          paddingTop: '12vw'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light text-gray-800 playfair-display-sc mb-4">
              Available Properties
            </h1>
            <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto">
              Discover our available properties in Salamanca
            </p>
          </div>

          {/* Layout con filtros y propiedades */}
          <div className="flex gap-12">
            {/* Sidebar de filtros */}
            <aside className="w-64 flex-shrink-0">
              <div className="space-y-4 text-sm">
                {/* Search */}
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    disabled
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed opacity-60"
                  />
                  <Lock className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />

                  {/* Tooltip */}
                  <div className="absolute left-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                    <div className="bg-black text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap flex items-center gap-2">
                      <Lock className="w-3 h-3" />
                      <span>Demo Version - Feature Locked</span>
                    </div>
                  </div>
                </div>

                {/* Price Range */}
                <div className="relative group">
                  <label className="block text-xs font-semibold mb-2">Price</label>
                  <input
                    type="range"
                    min="1000"
                    max="25000"
                    value={priceRange[1]}
                    disabled
                    className="w-full accent-black opacity-60 cursor-not-allowed"
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-1 opacity-60">
                    <span>{priceRange[0]}</span>
                    <span>{priceRange[1]}</span>
                  </div>

                  {/* Tooltip */}
                  <div className="absolute left-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                    <div className="bg-black text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap flex items-center gap-2">
                      <Lock className="w-3 h-3" />
                      <span>Demo Version - Feature Locked</span>
                    </div>
                  </div>
                </div>

                {/* Listing Type */}
                <div className="relative group">
                  <label className="block text-xs font-semibold mb-2">Listing Type</label>
                  <select
                    value={listingType}
                    disabled
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed opacity-60"
                  >
                    <option value="all">All (80)</option>
                    <option value="rent">For Rent</option>
                    <option value="sale">For Sale</option>
                  </select>

                  {/* Tooltip */}
                  <div className="absolute left-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                    <div className="bg-black text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap flex items-center gap-2">
                      <Lock className="w-3 h-3" />
                      <span>Demo Version - Feature Locked</span>
                    </div>
                  </div>
                </div>

                {/* Property Type */}
                <div className="relative group">
                  <label className="block text-xs font-semibold mb-2">Property Type</label>
                  <div className="space-y-1.5 opacity-60">
                    <label className="flex items-center gap-2 cursor-not-allowed">
                      <input
                        type="checkbox"
                        checked={propertyTypes.includes("House")}
                        disabled
                        className="w-3.5 h-3.5 rounded border-gray-300 accent-black cursor-not-allowed"
                      />
                      <span className="text-xs text-gray-900">House (0)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-not-allowed">
                      <input
                        type="checkbox"
                        checked={propertyTypes.includes("Apartment")}
                        disabled
                        className="w-3.5 h-3.5 rounded border-gray-300 accent-black cursor-not-allowed"
                      />
                      <span className="text-xs text-gray-900">Apartment (70)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-not-allowed">
                      <input
                        type="checkbox"
                        checked={propertyTypes.includes("Condo")}
                        disabled
                        className="w-3.5 h-3.5 rounded border-gray-300 accent-black cursor-not-allowed"
                      />
                      <span className="text-xs text-gray-900">Condo (0)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-not-allowed">
                      <input
                        type="checkbox"
                        checked={propertyTypes.includes("Townhouse")}
                        disabled
                        className="w-3.5 h-3.5 rounded border-gray-300 accent-black cursor-not-allowed"
                      />
                      <span className="text-xs text-gray-900">Townhouse (0)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-not-allowed">
                      <input
                        type="checkbox"
                        checked={propertyTypes.includes("Land")}
                        disabled
                        className="w-3.5 h-3.5 rounded border-gray-300 accent-black cursor-not-allowed"
                      />
                      <span className="text-xs text-gray-900">Land (0)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-not-allowed">
                      <input
                        type="checkbox"
                        checked={propertyTypes.includes("Commercial")}
                        disabled
                        className="w-3.5 h-3.5 rounded border-gray-300 accent-black cursor-not-allowed"
                      />
                      <span className="text-xs text-gray-900">Commercial (0)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-not-allowed">
                      <input
                        type="checkbox"
                        checked={propertyTypes.includes("Other")}
                        disabled
                        className="w-3.5 h-3.5 rounded border-gray-300 accent-black cursor-not-allowed"
                      />
                      <span className="text-xs text-gray-900">Other (0)</span>
                    </label>
                  </div>

                  {/* Tooltip */}
                  <div className="absolute left-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                    <div className="bg-black text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap flex items-center gap-2">
                      <Lock className="w-3 h-3" />
                      <span>Demo Version - Feature Locked</span>
                    </div>
                  </div>
                </div>

                {/* Bedrooms */}
                <div className="relative group">
                  <label className="block text-xs font-semibold mb-2">Bedrooms</label>
                  <input
                    type="range"
                    min="0"
                    max="7"
                    value={bedrooms[1]}
                    disabled
                    className="w-full accent-black opacity-60 cursor-not-allowed"
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-1 opacity-60">
                    <span>{bedrooms[0]}</span>
                    <span>{bedrooms[1]}</span>
                  </div>

                  {/* Tooltip */}
                  <div className="absolute left-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                    <div className="bg-black text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap flex items-center gap-2">
                      <Lock className="w-3 h-3" />
                      <span>Demo Version - Feature Locked</span>
                    </div>
                  </div>
                </div>

                {/* Available from */}
                <div className="relative group">
                  <label className="block text-xs font-semibold mb-2">Available from</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={availableFrom}
                      disabled
                      placeholder="Select dates"
                      className="w-full px-3 py-1.5 pr-8 text-sm border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed opacity-60"
                    />
                    <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>

                  {/* Tooltip */}
                  <div className="absolute left-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                    <div className="bg-black text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap flex items-center gap-2">
                      <Lock className="w-3 h-3" />
                      <span>Demo Version - Feature Locked</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="relative group">
                  <label className="block text-xs font-semibold mb-2">Features</label>
                  <div className="space-y-1.5 opacity-60">
                    {[
                      { name: "Garage", count: 16 },
                      { name: "Swimming Pool", count: 7 },
                      { name: "Heating System", count: 78 },
                      { name: "Elevator", count: 75 },
                      { name: "Garden", count: 20 },
                      { name: "Kitchen", count: 78 },
                      { name: "Security", count: 77 },
                      { name: "Roof Deck", count: 33 },
                      { name: "Furnished", count: 80 },
                      { name: "Exterior", count: 77 },
                      { name: "Balcony / Balconies", count: 54 }
                    ].map(feature => (
                      <label key={feature.name} className="flex items-center gap-2 cursor-not-allowed">
                        <input
                          type="checkbox"
                          checked={features.includes(feature.name)}
                          disabled
                          className="w-3.5 h-3.5 rounded border-gray-300 accent-black cursor-not-allowed"
                        />
                        <span className="text-xs text-gray-900">{feature.name} ({feature.count})</span>
                      </label>
                    ))}
                  </div>

                  {/* Tooltip */}
                  <div className="absolute left-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                    <div className="bg-black text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap flex items-center gap-2">
                      <Lock className="w-3 h-3" />
                      <span>Demo Version - Feature Locked</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Grid de propiedades */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                          {property.Location || "Salamanca"}
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
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}
