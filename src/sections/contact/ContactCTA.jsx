// src/sections/contact/ContactCTA.jsx
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

export default function ContactCTA() {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useTranslation();

  return (
    <section 
      ref={ref} 
      className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-20 bg-white dark:bg-[#0d071a]"
    >
      {/* ========== LIGHT MODE PURPLE SHADE ========== */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-purple-100/40 via-transparent to-transparent block dark:hidden" />

      {/* ========== DARK MODE CENTER RADIAL GLOW ========== */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 hidden dark:block"
        style={{
          background: "radial-gradient(circle at center, rgba(129, 140, 248, 0.3) 0%, rgba(139, 92, 246, 0.15) 45%, rgba(15, 11, 30, 0) 75%)"
        }}
      />
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[35rem] w-[35rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/15 blur-3xl dark:bg-purple-500/20" />

      <div className={`relative z-10 mx-auto max-w-5xl scroll-reveal ${isVisible ? 'visible' : ''}`}>
        
        {/* ========== MAIN BOX (Same as FeaturesCapabilities) ========== */}
        <div className="relative mx-auto max-w-6xl rounded-[2rem] p-6 sm:p-8 shadow-xl shadow-indigo-500/5 backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10">
          
          {/* Light Mode: Solid Flat Purple */}
          <div className="absolute inset-0 rounded-[2rem] bg-purple-100 dark:hidden" />
          
          {/* Dark Mode: Deep Purple Gradient */}
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#7c3aed] via-[#6d28d9] to-[#4f46e5] hidden dark:block" />
          
          {/* Border */}
          <div className="absolute inset-0 rounded-[2rem] border border-purple-200/60 dark:border-purple-400/30" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
            
            {/* LEFT SIDE: Text Content */}
            <div className="text-left max-w-lg">
              <div className="inline-flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-200" />
                <p className="text-sm font-semibold tracking-wide text-purple-600 dark:text-purple-200 uppercase">
                  {t("contactCTA.label")}
                </p>
              </div>
              <h2 className="font-display text-3xl font-bold text-purple-900 dark:text-white sm:text-4xl mb-3">
                {t("contactCTA.title1")} <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
                {t("contactCTA.titleHighlight")}
              </span>
              </h2>
              <p className="text-base text-indigo-700 dark:text-indigo-200">
                {t("contactCTA.description")}
              </p>
            </div>

            {/* RIGHT SIDE: Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              
              {/* Button 1: How It Works */}
              <Link
                to="/howitworks"
                className="inline-flex items-center justify-center rounded-full border border-slate-300/70 dark:border-white/20 bg-white/70 dark:bg-slate-800/80 px-8 py-3.5 text-sm font-semibold text-slate-700 dark:text-white backdrop-blur-sm transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-300/60 hover:bg-purple-50 dark:hover:bg-slate-700/80 hover:text-purple-600 dark:hover:text-white"
              >
                {t("contactCTA.howItWorks")}
              </Link>

              {/* Button 2: Features */}
              <Link
                to="/features"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/50 hover:brightness-110 dark:bg-none dark:bg-white dark:text-purple-700 dark:shadow-white/10 dark:hover:bg-purple-50 dark:hover:text-purple-800"
              >
                {t("contactCTA.features")} <ArrowRight className="h-4 w-4" />
              </Link>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}