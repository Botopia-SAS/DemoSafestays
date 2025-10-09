"use client";

import { useState } from "react";

export function SearchBar({ isLoaded = false }: { isLoaded?: boolean }) {
  const [city, setCity] = useState("");
  const [dates, setDates] = useState("");

  const handleSearch = () => {
    // Aquí se puede agregar la lógica de búsqueda
    console.log("Searching for:", { city, dates });
  };

  return (
    <div className={`w-full max-w-4xl mx-auto transition-all duration-700 ${
      isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}>
      {/* Title */}
      <div className="text-center mb-6 animate-fade-in-up animation-delay-300">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 playfair-display-sc">
          Redefining Luxury Living
        </h1>
        <p className="text-sm md:text-base text-white/90">
          Discover elegant furnished homes designed for long stays.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white/95 backdrop-blur-sm rounded-full shadow-2xl p-1.5 flex items-center gap-2 animate-scale-in animation-delay-500">
        {/* Where Section */}
        <div className="flex-1 px-4 py-2 border-r border-gray-200">
          <label className="block text-xs font-semibold text-gray-900 mb-1">
            Where?
          </label>
          <input
            type="text"
            placeholder="Select a city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-gray-600 placeholder-gray-400 text-sm"
          />
        </div>

        {/* When Section */}
        <div className="flex-1 px-4 py-2">
          <label className="block text-xs font-semibold text-gray-900 mb-1">
            When?
          </label>
          <input
            type="text"
            placeholder="Select dates"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-gray-600 placeholder-gray-400 text-sm"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-gray-800 hover:bg-gray-900 text-white rounded-full p-3 transition-all duration-300 transform hover:scale-110 hover:shadow-xl mr-1.5 w-11 h-11 flex items-center justify-center border-2 border-white"
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
