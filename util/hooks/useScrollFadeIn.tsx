import { useEffect, useRef, useState } from "react";
import useIntersectionObserver from "./useIntersectionObserver";

export default function useScrollFadeIn(selectors: string[]) {
  const elementsRef = useRef<Element[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    selectors.forEach(item => {
      const elements = document.querySelectorAll(item);
      elementsRef.current = [...elementsRef.current, ...Array.from(elements)];
      setIsMounted(true);
    });
  }, [selectors]);

  useIntersectionObserver({
    elements: elementsRef.current,
    callback: entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.opacity = "1";
          target.style.transform = "translate3d(0, 0, 0)";
          target.style.transitionProperty = "all";
          target.style.transitionDuration = "1s";
          target.style.transitionTimingFunction = "cubic-bezier(0, 0, 0.2, 1)";
        }
      });
    },
    options: { threshold: 0.2 },
  });

  return {
    ref: elementsRef,
  };
}
