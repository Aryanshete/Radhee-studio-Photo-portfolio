import React, { useEffect, useRef } from "react";
import "./CustomCursor.css";

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    if (window.innerWidth < 768) {
      cursor.style.display = "none";
      return;
    }

    const move = (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    const addClickEffect = () => {
      cursor.classList.add("cursor-click");
      setTimeout(() => cursor.classList.remove("cursor-click"), 150);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", addClickEffect);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", addClickEffect);
    };
  }, []);

  return <div className="custom-cursor" ref={cursorRef} />;
}