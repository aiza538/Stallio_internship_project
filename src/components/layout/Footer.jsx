import { Mail } from "lucide-react";
import { Link } from "react-router-dom"; 
import Logo from "../ui/Logo";
import Button from "../ui/Button";

export default function Footer() {
  return (
    <footer className="relative border-t border-indigo-200/30 bg-gradient-to-br from-indigo-50/60 via-purple-50/40 to-white/80 pt-6 sm:pt-16 pb-4 sm:pb-8 transition-colors duration-300 dark:border-indigo-800/20 dark:bg-gradient-to-br dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-slate-900/80">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* ✅ HEIGHT CHHOTI KI: Mobile par gap aur margin aur kam kar diya */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-2 sm:gap-6 md:grid-cols-4 lg:gap-10">
          
          {/* Branding Column */}
          <div className="flex flex-col gap-1.5 sm:gap-4 col-span-2 md:col-span-1 mb-1 sm:mb-0">
            <Logo />
            <p className="text-[8px] sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-[80%] sm:max-w-xs break-words">
              One link for your catalog and orders, so customers know where to buy and you stay organized.
            </p>
            <div className="mt-0 sm:mt-2">
              <Link to="/#start-free">
                <Button as="div" className="w-fit text-[8px] sm:text-sm py-0.5 sm:py-2">
                  Get Started Free <span className="ml-1">→</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div className="flex flex-col gap-1 sm:gap-4">
            <h3 className="text-[8px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">PRODUCT</h3>
            <ul className="flex flex-col gap-0.5 sm:gap-2.5 text-[8px] sm:text-sm text-slate-600 dark:text-slate-400 break-words">
              <li><Link to="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">About</Link></li>
              <li><Link to="/features" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-1 sm:gap-4">
            <h3 className="text-[8px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">COMPANY</h3>
            <ul className="flex flex-col gap-0.5 sm:gap-2.5 text-[8px] sm:text-sm text-slate-600 dark:text-slate-400 break-words">
              <li><Link to="/howitworks" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">How It Works</Link></li>
              <li><Link to="/contact" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-1 sm:gap-4 col-span-2 md:col-span-1 mt-1 sm:mt-0">
            <h3 className="text-[8px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">CONTACT</h3>
            <a href="mailto:contact@stallio.shop" className="flex items-center gap-1 text-[8px] sm:text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
              <Mail className="h-2.5 w-2.5 sm:h-4 sm:w-4" strokeWidth={2} />
              contact@stallio.shop
            </a>
            <div className="flex gap-1 sm:gap-2.5 mt-0 flex-wrap">
              <a href="#" className="flex h-6 w-6 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-indigo-200/50 text-slate-500 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-600 dark:border-indigo-800/30 dark:text-slate-400 dark:hover:border-brand-500 dark:hover:bg-brand-500/10 dark:hover:text-brand-400">
                <span className="text-[7px] sm:text-xs font-medium">X</span>
              </a>
              <a href="#" className="flex h-6 w-6 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-indigo-200/50 text-slate-500 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-600 dark:border-indigo-800/30 dark:text-slate-400 dark:hover:border-brand-500 dark:hover:bg-brand-500/10 dark:hover:text-brand-400">
                <span className="text-[7px] sm:text-xs font-medium">in</span>
              </a>
              <a href="#" className="flex h-6 w-6 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-indigo-200/50 text-slate-500 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-600 dark:border-indigo-800/30 dark:text-slate-400 dark:hover:border-brand-500 dark:hover:bg-brand-500/10 dark:hover:text-brand-400">
                <span className="text-[7px] sm:text-xs font-medium">gh</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-4 sm:mt-12 flex flex-col items-center justify-between gap-2 border-t border-indigo-200/30 pt-3 sm:pt-8 dark:border-indigo-800/20 sm:flex-row">
          <p className="text-[7px] sm:text-xs text-slate-400 dark:text-slate-500 text-center sm:text-left">
            &copy; 2026 Stallio, Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-6 text-[7px] sm:text-xs text-slate-400 dark:text-slate-500 justify-center sm:justify-end">
            <Link to="/privacy" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Terms of Service</Link>
            <Link to="/refund" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Refund Policy</Link>
            </div>
        </div>
      </div>
    </footer>
  );
}