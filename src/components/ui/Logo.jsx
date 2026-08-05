// src/components/ui/Logo.jsx
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

export default function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2">
      <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-500 text-white shadow-md shadow-brand-500/25 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-brand-500/40">
        <ShoppingBag className="h-4 w-4" strokeWidth={2.5} />
      </div>
      <span className="font-script text-2xl font-semibold text-slate-800 transition-colors duration-300 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
        Stallio
      </span>
    </Link>
  );
}