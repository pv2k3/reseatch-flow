import React from "react";
import HeroCarousel from "../pages/HeroCarousel";
import About from "../pages/About";
import Features from "./Features";
import NavigationTracker from "../components/NavigationTracker";
import AnimatedWrapper from "../components/AnimatedWrapper";
import Footer from "../pages/Footer";
// import Dashboard from "../pages/Dashboard";

const Home = () => {
  // Define your sections for navigation
  const sections = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'features', name: 'Features' },
    { id: 'your-papers', href: '/your-papers', name: 'Your Papers' },
    { id: 'new-paper', href: '/new-paper', name: 'Forge your Paper' }

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

                <section id="footer">
            <Footer />
          </section>

      </div>
    </div>
  );
};

export default Home;