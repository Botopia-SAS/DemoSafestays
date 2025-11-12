import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Playfair_Display_SC,
  Inter,
  Noto_Serif_Display,
  Hanken_Grotesk,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplaySC = Playfair_Display_SC({
  variable: "--font-playfair-display-sc",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

// Fonts used by safe-stays.com — load them with next/font (self-hosted by Next)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const notoSerifDisplay = Noto_Serif_Display({
  variable: "--font-noto-serif-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "SafeStays",
  description: "Your one-stop solution for luxury accommodations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplaySC.variable} ${inter.variable} ${notoSerifDisplay.variable} ${hankenGrotesk.variable} antialiased bg-white text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
