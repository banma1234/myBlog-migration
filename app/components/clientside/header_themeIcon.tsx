"use client";

import { useState, useEffect } from "react";
import { useIcons } from "util/hooks";

export const ThemeIcon = () => {
  const [current, setCurrent] = useState("light");
  let ICON = useIcons(current, "22");

  useEffect(() => {
    const THEME = window.localStorage.getItem("THEME");
    THEME ? setCurrent(THEME) : "light";
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
      {ICON}
    </button>
  );
};
