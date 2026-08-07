import { Link } from "react-router-dom";
import stallioLogo from "/Stallio_Logo.png";

export default function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      {/* Bag Icon */}
      <img 
        src={stallioLogo} 
        alt="Stallio" 
        className="h-9 w-9 rounded-xl object-cover"
      />
      
      <span className="font-logo text-2xl font-medium text-slate-800 dark:text-white">
        Stallio
      </span>
    </Link>
  );
}