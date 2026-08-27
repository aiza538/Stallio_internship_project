// src/sections/contact/ContactHero.jsx
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

export default function ContactHero() {
  const { ref, isVisible } = useScrollReveal();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <section ref={ref} className="relative overflow-hidden px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0d071a] min-h-[300px] sm:min-h-[350px] md:min-h-[430px] flex items-center justify-center">
      
      {/* ========== BACKGROUND IMAGE - Thora visible + Blurry ========== */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-70 blur-sm dark:opacity-60"
        style={{
          backgroundImage: "url('/images/contact_hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      {/* Light mode overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-200/40 via-purple-100/30 to-indigo-100/40 block dark:hidden" />
      
      {/* Dark mode overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#2d1045]/70 via-[#150b2e]/70 to-[#0d071a]/80 hidden dark:block" />
      
      {/* ========== CENTER RADIAL CIRCULAR GLOW ========== */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 h-[30rem] w-[30rem] rounded-full"
        style={{
          background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.10) 0%, rgba(129, 140, 248, 0.06) 40%, rgba(15, 11, 30, 0) 70%)"
        }}
      />
      
      {/* ========== EXTRA GLOW ========== */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[15rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/8 blur-3xl dark:bg-purple-500/10" />

      <div className={`relative z-10 mx-auto max-w-7xl text-center scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="max-w-5xl mx-auto">
          <span className={`mb-2 inline-block font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300 ${isRTL ? 'block' : ''}`}>
            {t("contactHero.label")}
          </span>  
          <h1 className={`font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white ${isRTL ? 'text-right' : 'text-center'}`}>
            {t("contactHero.title1")}{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
              {t("contactHero.titleHighlight")}
            </span>
          </h1>
          <p className={`mt-3 text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-200 leading-relaxed max-w-3xl mx-auto ${isRTL ? 'text-right' : 'text-center'}`}>
            {t("contactHero.description")}
          </p>
        </div>
      </div>
    </section>
  );
}