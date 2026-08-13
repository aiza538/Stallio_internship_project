// src/components/ui/Logo.jsx
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 no-underline">
      <img 
        src="/Stallio_Logo.png" 
        alt="Stallio" 
        className="h-11 w-auto" 
      />
      {/* ✅ mt-1 aur pt-0.5 add kiya taake text bilkul center mein aa jaye */}
      <span 
        className="text-4xl text-slate-800 dark:text-white mt-1"
        style={{ 
          fontFamily: "'Great Vibes', cursive",
          lineHeight: 1 
        }}
      >
        Stallio
      </span>
    </Link>
  );
}