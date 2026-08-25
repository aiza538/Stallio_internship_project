// src/components/ui/Logo.jsx
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center justify-center gap-1.2 no-underline">
      {/* Bag Icon */}
      <img 
        src="/Stallio_Logo.png" 
        alt="Stallio" 
        className="h-14 w-auto object-contain" 
      />
      
      {/* Text - Bilkul center, line-height fix */}
      <span 
        className="text-[2.3rem] text-slate-800 dark:text-white"
        style={{ 
          fontFamily: "'Great Vibes', cursive",
          lineHeight: "0.8",
          transform: "translateY(6px)" 
        }}
      >
        Stallio
      </span>
    </Link>
  );
}