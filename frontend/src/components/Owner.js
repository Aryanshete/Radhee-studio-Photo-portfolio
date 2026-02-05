import React from "react";
import "./Owner.css";
import ownerPhoto from "../assets/owner.jpg";

export default function Owner() {
  return (
    <section id="studio" className="owner-section">
      <div className="owner-header">
        <h2 className="section-heading">Owner</h2>
        <p className="section-subtitle">The eye behind the stories</p>

        {/* Centered badge below the subtitle */}
        <div className="owner-badge">10+ years of crafted stories</div>
      </div>

      <div className="owner-card">
        <div className="owner-img-wrap">
          <img src={ownerPhoto} alt="Studio Owner" />
        </div>

        <div className="owner-content">
          <h3>Aniket Patil</h3>
          <p className="owner-role">Founder • Lead Photographer</p>
          <p className="owner-text">
            With a passion for real emotions and authentic colours, Andesh has
            documented weddings, families and brands across Maharashtra. His
            approach blends classic composition with modern, editorial styling –
            resulting in images that feel both cinematic and timeless.
          </p>
          <p className="owner-text">
            Whether it&apos;s a grand celebration or an intimate studio
            portrait, every frame is crafted with care, patience and attention
            to the smallest details.
          </p>

          <div className="owner-contact">
            <p>Email: <span>radheestudio@gmail.com</span></p>
            {/* <p>Phone: <span>+91-XXXXXXXXXX</span></p> */}
          </div>
        </div>
      </div>
    </section>
  );
}
