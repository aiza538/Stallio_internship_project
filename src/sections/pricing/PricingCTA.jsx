// src/sections/pricing/PricingCTA.jsx
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

export default function PricingCTA() {
  const { ref, isVisible } = useScrollReveal();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // RTL mein Arrow flip
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24 text-center bg-white dark:bg-[#0d071a]">
      
      {/* ========== LIGHT MODE: Halka Purplish Background ========== */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-purple-100/20 via-white to-white block dark:hidden" />
      
      {/* ========== DARK MODE: Halka Purplish Background ========== */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#1d0f30]/60 via-[#120a20]/80 to-[#0d071a] hidden dark:block" />
      
      {/* ========== DARK MODE CENTER RADIAL GLOW (Width sides se kam) ========== */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[20rem] w-[12rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-2xl hidden dark:block" />
      
      <div className="pointer-events-none absolute -top-40 left-1/2 z-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-400/3" />
      <div className="pointer-events-none absolute -bottom-40 right-0 z-0 h-[30rem] w-[30rem] rounded-full bg-purple-400/8 blur-3xl dark:bg-purple-400/3" />

      {/* ✅ CSS background-image div */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40 blur-sm dark:opacity-10"
        style={{ backgroundImage: "url('/images/features_CTA.jpg')" }}
      />

      <div className={`relative z-10 mx-auto max-w-3xl scroll-reveal ${isVisible ? 'visible' : ''}`}>
        {/* Light mode text */}
        <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
          {t("pricingCTA.title1")} <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-purple-300 dark:via-purple-300 dark:to-violet-300">{t("pricingCTA.titleHighlight")}</span>
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          {t("pricingCTA.description")}
        </p>
        <div className={`mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-600 backdrop-blur-sm transition-all duration-300 hover:border-purple-400 hover:text-purple-600 dark:border-white/10 dark:bg-white/15 dark:text-slate-300 dark:hover:border-purple-400 dark:hover:bg-white/20"
          >
            {t("pricingCTA.ctaPrimary")}
          </Link>
          <Link
            to="/signup"
            className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:brightness-105 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {t("pricingCTA.ctaSecondary")} <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}