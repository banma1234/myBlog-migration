"use client";

import { useState, useEffect } from "react";
import iconHandler from "util/iconHandler";
import "app/styles/navButton.scss";

export const NavIcon = () => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    const THEME = document.documentElement.getAttribute("data-theme");
    THEME ? setCurrent(THEME) : setCurrent("light");
  }, []);

  const handleIcon = () => {
    switch (current) {
      case "dark":
        window.localStorage.setItem("THEME", "light");
        document.documentElement.setAttribute("data-theme", "light");
        setCurrent("light");
        break;
      case "light":
        window.localStorage.setItem("THEME", "dark");
        document.documentElement.setAttribute("data-theme", "dark");
        setCurrent("dark");
        break;
    }
  };

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="nav">
      <button className="nav_theme" onClick={handleIcon}>
        {iconHandler(current, "26")}
      </button>
      <button className="nav_up" onClick={scrollUp}>
        {iconHandler("arrowUp", "26")}
      </button>
    </div>
  );
};
