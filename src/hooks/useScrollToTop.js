// src/hooks/useScrollToTop.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Har route change par top par scroll kar do
    window.scrollTo(0, 0);
  }, [pathname]);
}
