// src/components/ui/Logo.jsx
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <img 
        src="/Stallio_Logo.png" 
        alt="Stallio" 
        className="h-7 w-auto" 
      />
      <span 
        className="text-2xl text-slate-800 dark:text-white"
        style={{ 
          fontFamily: "'Great Vibes', cursive",
          lineHeight: 1,
          marginTop: 2
        }}
      >
        Stallio
      </span>
    </Link>
  );
}