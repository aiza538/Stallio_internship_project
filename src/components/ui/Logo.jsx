// src/components/ui/Logo.jsx
import { Link } from "react-router-dom";
import stallioLogo from "/Stallio_Logo.png";

export default function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <img 
        src={stallioLogo} 
        alt="Stallio" 
        className="h-8 w-8 rounded-xl object-cover"
      />
      <span className="font-logo text-2xl font-medium text-slate-800 transition-colors duration-300 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
        Stallio
      </span>
    </Link>
  );
}