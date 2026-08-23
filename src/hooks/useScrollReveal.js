import { useEffect, useRef, useState, useCallback } from "react";

export function useScrollReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const isVisibleRef = useRef(false);

  // Manual fallback check using getBoundingClientRect.
  // This covers cases where IntersectionObserver doesn't fire correctly
  // (a known Chrome DevTools "device toolbar" resize bug, some in-app
  // webviews, etc). It's cheap, throttled via rAF, and only runs until
  // the element has been revealed once.
  const checkVisibility = useCallback(() => {
    if (isVisibleRef.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    if (rect.height <= 0) return;

    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;

    // Mirrors threshold: 0.15 + rootMargin: "0px 0px -50px 0px" exactly:
    // the root's effective bottom edge is shrunk by 50px, and at least
    // 15% of the element's own height must be inside that area.
    const effectiveBottom = viewportHeight - 50;
    const visibleTop = Math.max(rect.top, 0);
    const visibleBottom = Math.min(rect.bottom, effectiveBottom);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);
    const visibleRatio = visibleHeight / rect.height;

    if (visibleRatio >= 0.15) {
      isVisibleRef.current = true;
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    // Run an immediate check on mount (covers elements already in view
    // at load time, before any scroll/resize event fires).
    checkVisibility();

    let observer;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            isVisibleRef.current = true;
            setIsVisible(true);
          }
        },
        {
          threshold: 0.15,
          rootMargin: "0px 0px -50px 0px",
        },
      );
      observer.observe(currentRef);
    }

    let rafId = null;
    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        checkVisibility();
      });
    };

    // capture: true so this also catches scroll events firing inside
    // nested scrollable containers, not just the window itself.
    window.addEventListener("scroll", onScrollOrResize, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      if (observer && currentRef) observer.unobserve(currentRef);
      window.removeEventListener("scroll", onScrollOrResize, {
        capture: true,
      });
      window.removeEventListener("resize", onScrollOrResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [checkVisibility]);

  return { ref, isVisible };
}
