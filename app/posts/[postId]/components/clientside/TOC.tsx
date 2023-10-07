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

    currentHeaders.map(header => {
      observer.observe(header);
    });
  }, []);

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
  setState: Dispatch<SetStateAction<string>>,
) => {
  let direction = "";
  let prevYposition = 0;
  const options = {
    root: null,
    threshold: 1.0,
    rootMargin: "-30% 0px 0px 0px",
  };

  /*
   * 스크롤 방향을 감지하는 함수
   */
  const checkScrollDirection = (prev: number) => {
    if (window.scrollY === 0 && prev === 0) return;
    else if (window.scrollY > prev) direction = "down";
    else direction = "up";

    prevYposition = window.scrollY;
  };

  /*
   * 화면상의 헤더들을 감지
   */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
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
