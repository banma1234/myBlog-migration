"use client";

import Link from "next/link";
import "../../styles/TOCStyle.scss";
import useIntersectionObserver from "util/hooks/useIntersectionObserver";
import { useState, useEffect } from "react";

export default function TOC() {
  const [currentId, setCurrentId] = useState<string>("");
  const [headerItems, setHeaderItems] = useState<Element[]>([]);

  useEffect(() => {
    const currentHeaders = Array.from(document.querySelectorAll(".md_header"));
    setHeaderItems(currentHeaders);
  }, []);

  useIntersectionObserver({
    elements: headerItems,
    callback: (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentId(entry.target.id);
        }
      });
    },
    options: { root: null, threshold: 1.0, rootMargin: "-30% 0px 0px 0px" },
  });

  return (
    <div className="TOC">
      {headerItems.map((item: any, i: number) => {
        let listItem = item.nodeName[1] === "3" ? "target__" : "";
        listItem += currentId === item.id ? "current" : "none";

        return (
          <Link href={`#${item.id}`} key={i}>
            <li className={listItem}>{item.innerText}</li>
          </Link>
        );
      })}
    </div>
  );
}
