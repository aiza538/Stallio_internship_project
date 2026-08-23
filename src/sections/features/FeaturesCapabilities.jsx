// src/sections/features/FeaturesCapabilities.jsx
import { Sparkles, ArrowRight, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

export default function FeaturesCapabilities() {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useTranslation();

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24 bg-[#faf7ff] dark:bg-transparent">
      
      {/* ✅ LIGHT MODE PURPLE SHADE */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-100/40 via-transparent to-transparent dark:hidden" />

      <div className="pointer-events-none absolute -bottom-20 right-0 h-[30rem] w-[30rem] rounded-full bg-purple-400/8 blur-3xl dark:bg-purple-400/12" />
      
      {/* ✅ Content Container */}
      <div className={`relative mx-auto max-w-content scroll-reveal ${isVisible ? 'visible' : ''}`}>
        
        {/* ✅ Box (Light Mode Solid Purplish) */}
        <div className="relative mx-auto max-w-6xl rounded-[2rem] p-6 sm:p-8 shadow-xl shadow-indigo-500/5 backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10">
          
          {/* ✅ LIGHT MODE: SOLID FLAT PURPLE (Bilkul seedha) */}
          <div className="absolute inset-0 rounded-[2rem] bg-purple-100 dark:hidden" />
          
          {/* ✅ DARK MODE: BILKUL SAME (Kuch change nahi) */}
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#7c3aed] via-[#6d28d9] to-[#4f46e5] hidden dark:block" />
          
          {/* Border */}
          <div className="absolute inset-0 rounded-[2rem] border border-purple-200/60 dark:border-purple-400/30" />

          <div className="relative z-10 flex flex-col items-start">
            
            {/* ✅ Left Aligned Typography */}
            <div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-900 dark:text-white leading-tight">
                {t("featuresCapabilities.title1")} 
                <span className="block mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-700 dark:text-indigo-200">
                  {t("featuresCapabilities.titleHighlight")}
                </span>
              </h2>

              {/* ✅ Description */}
              <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-indigo-700 dark:text-indigo-100">
                {t("featuresCapabilities.description")}
              </p>
            </div>

            {/* ✅ Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              
              {/* Start Free - Light: Solid Purple, Dark: White */}
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/50 hover:brightness-110 dark:bg-none dark:bg-white dark:text-purple-700 dark:shadow-white/10 dark:hover:bg-purple-50 dark:hover:text-purple-800"
              >
                <Store className="h-4 w-4" />
                {t("featuresCapabilities.startFree")}
                <ArrowRight className="h-4 w-4" />
              </Link>

              {/* View Demo Store */}
              <Link
                to="/howitworks"
                className="inline-flex items-center justify-center rounded-full border border-slate-300/70 dark:border-white/20 bg-white/70 dark:bg-slate-800/80 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-white backdrop-blur-sm transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-300/60 hover:bg-purple-50 dark:hover:bg-slate-700/80 hover:text-purple-600 dark:hover:text-white"
              >
                {t("featuresCapabilities.viewDemo")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}