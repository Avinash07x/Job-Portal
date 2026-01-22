import React from 'react';
import { Search, MapPin } from 'lucide-react';
import heroBg from '../assets/hero-gallery-1.jpg';

interface HeroProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const Hero: React.FC<HeroProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative bg-gray-900 text-white py-20 sm:py-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Office background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900/95"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Dream Job</span> Today
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Discover thousands of job opportunities from top companies. 
          Your next career move starts here.
        </p>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl p-2 flex flex-col sm:flex-row gap-2">
          <div className="flex-grow relative flex items-center">
            <Search className="absolute left-4 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Job title, keywords, or company"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="hidden sm:flex items-center border-l border-gray-200 pl-4 pr-2 w-1/3">
            <MapPin className="text-gray-400 mr-2" size={20} />
            <input
              type="text"
              placeholder="Location"
              className="w-full py-3 text-gray-900 placeholder-gray-500 focus:outline-none"
            />
          </div>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
            Search
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-4 text-sm text-gray-400">
          <span>Popular:</span>
          <span className="text-white bg-gray-800 px-3 py-1 rounded-full">Remote</span>
          <span className="text-white bg-gray-800 px-3 py-1 rounded-full">Engineering</span>
          <span className="text-white bg-gray-800 px-3 py-1 rounded-full">Design</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;