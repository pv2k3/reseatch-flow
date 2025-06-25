import React, { useState, useEffect } from "react";
import { User, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedWrapper from "../components/AnimatedWrapper";

// import slide1 from "../components/images/slide1.png";
import slide1 from "../components/images/slide1.jpg";
import slide22 from "../components/images/slide22.png";
import slide3 from "../components/images/slide3.png";

const ScholarSyncSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample background images (replace with your actual images)
  const slides = [
    {
      id: 1,
      backgroundImage: slide1,
      title: "Welcome to LPCPS\nScholarSync...",
      subtitle:
        '"Write Smarter, Research Faster — Empowering Researchers &\nRevolutionizing the Way You Research."',
      showButtons: true,
    },
    {
      id: 2,
      backgroundImage: slide22,
      title: "Empowering Researchers, One Paper at a Time.",
      subtitle:
        "ScholarSync helps you write, manage, and collaborate on research papers effortlessly.",
      showButtons: false,
    },
    {
      id: 3,
      backgroundImage: slide3,
      title: "Join ScholarSync & Elevate Your Research",
      subtitle: "Bridging Ideas to Innovation",
      showButtons: false,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentSlideData = slides[currentSlide];

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-gray-900"
      style={{ marginTop: "-75px" }}
    >
      {" "}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${currentSlideData.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          transform: "scale(1.05)",
          animation: "zoomFade 1s ease-in-out",
        }}
      >
        <style>{`
          @keyframes zoomFade {
            0% {
              opacity: 0;
              transform: scale(1.1);
            }
            100% {
              opacity: 1;
              transform: scale(1.05);
            }
          }
        `}</style>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-start h-full px-6 lg:px-12">
        <div className="max-w-4xl">
          {/* Main Heading */}
          <AnimatedWrapper
            key={`title-${currentSlide}`}
            animation="fadeInUp"
            duration={0.8}
          >
            <h1 className="text-white text-5xl lg:text-7xl font-bold leading-tight mb-8 whitespace-pre-line">
              {currentSlideData.title}
            </h1>
          </AnimatedWrapper>

          {/* Subtitle */}
          <AnimatedWrapper
            key={`subtitle-${currentSlide}`}
            animation="fadeInUp"
            delay={0.3}
            duration={0.8}
          >
            <p className="text-white text-xl lg:text-2xl mb-12 font-light max-w-3xl whitespace-pre-line">
              {currentSlideData.subtitle}
            </p>
          </AnimatedWrapper>

          {/* CTA Buttons - Only show on first slide */}
          {currentSlideData.showButtons && (
            <AnimatedWrapper
              key={`buttons-${currentSlide}`}
              animation="fadeInUp"
              delay={0.6}
              duration={0.8}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#about"
                  className="bg-gray-700 bg-opacity-80 text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 backdrop-blur-sm transform hover:scale-105 text-center"
                >
                  Learn more
                </a>

                <a href="/your-papers" className="bg-blue-600 bg-opacity-80 text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 backdrop-blur-sm transform hover:scale-105">
                  Get Started
                </a>
              </div>
            </AnimatedWrapper>
          )}

          {/* Single CTA Button - Show on other slides */}
          {!currentSlideData.showButtons && (
            <AnimatedWrapper
              key={`single-button-${currentSlide}`}
              animation="fadeInUp"
              delay={0.6}
              duration={0.8}
            >
              <a
                href="#about"
                className={`px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  currentSlide === 1
                    ? "bg-white text-gray-900 hover:bg-gray-100"
                    : "bg-gray-800 bg-opacity-80 text-white hover:bg-opacity-90 border border-gray-600 backdrop-blur-sm"
                }`}
                onClick={() => console.log("Learn more clicked")}
              >
                Learn more
              </a>
            </AnimatedWrapper>
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
                ? "bg-white scale-125"
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
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

export default ScholarSyncSlideshow;
