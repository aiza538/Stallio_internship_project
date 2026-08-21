// src/components/ui/LanguageSwitcher.jsx
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe } from "lucide-react";

const LANGUAGES = [
  { code: "EN", label: "English" },
  { code: "ES", label: "Español" },
  { code: "AR", label: "العربية" },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("EN");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code) => {
    setSelectedLang(code);
    setIsOpen(false);
  };

  const selectedLabel = LANGUAGES.find((lang) => lang.code === selectedLang)?.label;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-full border border-indigo-200/50 bg-white/50 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-all duration-300 hover:border-brand-400 hover:bg-indigo-50 hover:text-brand-600 dark:border-indigo-800/30 dark:bg-white/5 dark:text-slate-300 dark:hover:border-brand-500 dark:hover:bg-white/10 dark:hover:text-brand-400"
      >
        <Globe className="h-3.5 w-3.5" strokeWidth={2} />
        <span>{selectedLabel}</span>
        <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* ✅ Desktop par absolute, Mobile par relative (normal flow) */}
      {isOpen && (
        <div className="mt-2 w-full max-w-[200px] overflow-hidden rounded-xl border border-indigo-200/50 bg-white shadow-lg dark:border-indigo-800/30 dark:bg-slate-900 lg:absolute lg:left-auto lg:right-0 lg:top-full lg:z-50">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelect(lang.code)}
              className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-xs font-medium transition-colors duration-200 ${
                selectedLang === lang.code
                  ? "bg-indigo-50 text-brand-600 dark:bg-white/10 dark:text-brand-400"
                  : "text-slate-600 hover:bg-indigo-50/50 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-brand-400"
              }`}
            >
              <span className="truncate">{lang.label}</span>
              {selectedLang === lang.code && (
                <span className="ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"></span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}