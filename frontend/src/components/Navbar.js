import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoImg from "../assets/owner.jpg";

import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // detect login/logout on route change
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const goToSection = (id) => {
    if (location.pathname !== "/home") {
      navigate("/home");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
<div className="logo" onClick={() => goToSection("home")}>
  <img src={logoImg} alt="Radhee Studio Logo" />
</div>


        {/* HAMBURGER */}
        <div className="menu-icon" onClick={() => setOpen(!open)}>
          <span />
          <span />
          <span />
        </div>

        {/* NAV LINKS */}
        <ul className={`nav-links ${open ? "open" : ""}`}>
          <li onClick={() => goToSection("home")}>Home</li>
          <li onClick={() => goToSection("wedding")}>Wedding</li>
          <li onClick={() => goToSection("prewedding")}>Pre-Wedding</li>
          <li onClick={() => goToSection("portraits")}>Portraits</li>
          <li onClick={() => goToSection("studio")}>Studio</li>
          <li onClick={() => goToSection("family")}>Family</li>
          <li onClick={() => goToSection("corporate")}>Corporate</li>
          <li onClick={() => goToSection("commercial")}>Commercial</li>
          <li onClick={() => goToSection("gallery")}>Gallery</li>

          {/* AUTH BUTTON – login/logout */}
          <li className="nav-auth-btn">
            {isLoggedIn ? (
              <button onClick={logout}>Logout</button>
            ) : (
              <button onClick={() => navigate("/login")}>Login</button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
