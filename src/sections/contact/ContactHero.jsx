// src/sections/contact/ContactHero.jsx
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

export default function ContactHero() {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useTranslation();

  return (
    <section ref={ref} className="relative overflow-hidden px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0d071a] h-screen max-h-[800px] flex items-center justify-center">
      
      {/* ========== BACKGROUND IMAGE (Light + Dark) ========== */}
      <div 
        className="absolute inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-40 blur-md"
        style={{
          backgroundImage: "url('/images/contact_hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      {/* Light mode purplish overlay (Visibility Kam) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-200/30 via-purple-100/20 to-indigo-100/30 block dark:hidden" />
      
      {/* Dark mode purplish overlay (Visibility Kam) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#2d1045]/60 via-[#150b2e]/70 to-[#0d071a]/80 hidden dark:block" />
      
      {/* ========== CENTER RADIAL CIRCULAR GLOW (Purplish) ========== */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 h-[60rem] w-[60rem] rounded-full"
        style={{
          background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.12) 0%, rgba(129, 140, 248, 0.08) 40%, rgba(15, 11, 30, 0) 70%)"
        }}
      />
      
      {/* ========== EXTRA GLOW (Subtle) ========== */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-500/15" />

      <div className={`relative z-10 mx-auto max-w-7xl text-center scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="max-w-5xl mx-auto">
          <span className="mb-4 inline-block font-mono text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">
            {t("contactHero.label")}
          </span>  
          <h1 className="font-display text-5xl font-bold text-slate-800 dark:text-white sm:text-6xl lg:text-7xl">
            {t("contactHero.title1")} <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
              {t("contactHero.titleHighlight")}
            </span>
          </h1>
          <p className="mt-6 text-xl text-slate-700 dark:text-slate-200 leading-relaxed max-w-3xl mx-auto">
            {t("contactHero.description")}
          </p>
        </div>
      </div>
    </section>
  );
}