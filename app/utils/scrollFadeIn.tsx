"use client";

import { useEffect, useRef, useState } from "react";
import useIntersectionObserver from "util/hooks/useIntersectionObserver";

export default function ScrollFadeIn(props: { children: any }) {
  const elementsRef = useRef<Element[]>([]);
  const [selectors, setSelectors] = useState<any>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setSelectors(document.querySelectorAll(".card_container"));
  }, []);

  useEffect(() => {
    elementsRef.current = Array.from(selectors);
    setIsMounted(!isMounted);
  }, [selectors]);

  useIntersectionObserver({
    elements: elementsRef.current,
    callback: (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.opacity = "1";
          target.style.transform = "translate3d(0, 0, 0)";
          target.style.transitionProperty = "all";
          target.style.transitionDuration = "1.5s";
          target.style.transitionTimingFunction = "cubic-bezier(0, 0, 0.2, 1)";
        }
      });
    },
    options: { threshold: 0.6 },
  });

  return <>{props.children}</>;
}
