"use client";

import { useState, useEffect } from "react";
import { useIcons } from "util/hooks";
import { useTheme } from "next-themes";

export const ThemeIcon = () => {
  const { setTheme } = useTheme();
  const [current, setCurrent] = useState(() => {
    const THEME = window.localStorage.getItem("THEME");
    return THEME ? THEME : "light";
  });
  // const CURRENT_THEME = theme === "system" ? systemTheme : theme;

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
    // <div>
    //   {current === "dark" ? (
    //     <button
    //       className="header_themeIcon"
    //       onClick={() => handleIcon("light")}
    //     >
    //       {useIcons("moon", "22")}
    //     </button>
    //   ) : (
    //     <button className="header_themeIcon" onClick={() => handleIcon("dark")}>
    //       {useIcons("sun", "22")}
    //     </button>
    //   )}
    // </div>
  );
};
