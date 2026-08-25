// src/sections/howitworks/ShipTheLink.jsx
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function ShipTheLink() {
  const { ref, isVisible } = useScrollReveal();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // RTL mein Arrow flip
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-50 blur-sm dark:opacity-40"
        style={{
          backgroundImage: "url('/images/ship_the_link.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      {/* Lighter Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/50 via-white/30 to-white/60 dark:from-slate-900/50 dark:via-slate-900/30 dark:to-slate-900/60" />
      <div className="absolute inset-0 z-0 bg-white/5 dark:bg-slate-900/5" />
      
      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 z-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-400/20" />
      <div className="pointer-events-none absolute -bottom-40 right-0 z-0 h-[30rem] w-[30rem] rounded-full bg-purple-400/12 blur-3xl dark:bg-purple-400/15" />
      
      <div className={`relative z-10 mx-auto max-w-content text-center scroll-reveal ${isVisible ? 'visible' : ''}`}>
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 self-start rounded-full border border-indigo-200/30 bg-white/80 px-4 py-1.5 text-sm font-medium text-brand-600 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-slate-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Sparkles className="h-4 w-4" strokeWidth={2} />
          {t("shipTheLink.badge")}
        </div>

        {/* Heading */}
        <h2 className="font-display text-4xl font-bold leading-tight text-slate-800 dark:text-white sm:text-5xl lg:text-6xl">
          {t("shipTheLink.title1")}{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
            {t("shipTheLink.titleHighlight")}
          </span>
        </h2>

        {/* Subheading */}
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-800 dark:text-slate-100">
          {t("shipTheLink.description")}
        </p>

        {/* CTA Buttons */}
        <div className={`mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
          {/* ✅ Start Free - Navigates to /signup */}
          <Link
            to="/signup"
            className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-colors duration-300 hover:shadow-xl hover:shadow-indigo-500/35 hover:brightness-110 dark:shadow-indigo-500/20 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {t("shipTheLink.ctaPrimary")}
            <ArrowIcon className="h-5 w-5 transition-none" />
          </Link>
          
          <a
            href="#features"
            className={`inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/80 px-8 py-3.5 text-base font-semibold text-slate-600 transition-colors duration-300 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md dark:border-white/10 dark:bg-white/15 dark:text-slate-300 dark:hover:border-indigo-400 dark:hover:bg-white/20 dark:hover:text-indigo-400 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {t("shipTheLink.ctaSecondary")}
          </a>
        </div>
      </div>
    </section>
  );
}