"use client";

import { useState, useEffect } from "react";

interface NavbarProps {
  isLoaded?: boolean;
  alwaysShowBackground?: boolean;
}

export function Navbar({ isLoaded = false, alwaysShowBackground = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showBackground = alwaysShowBackground || isScrolled;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-700 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      } ${
        showBackground
          ? "bg-black/30 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-white playfair-display-sc hover:scale-110 transition-transform duration-300">
              SafeStays
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* About - Locked */}
            <div className="relative group">
              <button
                onClick={(e) => e.preventDefault()}
                className="nav-link text-white/90 hover:text-white transition-all uppercase text-sm tracking-wider font-light cursor-pointer"
              >
                About
              </button>
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                <div className="bg-black/90 backdrop-blur-md text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap border border-white/10">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Demo Version - Feature Locked</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Services - Locked */}
            <div className="relative group">
              <button
                onClick={(e) => e.preventDefault()}
                className="nav-link text-white/90 hover:text-white transition-all uppercase text-sm tracking-wider font-light cursor-pointer"
              >
                Services
              </button>
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                <div className="bg-black/90 backdrop-blur-md text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap border border-white/10">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Demo Version - Feature Locked</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Properties - Locked */}
            <div className="relative group">
              <button
                onClick={(e) => e.preventDefault()}
                className="nav-link text-white/90 hover:text-white transition-all uppercase text-sm tracking-wider font-light cursor-pointer"
              >
                Properties
              </button>
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                <div className="bg-black/90 backdrop-blur-md text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap border border-white/10">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Demo Version - Feature Locked</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact - Locked */}
            <div className="relative group">
              <button
                onClick={(e) => e.preventDefault()}
                className="nav-link text-white/90 hover:text-white transition-all uppercase text-sm tracking-wider font-light cursor-pointer"
              >
                Contact
              </button>
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                <div className="bg-black/90 backdrop-blur-md text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap border border-white/10">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Demo Version - Feature Locked</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Language Selector - Disabled for Demo */}
            <div className="relative group">
              <button
                disabled
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white/40 cursor-not-allowed backdrop-blur-sm"
                title="Language selection disabled in demo"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
                <span className="text-sm font-medium">EN</span>
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Tooltip on hover */}
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-black/90 backdrop-blur-md text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap border border-white/10">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-white/60"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <span>Demo Version - Feature Locked</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-white/80 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 bg-black/30 backdrop-blur-lg rounded-lg mt-2 px-4 border border-white/20">
            {/* About - Locked */}
            <button
              onClick={(e) => e.preventDefault()}
              className="w-full flex items-center justify-between text-white/90 hover:text-white transition-colors uppercase text-sm tracking-wider"
            >
              <span>About</span>
              <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </button>

            {/* Services - Locked */}
            <button
              onClick={(e) => e.preventDefault()}
              className="w-full flex items-center justify-between text-white/90 hover:text-white transition-colors uppercase text-sm tracking-wider"
            >
              <span>Services</span>
              <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </button>

            {/* Properties - Locked */}
            <button
              onClick={(e) => e.preventDefault()}
              className="w-full flex items-center justify-between text-white/90 hover:text-white transition-colors uppercase text-sm tracking-wider"
            >
              <span>Properties</span>
              <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </button>

            {/* Contact - Locked */}
            <button
              onClick={(e) => e.preventDefault()}
              className="w-full flex items-center justify-between text-white/90 hover:text-white transition-colors uppercase text-sm tracking-wider"
            >
              <span>Contact</span>
              <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </button>

            {/* Demo Message */}
            <div className="pt-2 pb-1 border-t border-white/10">
              <p className="text-xs text-white/40 text-center">
                Navigation locked in demo version
              </p>
            </div>

            {/* Language Selector - Mobile */}
            <div className="pt-3 border-t border-white/10">
              <button
                disabled
                className="w-full flex items-center justify-between gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/40 cursor-not-allowed"
                title="Language selection disabled in demo"
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                    />
                  </svg>
                  <span className="text-sm font-medium uppercase tracking-wider">Language: EN</span>
                </div>
                <svg
                  className="w-4 h-4 text-white/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </button>
              <p className="text-xs text-white/30 mt-2 text-center">
                Feature locked in demo
              </p>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
