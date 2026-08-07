import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink transition-colors duration-300 ease-snappy hover:border-brand-400 hover:bg-brand-50 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-white/15 dark:text-white dark:hover:border-brand-400 dark:hover:bg-white/5 dark:hover:text-brand-400"
    >
      {isDark ? (
        <Sun className="h-4 w-4 transition-none" strokeWidth={2} />
      ) : (
        <Moon className="h-4 w-4 transition-none" strokeWidth={2} />
      )}
    </button>
  );
}