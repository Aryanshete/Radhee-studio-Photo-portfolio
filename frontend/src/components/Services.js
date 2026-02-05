import React from "react";
import "./Services.css";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const navigate = useNavigate();

  const goToBooking = (serviceTitle) => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      
      navigate("/login", { state: { from: "/book", serviceName: serviceTitle } });
      return;
    }

    navigate("/book", { state: { serviceName: serviceTitle } });
  };

  const services = [
    {
      id: "wedding",
      title: "Wedding Stories",
      tag: "Full-day coverage",
      description:
        "From haldi to pheras and reception, we capture every ritual, laugh and tear with a blend of candid and classic frames.",
      starting: "₹45,000",
    },
    {
      id: "prewedding",
      title: "Pre-Wedding",
      tag: "Cinematic sessions",
      description:
        "Stylised couple sessions with location planning, posing guidance and creative concepts tailored to your story.",
      starting: "₹18,000",
    },
    {
      id: "portraits",
      title: "Portraits",
      tag: "Individual & couple",
      description:
        "Editorial-style portraits for artists, entrepreneurs and families who want timeless images with a clean aesthetic.",
      starting: "₹6,000",
    },
    {
      id: "family",
      title: "Family Sessions",
      tag: "At home or studio",
      description:
        "Warm, relaxed sessions that focus on genuine connections between parents, kids and extended families.",
      starting: "₹9,000",
    },
    {
      id: "corporate",
      title: "Corporate",
      tag: "Headshots & events",
      description:
        "Professional headshots, office lifestyle imagery and coverage for launches, conferences and internal events.",
      starting: "On request",
    },
    {
      id: "commercial",
      title: "Commercial & Branding",
      tag: "Brands & products",
      description:
        "Clean, impactful visuals for social media campaigns, catalogues and brand stories that stand out.",
      starting: "On request",
    },
  ];

  return (
    <section id="services" className="services-section">
      <h2 className="section-heading">Our Services</h2>
      <p className="section-subtitle">
        Crafted experiences for every story – book your session instantly.
      </p>

      <div className="services-grid">
        {services.map((s) => (
          <article key={s.id} id={s.id} className="service-card">
            <div className="service-tag">{s.tag}</div>

            <h3>{s.title}</h3>
            <p className="service-text">{s.description}</p>

            <p className="service-price">
              Starting at <span>{s.starting}</span>
            </p>

            <button
              className="book-now-btn"
              type="button"
              onClick={() => goToBooking(s.title)}
            >
              Book Now
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
