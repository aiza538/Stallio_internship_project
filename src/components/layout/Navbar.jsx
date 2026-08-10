// src/components/layout/Navbar.jsx
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Home as HomeIcon, Info, ListChecks, Zap, CreditCard, Mail, LogIn, UserPlus } from "lucide-react";
import Button from "../ui/Button";
import ThemeToggle from "../ui/ThemeToggle";
import LanguageSwitcher from "../ui/LanguageSwitcher";

const NAV_LINKS = [
  { label: "Home", to: "/", icon: HomeIcon, isRoute: true },
  { label: "About", to: "/about", icon: Info, isRoute: true },
  { label: "How It Works", to: "#", icon: ListChecks, isRoute: false },
  { label: "Features", to: "/features", icon: Zap, isRoute: true },
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
    "group/link relative flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-2 text-xs font-medium transition-all duration-300 ease-snappy";
  const inactiveLinkClasses =
    "text-slate-600 hover:bg-indigo-50 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-brand-400";
  const activeLinkClasses =
    "bg-indigo-50 text-brand-600 shadow-sm shadow-brand-500/10 dark:bg-white/10 dark:text-brand-400";

  return (
    <header className="sticky top-0 z-50 border-b border-indigo-200/30 bg-gradient-to-br from-indigo-50/60 via-purple-50/40 to-white/80 backdrop-blur-md transition-colors duration-300 dark:border-indigo-800/20 dark:bg-gradient-to-br dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-slate-900/80">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-purple-500/6 to-transparent dark:from-indigo-400/15 dark:via-purple-400/8" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-400/15" />

      <nav className="relative mx-auto flex max-w-content items-center justify-between gap-4 px-5 py-3.5 lg:px-6">
        
        {/* ✅ SIRF YAHAN 2 CHANGES KIYE HAIN. BAKI SAB WAISA HI */}
        <a href="/" className="flex items-center gap-2.5 no-underline">
          <img src="/Stallio_Logo.png" alt="Stallio" className="h-8 w-auto block" />
          {/* Size theek kiya aur text ko ekdum center lane ke liye mt-1 lagaya */}
          <span 
            className="text-2xl tracking-wide text-slate-800 dark:text-white mt-1"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Stallio
          </span>
        </a>
        {/* ✅ LOGO ENDS HERE */}

        {/* Desktop Links */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map(({ label, to, icon: Icon, isRoute }) => {
            if (!isRoute) {
              return (
                <a key={label} href={to} className={`${baseLinkClasses} ${inactiveLinkClasses}`}>
                  <Icon className="h-3.5 w-3.5 transition-none" strokeWidth={2} />
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
                <Icon className="h-3.5 w-3.5 transition-none" strokeWidth={2} />
                {label}
              </NavLink>
            );
          })}
        </div>

        {/* Right Controls */}
        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher />
          <div className="h-5 w-px bg-indigo-200/30 dark:bg-white/10" />
          <ThemeToggle />
          <Button 
            as="a" 
            href="#login" 
            variant="outline" 
            className="text-xs transition-colors duration-300 hover:bg-indigo-50 hover:text-brand-600 hover:border-brand-400 dark:hover:bg-white/10 dark:hover:text-brand-400"
          >
            <LogIn className="h-3.5 w-3.5 transition-none" strokeWidth={2} />
            Log In
          </Button>
          <Button 
            as="a" 
            href="#start-free" 
            className="text-xs transition-colors duration-300 hover:brightness-110"
          >
            <UserPlus className="h-3.5 w-3.5 transition-none" strokeWidth={2} />
            Start Free
          </Button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition-colors duration-300 hover:bg-indigo-50 dark:text-white dark:hover:bg-white/10"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="relative block h-4 w-5">
              <span className={`absolute left-0 h-0.5 w-5 bg-current transition-transform duration-300 ${isOpen ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-opacity duration-200 ${isOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute left-0 h-0.5 w-5 bg-current transition-transform duration-300 ${isOpen ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Panel */}
      <div className={`relative overflow-hidden border-t border-indigo-200/30 bg-gradient-to-br from-indigo-50/60 via-purple-50/40 to-white/80 transition-[max-height] duration-300 ease-snappy dark:border-indigo-800/20 dark:bg-gradient-to-br dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-slate-900/80 lg:hidden ${isOpen ? "max-h-[28rem]" : "max-h-0"}`}>
        <div className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map(({ label, to, icon: Icon, isRoute }) => {
            const mobileBase = "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-300";
            const mobileInactive = "text-slate-600 hover:bg-indigo-50 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-brand-400";
            const mobileActive = "bg-indigo-50 text-brand-600 dark:bg-white/10 dark:text-brand-400";

            if (!isRoute) {
              return (
                <a key={label} href={to} onClick={() => setIsOpen(false)} className={`${mobileBase} ${mobileInactive}`}>
                  <Icon className="h-4 w-4 transition-none" strokeWidth={2} />
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
                className={({ isActive }) => `${mobileBase} ${isActive ? mobileActive : mobileInactive}`}
              >
                <Icon className="h-4 w-4 transition-none" strokeWidth={2} />
                {label}
              </NavLink>
            );
          })}

          <div className="mt-3 flex items-center justify-between border-t border-indigo-200/30 pt-4 dark:border-indigo-800/20">
            <LanguageSwitcher />
          </div>

          <div className="mt-2 flex flex-col gap-2">
            <Button as="a" href="#login" variant="outline" className="w-full text-xs transition-colors duration-300 hover:bg-indigo-50 hover:text-brand-600 hover:border-brand-400 dark:hover:bg-white/10 dark:hover:text-brand-400">
              <LogIn className="h-4 w-4 transition-none" strokeWidth={2} />
              Log In
            </Button>
            <Button as="a" href="#start-free" className="w-full text-xs transition-colors duration-300 hover:brightness-110">
              <UserPlus className="h-4 w-4 transition-none" strokeWidth={2} />
              Start Free
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}