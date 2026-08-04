import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Home as HomeIcon, Info, ListChecks, Zap, CreditCard, Mail, LogIn, UserPlus } from "lucide-react";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import ThemeToggle from "../ui/ThemeToggle";
import LanguageSwitcher from "../ui/LanguageSwitcher";

// "Home" and "About" are real routes built this week.
// The rest are placeholders so the full nav matches the brand today —
// wire them up to real routes/pages as they're built in later days.
const NAV_LINKS = [
  { label: "Home", to: "/", icon: HomeIcon, isRoute: true },
  { label: "About", to: "/about", icon: Info, isRoute: true },
  { label: "How It Works", to: "#", icon: ListChecks, isRoute: false },
  { label: "Features", to: "#", icon: Zap, isRoute: false },
  { label: "Pricing", to: "#", icon: CreditCard, isRoute: false },
  { label: "Contact", to: "#", icon: Mail, isRoute: false },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const baseLinkClasses =
    "group/link relative flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium transition-all duration-300 ease-snappy";
  const inactiveLinkClasses =
    "text-slate-muted hover:bg-brand-50 hover:text-brand-600 dark:text-slate-light dark:hover:bg-white/5 dark:hover:text-brand-400";
  const activeLinkClasses =
    "bg-brand-50 text-brand-600 shadow-sm shadow-brand-500/10 dark:bg-white/10 dark:text-brand-400";

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-gradient-to-b from-white via-slate-50/50 to-white backdrop-blur-md transition-colors duration-300 dark:border-white/10 dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900">
      {/* Background glow - same as content area */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-500/5 via-transparent to-transparent dark:from-brand-400/5" />
      
      {/* Secondary subtle glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-500/5 blur-3xl dark:bg-brand-400/5" />

      <nav
        className="relative mx-auto flex max-w-content items-center justify-between gap-2 px-5 py-3.5 lg:px-6"
        aria-label="Primary"
      >
        <Logo />

        {/* Desktop links */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map(({ label, to, icon: Icon, isRoute }) => {
            if (!isRoute) {
              return (
                <a key={label} href={to} className={`${baseLinkClasses} ${inactiveLinkClasses}`}>
                  <Icon className="h-4 w-4 transition-transform duration-300 ease-snappy group-hover/link:scale-110" strokeWidth={2} />
                  {label}
                </a>
              );
            }

            return (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
                }
              >
                <Icon className="h-4 w-4 transition-transform duration-300 ease-snappy group-hover/link:scale-110" strokeWidth={2} />
                {label}
              </NavLink>
            );
          })}
        </div>

        {/* Right controls (desktop) */}
        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher />
          <div className="h-6 w-px bg-ink/10 dark:bg-white/10" />
          <ThemeToggle />
          <Button as="a" href="#login" variant="outline">
            <LogIn className="h-4 w-4" strokeWidth={2} />
            Log In
          </Button>
          <Button as="a" href="#start-free">
            <UserPlus className="h-4 w-4" strokeWidth={2} />
            Start Free
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors duration-300 hover:bg-ink/5 dark:text-white dark:hover:bg-white/10"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 h-0.5 w-5 bg-current transition-transform duration-300 ease-snappy ${
                  isOpen ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-opacity duration-200 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 bg-current transition-transform duration-300 ease-snappy ${
                  isOpen ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div
        className={`relative overflow-hidden border-t border-ink/10 bg-gradient-to-b from-white via-slate-50/50 to-white transition-[max-height] duration-300 ease-snappy dark:border-white/10 dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 lg:hidden ${
          isOpen ? "max-h-[28rem]" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map(({ label, to, icon: Icon, isRoute }) => {
            const mobileBase =
              "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-300";
            const mobileInactive =
              "text-slate-muted hover:bg-brand-50 hover:text-brand-600 dark:text-slate-light dark:hover:bg-white/5 dark:hover:text-brand-400";
            const mobileActive =
              "bg-brand-50 text-brand-600 dark:bg-white/10 dark:text-brand-400";

            if (!isRoute) {
              return (
                <a
                  key={label}
                  href={to}
                  onClick={() => setIsOpen(false)}
                  className={`${mobileBase} ${mobileInactive}`}
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                  {label}
                </a>
              );
            }

            return (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${mobileBase} ${isActive ? mobileActive : mobileInactive}`
                }
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
                {label}
              </NavLink>
            );
          })}

          <div className="mt-3 flex items-center justify-between border-t border-ink/10 pt-4 dark:border-white/10">
            <LanguageSwitcher />
          </div>

          <div className="mt-2 flex flex-col gap-2">
            <Button as="a" href="#login" variant="outline" className="w-full">
              <LogIn className="h-4 w-4" strokeWidth={2} />
              Log In
            </Button>
            <Button as="a" href="#start-free" className="w-full">
              <UserPlus className="h-4 w-4" strokeWidth={2} />
              Start Free
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}