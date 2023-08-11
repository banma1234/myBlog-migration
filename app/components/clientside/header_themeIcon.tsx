"use client";

import { useState, useEffect } from "react";
import { useIcons } from "util/hooks";
import { useTheme } from "next-themes";

export const ThemeIcon = () => {
  const { setTheme } = useTheme();
  const [current, setCurrent] = useState("light");

  useEffect(() => {
    const THEME = window.localStorage.getItem("THEME");
    THEME ? setCurrent(THEME) : "light";
  }, []);

  useEffect(() => {
    setTheme(current);
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
    setTheme(current);
  };

  return (
    <button className="header_themeIcon" onClick={handleIcon}>
      {current === "dark" ? useIcons("moon", "22") : useIcons("sun", "22")}
    </button>
  );
};
