"use client";

import Link from "next/link";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer 
      className="relative bg-white text-gray-800 overflow-visible border-t border-gray-200"
      style={{
        clipPath: 'polygon(0 6vw, 100% 0, 100% 100%, 0 100%)',
        WebkitClipPath: 'polygon(0 6vw, 100% 0, 100% 100%, 0 100%)',
        marginTop: '-6vw',
        paddingTop: '8vw'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-light playfair-display-sc mb-4">SafeStays</h3>
            <p className="text-sm font-light text-gray-600 mb-4">
              SafeStays by The One Properties®
            </p>
          </div>

          {/* Links Section */}
          <div>
            <ul className="space-y-3">
              <li>
                <Link href="/terms-of-service" className="text-sm font-light text-gray-700 hover:text-gray-900 transition-colors">
                  Terms of service
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm font-light text-gray-700 hover:text-gray-900 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/home-owners" className="text-sm font-light text-gray-700 hover:text-gray-900 transition-colors">
                  Home Owners
                </Link>
              </li>
              <li>
                <Link href="/job-opportunities" className="text-sm font-light text-gray-700 hover:text-gray-900 transition-colors">
                  Job Opportunities
                </Link>
              </li>
              <li>
                <Link href="/safestays-living" className="text-sm font-light text-gray-700 hover:text-gray-900 transition-colors">
                  SafeStays Living
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social Section */}
          <div className="flex flex-col items-start md:items-end">
            <div className="flex gap-4 mb-6">
              <a
                href="https://instagram.com/safestays.eu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-300 hover:border-gray-500 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <Link 
              href="/contact"
              className="px-6 py-2 border border-gray-800 text-gray-800 text-sm font-light rounded-md hover:bg-gray-800 hover:text-white transition-all duration-300"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
