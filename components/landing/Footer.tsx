"use client";

import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold playfair-display-sc mb-4">SafeStays</h3>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Redefining luxury living with elegant furnished homes designed for long stays.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 playfair-display-sc">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="#properties" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Properties
                </a>
              </li>
              <li>
                <a href="#about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 playfair-display-sc">Services</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-primary-foreground/80 text-sm">Long-term Rentals</span>
              </li>
              <li>
                <span className="text-primary-foreground/80 text-sm">Property Management</span>
              </li>
              <li>
                <span className="text-primary-foreground/80 text-sm">Concierge Service</span>
              </li>
              <li>
                <span className="text-primary-foreground/80 text-sm">Luxury Amenities</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 playfair-display-sc">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-foreground/80 flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  123 Luxury Avenue<br />Dubai, UAE
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-foreground/80 flex-shrink-0" />
                <a href="tel:+971123456789" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  +971 12 345 6789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-foreground/80 flex-shrink-0" />
                <a href="mailto:info@safestays.com" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  info@safestays.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm text-center md:text-left">
              &copy; {currentYear} SafeStays. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
