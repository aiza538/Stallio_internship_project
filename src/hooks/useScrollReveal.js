// src/hooks/useScrollReveal.js
import { useEffect, useRef, useState } from "react";

export function useScrollReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Scroll down OR up dono mein kaam karega
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Scroll up karne par element chhupa (optional)
          // Agar chahti hain ke scroll up par bhi dikhe toh ise comment kar dein
          // setIsVisible(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return { ref, isVisible };
}
