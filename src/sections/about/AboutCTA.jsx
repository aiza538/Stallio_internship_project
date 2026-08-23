// src/sections/about/AboutCTA.jsx
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom"; // ✅ Missing import added here!
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

export default function AboutCTA() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">

      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-55 blur-sm dark:opacity-45"
        style={{
          backgroundImage: "url('/images/about_cta.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/30 via-white/10 to-white/40 dark:from-slate-900/30 dark:via-slate-900/10 dark:to-slate-900/40" />
      <div className="absolute inset-0 z-0 bg-white/0 dark:bg-slate-900/0" />

      <div className="pointer-events-none absolute -top-40 left-1/2 z-0 h-[50rem] w-[50rem] -translate-x-1/2 rounded-full bg-indigo-500/12 blur-3xl dark:bg-indigo-500/18" />
      <div className="pointer-events-none absolute -bottom-40 right-0 z-0 h-[35rem] w-[35rem] rounded-full bg-violet-500/12 blur-3xl dark:bg-violet-500/18" />
      

      <div className={`relative z-10 mx-auto max-w-content text-center scroll-reveal ${isVisible ? 'visible' : ''}`}>

        <h2 className="font-display text-4xl font-bold leading-tight text-slate-800 dark:text-white sm:text-5xl lg:text-6xl">
          {t("aboutCta.title1")} <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
            {t("aboutCta.titleHighlight")}
          </span> {t("aboutCta.title2")}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-800 dark:text-slate-100">
          {t("aboutCta.description")}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Link 
            to="/signup"
            className="group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-10 py-4 text-base font-semibold text-white shadow-2xl shadow-indigo-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/40 hover:brightness-110 dark:shadow-indigo-500/20"
          >
            {t("aboutCta.startFree")}
            <ArrowRight className="h-5 w-5" />
          </Link>
          <a 
            href="#contact" 
            className="group inline-flex items-center gap-2.5 rounded-2xl border-2 border-slate-200/60 bg-white/60 px-10 py-4 text-base font-semibold text-slate-700 backdrop-blur-sm transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50/80 hover:text-indigo-600 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-white/10 dark:bg-white/10 dark:text-slate-300 dark:hover:border-indigo-400 dark:hover:bg-white/20 dark:hover:text-indigo-400"
          >
            {t("aboutCta.contactUs")}
          </a>
        </div>
      </div>
    </section>
  );
}