import React from "react";
import HeroCarousel from "../pages/HeroCarousel";
import About from "../pages/About";
import Features from "./Features";
import NavigationTracker from "../components/NavigationTracker";
import AnimatedWrapper from "../components/AnimatedWrapper";

const Home = () => {
  // Define your sections for navigation
  const sections = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About ScholarSync' },
    { id: 'features', name: 'Features' },
    { id: 'your-papers', name: 'Your Papers' },
    { id: 'new-paper', name: 'Forge your Paper' }
  ];

  return (
    <div className="relative">
      {/* Navigation with tracker */}
      <NavigationTracker sections={sections} />
      
      {/* Add padding-top to account for fixed navigation */}
      <div className="pt-20">
        <AnimatedWrapper animation="fadeIn" duration={0.8}>
          <section id="home">
            <HeroCarousel />
          </section>
        </AnimatedWrapper>

        <AnimatedWrapper animation="fadeInUp" delay={0.2} duration={0.8}>
          <section id="about">
            <About />
          </section>
        </AnimatedWrapper>

        <AnimatedWrapper animation="fadeInUp" delay={0.4} duration={0.8}>
          <section id="features">
            <Features />
          </section>
        </AnimatedWrapper>
      </div>
    </div>
  );
};

export default Home;