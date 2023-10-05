"use client";

import Link from "next/link";
import "../../styles/TOCStyle.scss";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

export default function TOC() {
  const [currentId, setCurrentId] = useState<string>("");
  const [headerItems, setHeaderItems] = useState<Element[]>([]);

  useEffect(() => {
    const observer = getIntersectionObserver(setCurrentId);
    const currentHeaders = Array.from(document.querySelectorAll(".md_header"));
    setHeaderItems(currentHeaders);

    currentHeaders.map((header) => {
      observer.observe(header);
    });
  }, []);

  useEffect(() => {
    console.log(currentId);
  }, [currentId]);

  return (
    <div className="TOC">
      {headerItems.map((item: any, i: number) => {
        let listItem = item.nodeName[1] === "3" ? "target__" : "";
        listItem += currentId === item.id ? "current" : "none";

        return (
          <Link href={item.id} key={i}>
            <li className={listItem}>{item.innerText}</li>
          </Link>
        );
      })}
    </div>
  );
}

const getIntersectionObserver = (
  setState: Dispatch<SetStateAction<string>>
) => {
  let direction = "";
  let prevYposition = 0;
  const options = {
    root: null,
    threshold: 1.0,
    rootMargin: "-30% 0px 0px 0px",
  };

  // scroll 방향 check function
  const checkScrollDirection = (prevY: number) => {
    if (window.scrollY === 0 && prevY === 0) return;
    else if (window.scrollY > prevY) direction = "down";
    else direction = "up";

    prevYposition = window.scrollY;
  };

  // observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      checkScrollDirection(prevYposition);

      if (
        (direction === "down" && !entry.isIntersecting) ||
        (direction === "up" && entry.isIntersecting)
      ) {
        setState(entry.target.id);
      }
    });
  }, options);

  return observer;
};
