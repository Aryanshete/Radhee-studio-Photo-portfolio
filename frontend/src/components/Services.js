import React, { useEffect, useState } from "react";
import "./Services.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Services() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const goToBooking = (serviceTitle) => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/login", {
        state: { from: "/book", serviceName: serviceTitle },
      });
      return;
    }

    navigate("/book", { state: { serviceName: serviceTitle } });
  };

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/services`
        );

        setServices(res.data || []);
      } catch (err) {
        console.error("Service fetch failed:", err);

        // fallback so UI never crashes
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading services…</p>;

  return (
    <section id="services" className="services-section">
      <h2 className="section-heading">Our Services</h2>
      <p className="section-subtitle">
        Crafted experiences for every story – book your session instantly.
      </p>

      <div className="services-grid">
        {services.length === 0 && <p>No services available.</p>}

        {services.map((s) => (
          <article key={s._id} id={s._id} className="service-card">
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
