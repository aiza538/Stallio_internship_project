// src/sections/FinalCTA.jsx
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

export default function FinalCTA() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { ref, isVisible } = useScrollReveal();

  // RTL mein Arrow flip
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-70 blur-sm dark:opacity-60"
        style={{
          backgroundImage: "url('/images/ready_to_launch.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/40 via-white/20 to-white/50 dark:from-slate-900/40 dark:via-slate-900/20 dark:to-slate-900/50" />
      <div className="absolute inset-0 z-0 bg-white/5 dark:bg-slate-900/5" />
      
      <div className="pointer-events-none absolute -top-40 left-1/2 z-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-400/20" />
      <div className="pointer-events-none absolute -bottom-40 right-0 z-0 h-[30rem] w-[30rem] rounded-full bg-purple-400/12 blur-3xl dark:bg-purple-400/15" />
      
      <div className={`relative z-10 mx-auto max-w-content text-center scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className={`inline-flex items-center gap-2 self-start rounded-full border border-indigo-200/30 bg-white/70 px-4 py-1.5 text-sm font-medium text-brand-600 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-slate-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Sparkles className="h-4 w-4" strokeWidth={2} />
                {t("finalCta.startJourney")}
            </div>

        <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl lg:text-5xl">
          {t("finalCta.title1")}{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
            {t("finalCta.titleHighlight")}
          </span>{' '}
          {t("finalCta.title2")}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-700 dark:text-slate-200">
          {t("finalCta.subtitle")}
        </p>

        <div className={`mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
          <Link
            to="/signup"
            className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-colors duration-300 hover:shadow-xl hover:shadow-indigo-500/35 hover:brightness-110 dark:from-indigo-500 dark:to-violet-500 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {t("finalCta.startFreeTrial")}
            <ArrowIcon className="h-5 w-5 transition-none" />
          </Link>
          
          {/* ✅ Login Button - Width wise increase (min-w-[140px]) */}
          <Link
            to="/login"
            className={`inline-flex items-center justify-center gap-2 rounded-full border border-slate-200/60 bg-white/60 min-w-[140px] px-8 py-3.5 text-base font-semibold text-slate-600 transition-colors duration-300 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md dark:border-white/10 dark:bg-white/10 dark:text-slate-300 dark:hover:border-indigo-400 dark:hover:bg-white/15 dark:hover:text-indigo-400 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {t("finalCta.login")}
          </Link>
        </div>

        <div className={`mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600 dark:text-slate-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`inline-flex items-center gap-2 self-start rounded-full border border-indigo-200/30 bg-white/70 px-4 py-1.5 text-sm font-medium text-brand-600 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-slate-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Sparkles className="h-4 w-4" strokeWidth={2} />
                {t("finalCta.noCard")}
            </div>
            <div className={`inline-flex items-center gap-2 self-start rounded-full border border-indigo-200/30 bg-white/70 px-4 py-1.5 text-sm font-medium text-brand-600 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-slate-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Sparkles className="h-4 w-4" strokeWidth={2} />
                {t("finalCta.freeDays")}
            </div>
            <div className={`inline-flex items-center gap-2 self-start rounded-full border border-indigo-200/30 bg-white/70 px-4 py-1.5 text-sm font-medium text-brand-600 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-slate-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Sparkles className="h-4 w-4" strokeWidth={2} />
                {t("finalCta.cancelAnytime")}
            </div>
        </div>
      </div>
    </section>
  );
}