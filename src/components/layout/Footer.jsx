// src/components/layout/Footer.jsx
import { Mail, Linkedin, Instagram, Facebook, X } from "lucide-react";
import { Link } from "react-router-dom"; 
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative border-t border-indigo-200/30 bg-gradient-to-br from-indigo-50/60 via-purple-50/40 to-white/80 pt-6 sm:pt-10 pb-4 sm:pb-6 transition-colors duration-300 dark:border-indigo-800/20 dark:bg-gradient-to-br dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-slate-900/80">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="grid grid-cols-2 gap-y-6 gap-x-14 sm:gap-6 lg:gap-12 md:grid-cols-4">
          
          {/* ✅ Left side aligned Logo column */}
          <div className="flex flex-col gap-3 col-span-2 md:col-span-1 mb-2 sm:mb-0 items-start">
            <Logo />
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-[80%] sm:max-w-xs break-words text-left">
              {t("footer.tagline")}
            </p>
            <div className="w-full">
              <Link to="/signup" className="w-full">
                <Button className="w-full text-sm py-3 sm:w-fit sm:text-sm sm:py-2">
                  {t("footer.getStarted")} <span className="ml-1">→</span>
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:gap-2">
            <h3 className="text-sm sm:text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">{t("footer.product")}</h3>
            <ul className="flex flex-col gap-2 sm:gap-2 text-sm sm:text-sm text-slate-600 dark:text-slate-400 break-words">
              <li><Link to="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">{t("footer.home")}</Link></li>
              <li><Link to="/about" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">{t("footer.about")}</Link></li>
              <li><Link to="/features" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">{t("footer.features")}</Link></li>
              <li><Link to="/pricing" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">{t("footer.pricing")}</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-2 sm:gap-2">
            <h3 className="text-sm sm:text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">{t("footer.company")}</h3>
            <ul className="flex flex-col gap-2 sm:gap-2 text-sm sm:text-sm text-slate-600 dark:text-slate-400 break-words">
              <li><Link to="/howitworks" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">{t("footer.howItWorks")}</Link></li>
              <li><Link to="/contact" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">{t("footer.contactLink")}</Link></li>
              <li><Link to="/careers" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">{t("footer.careers")}</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 col-span-2 md:col-span-1 mt-2 sm:mt-0">
            <div className="flex flex-row md:flex-col items-start md:items-start justify-between w-full gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm sm:text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">{t("footer.contact")}</h3>
                <a href="mailto:contact@stallio.shop" className="flex items-center gap-2 text-sm sm:text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  <Mail className="h-4 w-4 sm:h-4 sm:w-4 flex-shrink-0" strokeWidth={2} />
                  {t("footer.contactEmail")}
                </a>
              </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="text-sm sm:text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">{t("footer.social")}</h3>
                <div className="flex gap-2 mt-1">
                  <a href="#" className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-indigo-200/50 text-slate-500 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-600 dark:border-indigo-800/30 dark:text-slate-400 dark:hover:border-brand-500 dark:hover:bg-brand-500/10 dark:hover:text-brand-400">
                    <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </a>
                  <a href="#" className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-indigo-200/50 text-slate-500 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-600 dark:border-indigo-800/30 dark:text-slate-400 dark:hover:border-brand-500 dark:hover:bg-brand-500/10 dark:hover:text-brand-400">
                    <Instagram className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </a>
                  <a href="#" className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-indigo-200/50 text-slate-500 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-600 dark:border-indigo-800/30 dark:text-slate-400 dark:hover:border-brand-500 dark:hover:bg-brand-500/10 dark:hover:text-brand-400">
                    <Facebook className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </a>
                  <a href="#" className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-indigo-200/50 text-slate-500 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-600 dark:border-indigo-800/30 dark:text-slate-400 dark:hover:border-brand-500 dark:hover:bg-brand-500/10 dark:hover:text-brand-400">
                    <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 flex flex-col items-center justify-between gap-2 border-t border-indigo-200/30 pt-3 sm:pt-4 dark:border-indigo-800/20 sm:flex-row">
          <p className="text-xs sm:text-xs text-slate-400 dark:text-slate-500 text-center sm:text-left">
            &copy; 2026 Stallio, Inc. {t("footer.rights")}
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-6 text-xs sm:text-xs text-slate-400 dark:text-slate-500 justify-center sm:justify-end">
            <Link to="/privacy" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">{t("footer.privacy")}</Link>
            <Link to="/terms" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">{t("footer.terms")}</Link>
            <Link to="/refund" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">{t("footer.refund")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}