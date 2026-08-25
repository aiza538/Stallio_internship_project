import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { ref, isVisible } = useScrollReveal();

  // RTL mein Arrow flip
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section 
      ref={ref} 
      className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero_bg.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/70 via-white/50 to-white/80 dark:from-slate-900/70 dark:via-slate-900/50 dark:to-slate-900/80" />
      <div className="absolute inset-0 z-0 bg-white/30 dark:bg-slate-900/30" />
      
      <div className="pointer-events-none absolute -top-40 left-1/2 z-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-400/20" />
      <div className="pointer-events-none absolute -bottom-40 right-0 z-0 h-[30rem] w-[30rem] rounded-full bg-purple-400/12 blur-3xl dark:bg-purple-400/15" />
      
      <div className={`relative z-10 mx-auto max-w-content text-center scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className={`inline-flex items-center gap-2 self-start rounded-full border border-indigo-200/30 bg-white/70 px-4 py-1.5 text-sm font-medium text-brand-600 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-slate-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Sparkles className="h-4 w-4" strokeWidth={2} />
                {t("hero.trustedBy")}
            </div>

        <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl xl:text-7xl">
          {t("hero.title1")}
          <br />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
            {t("hero.title2")}
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-700 dark:text-slate-200 sm:text-xl">
          {t("hero.subtitle")}
        </p>

        <div className={`mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
          <Link
            to="/signup"
            className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-colors duration-300 hover:shadow-xl hover:shadow-indigo-500/35 hover:brightness-110 dark:shadow-indigo-500/20 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {t("hero.getStarted")}
            <ArrowIcon className="h-5 w-5 transition-none" />
          </Link>
          <Link
            to="/pricing"
            className={`inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/60 px-8 py-3.5 text-base font-semibold text-slate-600 transition-colors duration-300 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md dark:border-white/10 dark:bg-white/10 dark:text-slate-300 dark:hover:border-indigo-400 dark:hover:bg-white/15 dark:hover:text-indigo-400 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {t("hero.learnMore")}
          </Link>
        </div>

        <div className={`mt-12 flex flex-wrap items-center justify-center gap-8 text-center ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div>
            <p className="font-display text-2xl font-bold text-indigo-600 dark:text-indigo-300">10K+</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">{t("hero.activeSellers")}</p>
          </div>
          <div>
            <p className="font-display text-2xl font-bold text-purple-600 dark:text-purple-300">50K+</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">{t("hero.ordersProcessed")}</p>
          </div>
          <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400">★</span>
            ))}
            <span className={`text-sm text-slate-600 dark:text-slate-300 ${isRTL ? 'mr-2 ml-0' : 'ml-2'}`}>{t("hero.rating")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}