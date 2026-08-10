import { Mail } from "lucide-react";
import { Link } from "react-router-dom"; 
import Button from "../ui/Button";

export default function Footer() {
  return (
    <footer className="relative border-t border-indigo-200/30 bg-gradient-to-br from-indigo-50/60 via-purple-50/40 to-white/80 pt-16 pb-8 transition-colors duration-300 dark:border-indigo-800/20 dark:bg-gradient-to-br dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-slate-900/80">
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          
          {/* Branding Column */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            {/* ✅ FIX: mt-1 add kiya taake text exact center mein aa jaye */}
            <div className="flex items-center gap-2.5">
              <img src="/Stallio_Logo.png" alt="Stallio" className="h-8 w-auto" />
              <span 
                className="text-2xl text-slate-800 dark:text-white transition-colors duration-300 mt-1"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                Stallio
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
              One link for your catalog and orders, so customers know where to buy and you stay organized.
            </p>
            <div className="mt-2">
              <Link to="/#start-free">
                <Button as="div" className="w-fit text-sm">
                  Get Started Free <span className="ml-1">→</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">PRODUCT</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">About</Link></li>
              <li><Link to="/features" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">COMPANY</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/how-it-works" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">How It Works</Link></li>
              <li><Link to="/contact" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">CONTACT</h3>
            <a href="mailto:contact@stallio.shop" className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
              <Mail className="h-4 w-4" strokeWidth={2} />
              contact@stallio.shop
            </a>
            <div className="flex gap-2.5 mt-1">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-indigo-200/50 text-slate-500 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-600 dark:border-indigo-800/30 dark:text-slate-400 dark:hover:border-brand-500 dark:hover:bg-brand-500/10 dark:hover:text-brand-400">
                <span className="text-xs font-medium">X</span>
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-indigo-200/50 text-slate-500 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-600 dark:border-indigo-800/30 dark:text-slate-400 dark:hover:border-brand-500 dark:hover:bg-brand-500/10 dark:hover:text-brand-400">
                <span className="text-xs font-medium">in</span>
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-indigo-200/50 text-slate-500 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-600 dark:border-indigo-800/30 dark:text-slate-400 dark:hover:border-brand-500 dark:hover:bg-brand-500/10 dark:hover:text-brand-400">
                <span className="text-xs font-medium">gh</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-indigo-200/30 pt-8 dark:border-indigo-800/20 sm:flex-row">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            &copy; 2026 Stallio, Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 text-xs text-slate-400 dark:text-slate-500">
            <Link to="/privacy" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Terms of Service</Link>
            <Link to="/refund" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}