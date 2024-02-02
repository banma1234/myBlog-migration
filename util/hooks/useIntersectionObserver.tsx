"use client";
import { useEffect, useRef } from "react";

export default function useIntersectionObserver({
  elements,
  callback,
  options = {},
}: UseIntersectionObserverProps): IntersectionObserver | null {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (elements.length === 0) return;

    observer.current = new IntersectionObserver(callback, options);
    elements.forEach(el => observer.current?.observe(el));

    return () => {
      if (observer.current) {
        elements.forEach(el => observer.current?.unobserve(el));
        observer.current.disconnect();
      }
    };
  }, [elements, callback, options]);

  return observer.current;
}

interface UseIntersectionObserverProps {
  elements: Element[];
  callback: IntersectionObserverCallback;
  options?: IntersectionObserverInit;
}
