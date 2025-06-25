import React, { useState, useEffect } from 'react';
import { User, ChevronLeft, ChevronRight } from 'lucide-react';

// import slide1 from "../components/images/slide1.png";
import slide1 from "../components/images/slide1.jpg";
import slide2 from "../components/images/slide2.png";
import slide3 from "../components/images/slide3.png";

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample background images (replace with your actual images)
  const slides = [
    {
      id: 1,
      backgroundImage: slide1,
      title: 'Welcome to LPCPS\nScholarSync...',
      subtitle: '"Write Smarter, Research Faster — Empowering Researchers &\nRevolutionizing the Way You Research."',
      showButtons: true
    },
    {
      id: 2,
      backgroundImage: slide2,
      title: 'Empowering Researchers, One Paper at a Time.',
      subtitle: 'ScholarSync helps you write, manage, and collaborate on research papers effortlessly.',
      showButtons: false
    },
    {
      id: 3,
      backgroundImage: slide3,
      title: 'Join ScholarSync & Elevate Your Research',
      subtitle: 'Bridging Ideas to Innovation',
      showButtons: false
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image with Transition */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${currentSlideData.backgroundImage})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Fixed Navigation */}
      <nav className="relative z-20 flex justify-between items-center px-6 lg:px-12 py-6">
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
      <div className="relative z-10 flex items-center justify-start h-full px-6 lg:px-12 -mt-20">
        <div className={`max-w-4xl transition-all duration-500 ease-in-out ${
          currentSlide === 0 ? 'transform translate-x-0 opacity-100' : 
          currentSlide === 1 ? 'transform translate-x-0 opacity-100' : 
          'transform translate-x-0 opacity-100'
        }`}>
          {/* Main Heading */}
          <h1 className="text-white text-5xl lg:text-7xl font-bold leading-tight mb-8 whitespace-pre-line">
            {currentSlideData.title}
          </h1>

          {/* Subtitle */}
          <p className="text-white text-xl lg:text-2xl mb-12 font-light max-w-3xl whitespace-pre-line">
            {currentSlideData.subtitle}
          </p>

          {/* CTA Buttons - Only show on first slide */}
          {currentSlideData.showButtons && (
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gray-700 bg-opacity-80 text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 backdrop-blur-sm transform hover:scale-105">
                Learn more
              </button>
              <button className="bg-blue-600 bg-opacity-80 text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 backdrop-blur-sm transform hover:scale-105">
                Get Started
              </button>
            </div>
          )}

          {/* Single CTA Button - Show on other slides */}
          {!currentSlideData.showButtons && (
            <button 
              className={`px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                currentSlide === 1 
                  ? 'bg-white text-gray-900 hover:bg-gray-100' 
                  : 'bg-gray-800 bg-opacity-80 text-white hover:bg-opacity-90 border border-gray-600 backdrop-blur-sm'
              }`}
              onClick={() => console.log('Learn more clicked')}
            >
              Learn more
            </button>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3 hover:bg-opacity-30 transition-all duration-300 group"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3 hover:bg-opacity-30 transition-all duration-300 group"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 z-20 bg-black bg-opacity-30 backdrop-blur-sm rounded-full px-4 py-2">
        <span className="text-white text-sm font-medium">
          {currentSlide + 1} / {slides.length}
        </span>
      </div>
    </div>
  );
};

export default HeroCarousel;