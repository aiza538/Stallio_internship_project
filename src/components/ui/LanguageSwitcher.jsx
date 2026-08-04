import { useState } from "react";

const LANGUAGES = ["EN", "ES", "AR"];

export default function LanguageSwitcher({ className = "" }) {
  const [active, setActive] = useState("EN");

  return (
    <div
      className={`inline-flex shrink-0 items-center gap-0.5 rounded-full border border-ink/10 p-1 dark:border-white/15 ${className}`}
      role="group"
      aria-label="Select language"
    >
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setActive(lang)}
          aria-pressed={active === lang}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-300 ease-snappy ${
            active === lang
              ? "bg-brand-600 text-white shadow-sm shadow-brand-500/30"
              : "text-slate-muted hover:bg-brand-50 hover:text-brand-600 dark:text-slate-light dark:hover:bg-white/5 dark:hover:text-brand-400"
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
