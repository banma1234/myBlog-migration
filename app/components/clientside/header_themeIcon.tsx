"use client";

import { useState, useEffect } from "react";
import iconHandler from "util/iconHandler";

export const ThemeIcon = () => {
  const [current, setCurrent] = useState("dark");

  useEffect(() => {
    const THEME = window.localStorage.getItem("THEME");
    THEME ? setCurrent(THEME) : "dark";
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", current);
  }, [current]);

  const handleIcon = () => {
    switch (current) {
      case "dark":
        window.localStorage.setItem("THEME", "light");
        setCurrent("light");
        break;
      case "light":
        window.localStorage.setItem("THEME", "dark");
        setCurrent("dark");
        break;
    }
  };

  return (
    <button className="header_themeIcon" onClick={handleIcon}>
      {iconHandler(current, "22")}
    </button>
  );
};
