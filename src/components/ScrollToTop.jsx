// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Har route change par top par jayein
    window.scrollTo(0, 0);
  }, [pathname]);

  // ✅ Page reload par bhi top par jayein
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"; // Browser ki default scroll restore band karein
    }
    window.scrollTo(0, 0); // Reload hote hi top par jayein
  }, []);

  return null;
}