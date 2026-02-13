import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3>Radhe Studio</h3>
          <p>Arts & Photoworks – KOLHAPUR</p>
        </div>

        <div className="footer-contact">
           {/* <p>Call: 8830083756</p> */}
          <p>Email: radhe.arts0201@gmail.com</p>
        </div>

        <div className="footer-copy">
          © {new Date().getFullYear()} Radhee Arts & Photoworks. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
    
