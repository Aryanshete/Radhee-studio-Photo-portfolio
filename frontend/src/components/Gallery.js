import React, { useEffect, useState } from "react";
import "./Gallery.css";


const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "wedding", label: "Wedding" },
  { id: "prewedding", label: "Pre-Wedding" },
  { id: "portraits", label: "Portraits" },
  { id: "studio", label: "Studio" },
  { id: "family", label: "Family" },
  { id: "corporate", label: "Corporate" },
  { id: "commercial", label: "Commercial" },
];

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [category, setCategory] = useState("all");
  const [fade, setFade] = useState("fade-in");

  const loadGallery = () => {
    setFade("fade-out");

    const base = process.env.REACT_APP_BACKEND_URL;
    const url =
      category === "all"
        ? `${base}/gallery`
        : `${base}/gallery?category=${encodeURIComponent(category)}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
        setTimeout(() => setFade("fade-in"), 300);
      })
      .catch((err) => console.error("Gallery load error:", err));
  };

  useEffect(() => {
    loadGallery();
  }, [category]);

  // Navigation
  const nextImage = (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    setSelected(images[newIndex]);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    setSelected(images[newIndex]);
  };

  // Touch swipe
  let startX = 0;
  const handleTouchStart = (e) => (startX = e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextImage(e) : prevImage(e);
    }
  };

  // Keyboard Controls
  useEffect(() => {
    const handleKey = (e) => {
      if (!selected) return;
      if (e.key === "ArrowRight") nextImage(e);
      if (e.key === "ArrowLeft") prevImage(e);
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected, currentIndex, images]);

  // Scroll reveal animation
useEffect(() => {
  const cards = document.querySelectorAll(".gallery-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach((card) => observer.observe(card));

  return () => observer.disconnect();
}, [images]);

  return (
    <section id="gallery" className="gallery-section">
      <h2 className="section-heading">GALLERY</h2>
      <p className="section-subtitle">
        A glimpse into weddings, pre-weddings, studio portraits and branding work
      </p>

      {/* Category Filter */}
      <div className="gallery-categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={
              category === cat.id ? "gallery-cat-btn active" : "gallery-cat-btn"
            }
            onClick={() => setCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      
<div className={`gallery-grid ${fade}`}>
  {images.map((img, index) => (
    <div
      key={img._id}
      className="gallery-card"
      onClick={() => {
        setSelected(img);
        setCurrentIndex(index);
      }}
    >
      <div className="img-wrapper">
        <img
          src={img.imageUrl}
          alt={img.category}
          loading="lazy"
          onLoad={(e) => e.currentTarget.classList.add("loaded")}
        />
      </div>

      {/* Hover overlay */}
      <div className="gallery-overlay">
        <span>{img.category}</span>
      </div>
    </div>
  ))}
</div>


   
      {selected && (
        <div
          className="gallery-modal"
          onClick={() => setSelected(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button className="nav-btn prev" onClick={prevImage}>❮</button>
          <img className="gallery-modal-img" src={selected.imageUrl} alt="" />
          <button className="nav-btn next" onClick={nextImage}>❯</button>
        </div>
      )}
    </section>
  );
}