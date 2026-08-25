// src/components/layout/Footer.jsx
import { Mail, Linkedin, Instagram, Facebook, X } from "lucide-react";
import { Link } from "react-router-dom"; 
import Logo from "../ui/Logo"; // ✅ Logo import same hai
import Button from "../ui/Button";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Desktop ke liye order set karna (md se upar)
  const getDesktopOrder = (section) => {
    if (!isRTL) {
      // English LTR: Logo(1), Product(2), Company(3), Contact(4)
      return { logo: 'md:order-1', product: 'md:order-2', company: 'md:order-3', contact: 'md:order-4' }[section];
    } else {
      // Arabic RTL: Contact(1), Product(2), Company(3), Logo(4) -> Right side par Logo
      return { logo: 'md:order-4', product: 'md:order-2', company: 'md:order-3', contact: 'md:order-1' }[section];
    }
  };

  // Mobile ke liye order set karna (md se neeche)
  const getMobileOrder = (section) => {
    if (!isRTL) {
      // English LTR: Logo(1), Product(2), Company(3), Contact(4)
      return { logo: 'order-1', product: 'order-2', company: 'order-3', contact: 'order-4' }[section];
    } else {
      // Arabic RTL Mobile: Logo(1) sab se upar, Product(2), Company(3), Contact(4) sab se neeche
      return { logo: 'order-1', product: 'order-2', company: 'order-3', contact: 'order-4' }[section];
    }
  };

  return (
    <footer className="relative border-t border-indigo-200/30 bg-gradient-to-br from-indigo-50/60 via-purple-50/40 to-white/80 pt-6 sm:pt-10 pb-4 sm:pb-6 transition-colors duration-300 dark:border-indigo-800/20 dark:bg-gradient-to-br dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-slate-900/80">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="grid grid-cols-2 gap-y-6 gap-x-14 sm:gap-6 lg:gap-12 md:grid-cols-4">
          
          {/* 1. LOGO COLUMN - Logo bilkul same rahega */}
          <div className={`flex flex-col gap-3 col-span-2 md:col-span-1 mb-2 sm:mb-0 
            ${getMobileOrder('logo')} 
            ${getDesktopOrder('logo')} 
            ${isRTL ? 'items-end text-right' : 'items-start text-left'}`}>
            <Logo /> {/* ✅ Logo untouched */}
            {/* RTL mein text size + bold */}
            <p className={`${isRTL ? 'text-base font-bold' : 'text-xs sm:text-sm'} text-slate-500 dark:text-slate-400 leading-relaxed max-w-[80%] sm:max-w-xs break-words`}>
              {t("footer.tagline")}
            </p>
            <div className="w-full">
              <Link to="/signup" className="w-full">
                <Button className={`w-full ${isRTL ? 'py-4 text-base font-extrabold' : 'text-sm py-3 sm:w-fit sm:text-sm sm:py-2'}`}>
                  {t("footer.getStarted")} <span className={isRTL ? 'mr-1' : 'ml-1'}>{isRTL ? '←' : '→'}</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* 2. PRODUCT COLUMN */}
          <div className={`flex flex-col gap-2 sm:gap-2 
            ${getMobileOrder('product')} 
            ${getDesktopOrder('product')} 
            ${isRTL ? 'items-end text-right' : 'items-start text-left'}`}>
            <h3 className={`${isRTL ? 'text-base font-extrabold' : 'text-sm sm:text-xs font-semibold'} uppercase tracking-wider text-slate-400 dark:text-slate-500`}>{t("footer.product")}</h3>
            <ul className={`flex flex-col gap-2 sm:gap-2 ${isRTL ? 'text-base font-bold' : 'text-sm sm:text-sm'} text-slate-600 dark:text-slate-400 break-words`}>
              <li><Link to="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">{t("footer.home")}</Link></li>
              <li><Link to="/about" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">{t("footer.about")}</Link></li>
              <li><Link to="/features" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">{t("footer.features")}</Link></li>
              <li><Link to="/pricing" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">{t("footer.pricing")}</Link></li>
            </ul>
          </div>

          {/* 3. COMPANY COLUMN */}
          <div className={`flex flex-col gap-2 sm:gap-2 
            ${getMobileOrder('company')} 
            ${getDesktopOrder('company')} 
            ${isRTL ? 'items-end text-right' : 'items-start text-left'}`}>
            <h3 className={`${isRTL ? 'text-base font-extrabold' : 'text-sm sm:text-xs font-semibold'} uppercase tracking-wider text-slate-400 dark:text-slate-500`}>{t("footer.company")}</h3>
            <ul className={`flex flex-col gap-2 sm:gap-2 ${isRTL ? 'text-base font-bold' : 'text-sm sm:text-sm'} text-slate-600 dark:text-slate-400 break-words`}>
              <li><Link to="/howitworks" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">{t("footer.howItWorks")}</Link></li>
              <li><Link to="/contact" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">{t("footer.contactLink")}</Link></li>
              <li><Link to="/careers" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">{t("footer.careers")}</Link></li>
            </ul>
          </div>

          {/* 4. CONTACT & SOCIAL COLUMN */}
          <div className={`flex flex-col gap-4 col-span-2 md:col-span-1 mt-2 sm:mt-0 
            ${getMobileOrder('contact')} 
            ${getDesktopOrder('contact')} 
            ${isRTL ? 'items-end text-right' : 'items-start text-left'}`}>
            <div className={`flex flex-row md:flex-col ${isRTL ? 'items-end' : 'items-start'} justify-between w-full gap-4`}>
              <div className={`flex flex-col gap-2 ${isRTL ? 'items-end' : 'items-start'}`}>
                <h3 className={`${isRTL ? 'text-base font-extrabold' : 'text-sm sm:text-xs font-semibold'} uppercase tracking-wider text-slate-400 dark:text-slate-500`}>{t("footer.contact")}</h3>
                <a href="mailto:contact@stallio.shop" className={`flex items-center gap-2 ${isRTL ? 'text-base font-bold' : 'text-sm sm:text-sm'} text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Mail className="h-4 w-4 sm:h-4 sm:w-4 flex-shrink-0" strokeWidth={2} />
                  {t("footer.contactEmail")}
                </a>
              </div>
              
              <div className={`flex flex-col gap-2 ${isRTL ? 'items-end' : 'items-start'}`}>
                <h3 className={`${isRTL ? 'text-base font-extrabold' : 'text-sm sm:text-xs font-semibold'} uppercase tracking-wider text-slate-400 dark:text-slate-500`}>{t("footer.social")}</h3>
                <div className={`flex gap-2 mt-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
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

        {/* Bottom Bar */}
        <div className={`mt-6 sm:mt-8 flex flex-col items-center justify-between gap-2 border-t border-indigo-200/30 pt-3 sm:pt-4 dark:border-indigo-800/20 ${isRTL ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
          <p className={`${isRTL ? 'text-sm font-bold' : 'text-xs sm:text-xs'} text-slate-400 dark:text-slate-500 text-center ${isRTL ? 'sm:text-right' : 'sm:text-left'}`}>
            &copy; 2026 Stallio, Inc. {t("footer.rights")}
          </p>
          <div className={`flex flex-wrap gap-2 sm:gap-6 ${isRTL ? 'text-sm font-bold' : 'text-xs sm:text-xs'} text-slate-400 dark:text-slate-500 justify-center ${isRTL ? 'sm:justify-start' : 'sm:justify-end'}`}>
            <Link to="/privacy" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">{t("footer.privacy")}</Link>
            <Link to="/terms" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">{t("footer.terms")}</Link>
            <Link to="/refund" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">{t("footer.refund")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}