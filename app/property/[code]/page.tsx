"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  BedDouble,
  Bath,
  Square,
  MapPin,
  Calendar,
  ArrowLeft,
  FileDown,
} from "lucide-react";
import jsPDF from "jspdf";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

interface PropertyDetail {
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

  return "";
};

// Helper function to convert Google Drive video link to embeddable format
const convertVideoToEmbed = (url: string | undefined): string => {
  if (!url) return "";

  // Google Drive format: /file/d/FILE_ID/view
  const driveMatch = url.match(/\/file\/d\/([^\/]+)/);
  if (driveMatch) {
    return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  }

  // If it's already an embed URL or other video platform
  return url;
};

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const code = params?.code as string;

  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPropertyDetails();
  }, [code]);

  const loadPropertyDetails = async () => {
    try {
      const response = await fetch("/api/properties");

      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }

      const data = await response.json();
      const foundProperty = data.properties.find(
        (p: PropertyDetail) => p.CODE === decodeURIComponent(code)
      );

      if (!foundProperty) {
        setError("Property not found");
      } else {
        setProperty(foundProperty);
      }
    } catch (error) {
      console.error("Error loading property:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
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

  const getAvailableDate = (prop: PropertyDetail) => {
    if (prop.Month && prop.Date) {
      return `${prop.Month} ${prop.Date}`;
    }
    return prop.Date || "Disponible ahora";
  };

  const generatePDF = async () => {
    if (!property) return;

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    let yPosition = margin;

    // Title
    pdf.setFontSize(24);
    pdf.setFont("helvetica", "bold");
    pdf.text((property.Location as string) || "Propiedad", margin, yPosition);
    yPosition += 10;

    // Code
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Código: ${property.CODE}`, margin, yPosition);
    yPosition += 15;

    // Details section
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(0, 0, 0);
    pdf.text("Información de la Propiedad", margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");

    const details = [
      `Ubicación: ${property.Location || "N/A"}`,
      `Calle: ${property.Street || "N/A"}${
        property["#"] ? " " + property["#"] : ""
      }`,
      `Precio: ${formatPrice(property.Price || 0)}`,
      `Disponible desde: ${getAvailableDate(property)}`,
      `Habitaciones: ${property.Beds || "N/A"}`,
      `Baños: ${property.Baths || "N/A"}`,
      `Metros cuadrados: ${property.mts || "N/A"} m²`,
      `Servicios: ${property.Utilities || "N/A"}`,
    ];

    details.forEach((detail) => {
      if (yPosition > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(detail, margin, yPosition);
      yPosition += 7;
    });

    // Add image if available
    if (property.images) {
      const imageUrl = getFirstImageUrl(property.images);

      try {
        yPosition += 10;

        if (yPosition > pageHeight - 100) {
          pdf.addPage();
          yPosition = margin;
        }

        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text("Imágenes", margin, yPosition);
        yPosition += 10;

        // Note: Direct image loading might have CORS issues
        // For production, you'd need to proxy the images through your server
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imageUrl;

        await new Promise((resolve, reject) => {
          img.onload = () => {
            const imgWidth = pageWidth - 2 * margin;
            const imgHeight = (img.height * imgWidth) / img.width;

            pdf.addImage(
              img,
              "JPEG",
              margin,
              yPosition,
              imgWidth,
              Math.min(imgHeight, 150)
            );
            resolve(true);
          };
          img.onerror = () => {
            pdf.setFontSize(10);
            pdf.setTextColor(150, 150, 150);
            pdf.text("(Imagen no disponible)", margin, yPosition);
            resolve(false);
          };
        });
      } catch (error) {
        console.error("Error adding image to PDF:", error);
      }
    }

    // Save PDF
    pdf.save(`${property.CODE}_brochure.pdf`);
  };

  if (loading) {
    return (
      <>
        <Navbar isLoaded={true} alwaysShowBackground={true} />
        <div className="min-h-screen flex items-center justify-center bg-white pt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !property) {
    return (
      <>
        <Navbar isLoaded={true} alwaysShowBackground={true} />
        <div className="min-h-screen flex flex-col items-center justify-center bg-white pt-20">
          <h1 className="text-2xl font-light playfair-display-sc mb-4 text-gray-800">Property not found</h1>
          <button
            onClick={() => router.push("/propiedadesdisponibles")}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-light"
          >
            Back to Properties
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const imageUrl = getFirstImageUrl(property.images);
  const videoEmbedUrl = convertVideoToEmbed(property.Video);

  return (
    <>
      <Navbar isLoaded={true} alwaysShowBackground={true} />
      
      <div className="min-h-screen bg-white pt-20">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => router.push("/propiedadesdisponibles")}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-light"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>

              <button
                onClick={generatePDF}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-light"
              >
                <FileDown className="w-5 h-5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{/* Property Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-light text-gray-800 playfair-display-sc mb-2">
                {property.Location}
              </h1>
              <p className="text-lg text-gray-600 font-light">
                {property.Street}
                {property["#"] ? ` ${property["#"]}` : ""}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1 font-light">Code</p>
              <p className="text-2xl font-light text-gray-800 playfair-display-sc">{property.CODE}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-600 font-light">
            <Calendar className="w-5 h-5" />
            <span>Available from: {getAvailableDate(property)}</span>
          </div>
        </div>

        {/* Image Gallery */}
        {imageUrl && (
          <div className="mb-8 rounded-2xl overflow-hidden shadow-xl">
            <img
              src={imageUrl}
              alt={property.Location as string}
              className="w-full h-[500px] object-cover"
            />
          </div>
        )}

        {/* Property Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Info Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-light playfair-display-sc text-gray-800 mb-6">
              Property Details
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <BedDouble className="w-6 h-6 text-gray-800" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-light">Bedrooms</p>
                  <p className="text-lg font-light text-gray-800">
                    {property.Beds || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <Bath className="w-6 h-6 text-gray-800" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-light">Bathrooms</p>
                  <p className="text-lg font-light text-gray-800">
                    {property.Baths || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <Square className="w-6 h-6 text-gray-800" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-light">Area</p>
                  <p className="text-lg font-light text-gray-800">
                    {property.mts || "N/A"} m²
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-light playfair-display-sc text-gray-800 mb-4">
                Additional Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-light">Utilities:</span>
                  <span className="font-light text-gray-800">
                    {property.Utilities || "N/A"}
                  </span>
                </div>
                {property.Agency && (
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-light">Agency:</span>
                    <span className="font-light text-gray-800">{property.Agency}</span>
                  </div>
                )}
                {property.ID && (
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-light">ID:</span>
                    <span className="font-light text-gray-800">{property.ID}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Price Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 sticky top-24">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500 mb-2 font-light">Price</p>
                <p className="text-4xl font-light text-gray-800 playfair-display-sc">
                  {formatPrice(property.Price || 0)}
                </p>
              </div>

              <div className="space-y-3">
                {property.Brochure && (
                  <a
                    href={property.Brochure as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-3 bg-gray-900 text-white text-center rounded-lg hover:bg-gray-800 transition-colors font-light"
                  >
                    View Full Brochure
                  </a>
                )}

                {property.Video && (
                  <a
                    href={property.Video as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-3 border border-gray-900 text-gray-900 text-center rounded-lg hover:bg-gray-900 hover:text-white transition-colors font-light"
                  >
                    Watch Video
                  </a>
                )}

                {property["Whatsapp Message"] && (
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      property["Whatsapp Message"] as string
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-3 bg-green-600 text-white text-center rounded-lg hover:bg-green-700 transition-colors font-light"
                  >
                    Share via WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Video Section */}
        {videoEmbedUrl && (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-light playfair-display-sc text-gray-800 mb-6">
              Property Video
            </h2>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src={videoEmbedUrl}
                className="w-full h-full"
                title={`Video ${property.CODE}`}
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>
        )}
        </div>
        
        <Footer />
      </div>
    </>
  );
}
