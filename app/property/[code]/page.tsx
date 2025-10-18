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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Propiedad no encontrada</h1>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  const imageUrl = getFirstImageUrl(property.images);
  const videoEmbedUrl = convertVideoToEmbed(property.Video);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver</span>
            </button>

            <button
              onClick={generatePDF}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <FileDown className="w-5 h-5" />
              <span>Descargar PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Property Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary playfair-display-sc mb-2">
                {property.Location}
              </h1>
              <p className="text-lg text-muted-foreground">
                {property.Street}
                {property["#"] ? ` ${property["#"]}` : ""}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Código</p>
              <p className="text-2xl font-bold text-primary">{property.CODE}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-5 h-5" />
            <span>Disponible desde: {getAvailableDate(property)}</span>
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
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Detalles de la Propiedad
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent rounded-lg">
                  <BedDouble className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Habitaciones</p>
                  <p className="text-lg font-semibold">
                    {property.Beds || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent rounded-lg">
                  <Bath className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Baños</p>
                  <p className="text-lg font-semibold">
                    {property.Baths || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent rounded-lg">
                  <Square className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Área</p>
                  <p className="text-lg font-semibold">
                    {property.mts || "N/A"} m²
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold mb-4">
                Información Adicional
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Servicios:</span>
                  <span className="font-medium">
                    {property.Utilities || "N/A"}
                  </span>
                </div>
                {property.Agency && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Agencia:</span>
                    <span className="font-medium">{property.Agency}</span>
                  </div>
                )}
                {property.ID && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID:</span>
                    <span className="font-medium">{property.ID}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Price Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground mb-2">Precio</p>
                <p className="text-4xl font-bold text-primary">
                  {formatPrice(property.Price || 0)}
                </p>
              </div>

              <div className="space-y-3">
                {property.Brochure && (
                  <a
                    href={property.Brochure as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-3 bg-primary text-white text-center rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Ver Brochure Completo
                  </a>
                )}

                {property.Video && (
                  <a
                    href={property.Video as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-3 bg-secondary text-white text-center rounded-lg hover:bg-secondary/90 transition-colors"
                  >
                    Ver Video
                  </a>
                )}

                {property["Whatsapp Message"] && (
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      property["Whatsapp Message"] as string
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-3 bg-green-600 text-white text-center rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Compartir por WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Video Section */}
        {videoEmbedUrl && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Video de la Propiedad
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
    </div>
  );
}
