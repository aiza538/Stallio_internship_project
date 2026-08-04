import { ShoppingBag } from "lucide-react";

export default function Logo({ className = "" }) {
  return (
    <a
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Stallio home"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient shadow-sm shadow-brand-500/30 transition-transform duration-300 ease-snappy group-hover:scale-105 group-hover:shadow-md group-hover:shadow-brand-500/40">
        <ShoppingBag className="h-5 w-5 text-white" strokeWidth={2.25} />
      </span>
      <span className="font-script text-2xl font-semibold leading-none text-ink dark:text-white">
        Stallio
      </span>
    </a>
  );
}
