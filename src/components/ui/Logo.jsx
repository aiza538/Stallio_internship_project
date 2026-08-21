// src/components/ui/Logo.jsx
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 no-underline">
      {/* Bag Icon */}
      <img 
        src="/Stallio_Logo.png" 
        alt="Stallio" 
        className="h-11 w-auto" 
      />
      
      {/* Text - Center aligned with 3px downward shift for Great Vibes font */}
      <span 
        className="text-[2.2rem] text-slate-800 dark:text-white"
        style={{ 
          fontFamily: "'Great Vibes', cursive",
          lineHeight: 1,
          transform: "translateY(3px)" // Bag ke center ke bilkul barabar laane ke liye
        }}
      >
        Stallio
      </span>
    </Link>
  );
}