import React from 'react';
import slide3 from "../components/images/Slide3.png";

const Slide3: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${slide3})`,
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 flex items-center justify-start h-full px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Join ScholarSync & Elevate Your Research
          </h1>
          
          {/* Subtext */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed font-light">
            Bridging Ideas to Innovation
          </p>
          
          {/* Call to Action Button */}
          <button 
            className="bg-gray-800 bg-opacity-80 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-600 backdrop-blur-sm"
            onClick={() => {
              // Add your navigation logic here
              console.log('Learn more clicked');
            }}
          >
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
};

export default  Slide3;