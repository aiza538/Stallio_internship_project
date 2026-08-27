// src/components/ui/LanguageSwitcher.jsx
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "ar", label: "العربية" },
];

// ✅ NEW: accepts an optional onOpenChange(isOpen) callback so parent
// components (like Navbar's mobile panel) can react when this dropdown
// opens or closes — e.g. to release an overflow-hidden clip.
// ✅ NEW: variant="mobile" renders the option list inline (normal document
// flow) instead of absolutely positioned, so it pushes elements below it
// down instead of overlapping them — used in the mobile nav panel.
export default function LanguageSwitcher({ onOpenChange, variant = "desktop" }) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(
    ["en", "es", "ar"].includes(i18n.language) ? i18n.language : "en"
  );
  const dropdownRef = useRef(null);
  const isRTL = i18n.language === 'ar';

  // ✅ NEW: notify parent whenever open state changes
  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

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
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  const selectedLabel = LANGUAGES.find((lang) => lang.code === selectedLang)?.label;

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-full border border-indigo-200/50 bg-white/50 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-all duration-300 hover:border-brand-400 hover:bg-indigo-50 hover:text-brand-600 dark:border-indigo-800/30 dark:bg-white/5 dark:text-slate-300 dark:hover:border-brand-500 dark:hover:bg-white/10 dark:hover:text-brand-400"
      >
        <Globe className="h-3.5 w-3.5" />
        <span>{selectedLabel}</span>
        <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className={`${variant === "mobile" ? "relative mt-2 w-full" : "absolute top-full z-50 mt-2 w-40"} overflow-hidden rounded-xl border border-indigo-200/50 bg-white/95 shadow-lg backdrop-blur-md dark:border-indigo-800/30 dark:bg-slate-900/95 ${
          variant === "mobile" ? "" : (isRTL ? 'right-0' : 'left-0 sm:left-auto sm:right-0')
        }`}>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelect(lang.code)}
              className={`flex w-full items-center justify-between px-4 py-2.5 text-xs font-medium transition-colors duration-200 ${
                selectedLang === lang.code
                  ? "bg-indigo-50 text-brand-600 dark:bg-white/10 dark:text-brand-400"
                  : "text-slate-600 hover:bg-indigo-50/50 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-brand-400"
              } ${isRTL ? 'text-right' : 'text-left'}`}
            >
              <span>{lang.label}</span>
              {selectedLang === lang.code && (
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500"></span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}