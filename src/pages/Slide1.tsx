import React from 'react';
import { User } from 'lucide-react';
// Import statement as requested
import slide1 from "../components/images/slide1.png";

const Slide1: React.FC = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${slide1})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex justify-between items-center px-6 lg:px-12 py-6">
          <div className="text-white text-2xl font-semibold">
            ScholarSync
          </div>
          
          <div className="hidden md:flex space-x-8 text-white">
            <a href="#" className="hover:text-gray-300 transition-colors">Home</a>
            <a href="#" className="hover:text-gray-300 transition-colors">About ScholarSync</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Your Papers</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Forge your Paper</a>
          </div>

          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2">
            <User className="w-6 h-6 text-white" />
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex flex-col items-start justify-center min-h-[80vh] px-6 lg:px-12">
          <div className="max-w-4xl">
            {/* Main Heading */}
            <h1 className="text-white text-5xl lg:text-7xl font-bold leading-tight mb-8">
              Welcome to LPCPS
              <br />
              ScholarSync...
            </h1>

            {/* Subtitle */}
            <p className="text-white text-xl lg:text-2xl mb-12 font-light max-w-2xl">
              "Write Smarter, Research Faster — Empowering Researchers &
              <br />
              Revolutionizing the Way You Research."
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gray-700 bg-opacity-80 text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 backdrop-blur-sm">
                Learn more
              </button>
              <button className="bg-blue-600 bg-opacity-80 text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 backdrop-blur-sm">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default  Slide1;