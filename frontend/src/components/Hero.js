import React from "react";
import "./Hero.css";
import heroLogo from "../assets/hero.jpg";

export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-inner">
        <div className="hero-left">
          <p className="hero-tagline">Capturing Moments • Creating Memories</p>
          <h1>
            Timeless <span>Wedding</span> & Portrait Photography
          </h1>
          <p className="hero-text">
            Radhee Arts & Photoworks specialises in elegant, cinematic imagery
            – from intimate pre-weddings to grand celebrations and studio
            portraits.
          </p>

          <div className="btn-row">
            <button className="btn-primary" onClick={() => scrollTo("gallery")}>
              View Gallery
            </button>
            <button
              className="btn-outline"
              onClick={() => scrollTo("services")}
            >
              Book a Session
            </button>
          </div>

          <p className="hero-meta">
             • Weddings • Pre-weddings • Studio  • Portraits • Family • Commercial
          </p>
        </div>

        <div className="hero-right">
          <div className="hero-image-wrapper">
            <img src={heroLogo} alt="Radhee Studio Logo" />
          </div>
          
        </div>
      </div>

      <div className="hero-wave" />
    </section>
  );
}
