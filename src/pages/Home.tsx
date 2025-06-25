import React from "react";
import HeroCarousel from "../pages/HeroCarousel";
import About from "../pages/About";
import Features from "./Features";

const Home = () => {
  return (
    <div>
      <section id="home">
        <HeroCarousel />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="features">
        <Features />
      </section>
    </div>
  );
};

export default Home;
