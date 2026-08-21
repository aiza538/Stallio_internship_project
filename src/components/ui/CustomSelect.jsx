// src/components/ui/CustomSelect.jsx
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Globe } from "lucide-react";

// ✅ prop add kiya: onOpenChange
export default function CustomSelect({ options, value, onChange, placeholder = "Select country", className = "", onOpenChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // ✅ Open state change hone par parent ko notify karein
  const toggleOpen = (newState) => {
    setIsOpen(newState);
    if (onOpenChange) onOpenChange(newState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) toggleOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => toggleOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl border border-slate-300/50 bg-white/80 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50/50 dark:border-slate-600/50 dark:bg-slate-800/50 dark:text-white dark:hover:border-indigo-500 dark:hover:bg-slate-700/50"
      >
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
          <span>{selectedOption ? selectedOption.label : placeholder}</span>
        </div>
        <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-60 overflow-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-slate-700 dark:bg-slate-800">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                toggleOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                value === option.value
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300"
                  : "text-slate-700 hover:bg-slate-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-700/50"
              }`}
            >
              <span>{option.label}</span>
              {value === option.value && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}