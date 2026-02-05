import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3>Radhee Studio</h3>
          <p>Arts & Photoworks – Pune</p>
        </div>

        <div className="footer-contact">
          {/* <p>Call: +91-XXXXXXXXXX</p> */}
          <p>Email: radheestudio@gmail.com</p>
        </div>

        <div className="footer-copy">
          © {new Date().getFullYear()} Radhee Arts & Photoworks. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
