import React from 'react';
import slide2 from "../components/images/Slide2.png";


const Slide2: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${slide2})`,
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 flex items-center justify-start h-full px-8 md:px-16 lg:px-24">
        <div className="max-w-2xl">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Empowering Researchers, One Paper at a Time.
          </h1>
          
          {/* Subtext */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed font-light">
            ScholarSync helps you write, manage, and collaborate on research papers effortlessly.
          </p>
          
          {/* Call to Action Button */}
          <button 
            className="bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
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

export default  Slide2;