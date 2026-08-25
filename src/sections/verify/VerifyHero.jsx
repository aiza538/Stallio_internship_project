// src/sections/verify/VerifyHero.jsx
import { MailCheck, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

export default function VerifyHero() {
  const { ref, isVisible } = useScrollReveal();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // RTL mein Arrow flip
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24 bg-white dark:bg-[#0d071a]">
      
      {/* ========== SHADES (EXACTLY LIKE LOGIN) ========== */}
      {/* LIGHT MODE PURPLISH BACKGROUND SHADE */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/70 via-white to-white block dark:hidden" />
      
      {/* DARK MODE BACKGROUND GLOW */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2d1045] via-[#150b2e] to-[#0d071a] hidden dark:block" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl dark:bg-purple-500/10" />

      <div className={`relative z-10 mx-auto max-w-2xl text-center scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="flex justify-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50">
            <MailCheck className="h-10 w-10 text-purple-600 dark:text-purple-400" />
          </div>
        </div>

        <h1 className={`font-display font-bold text-slate-800 dark:text-white ${isRTL ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'}`}>
          {t("verifyHero.title1")} <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
            {t("verifyHero.titleHighlight")}
          </span>
        </h1>
        
        <p className={`mt-4 text-slate-600 dark:text-slate-300 ${isRTL ? 'text-xl font-bold' : 'text-base'}`}>
          {t("verifyHero.subtitle")} <strong className="text-slate-800 dark:text-white">{t("verifyHero.email")}</strong>
        </p>
        
        {/* ✅ Notification Box (Solid Purple in Light, Gradient in Dark) */}
        <div className="relative mt-6 overflow-hidden rounded-xl p-4 shadow-sm">
          {/* Light Mode: Solid Flat Purple */}
          <div className="absolute inset-0 bg-purple-100 dark:hidden" />
          
          {/* Dark Mode: Deep Purple Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed] via-[#6d28d9] to-[#4f46e5] hidden dark:block" />
          
          {/* Border */}
          <div className="absolute inset-0 rounded-xl border border-purple-200/60 dark:border-purple-400/30" />

          <div className={`relative z-10 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-lg">✉️</span>
            <p className={`text-purple-900 dark:text-white ${isRTL ? 'text-base font-bold' : 'text-sm'}`}>
              {t("verifyHero.instruction")}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Link
            to="/login"
            className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:brightness-105 ${isRTL ? 'px-8 py-4 text-base font-extrabold flex-row-reverse' : 'px-6 py-3 text-sm font-semibold'}`}
          >
            {t("verifyHero.goToLogin")} <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}