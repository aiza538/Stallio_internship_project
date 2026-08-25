// src/sections/features/BeforeAfter.jsx
import { X, Check, ArrowRight, ArrowLeft, AlertCircle, Sparkles } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

function MouseFollower({ children, className = "", color = "indigo" }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  const colorMap = {
    red: "from-red-500/40 via-red-400/20 to-transparent",
    green: "from-green-500/40 via-green-400/20 to-transparent",
    indigo: "from-indigo-500/40 via-indigo-400/20 to-transparent",
  };

  const borderColorMap = {
    red: "border-red-400/60 dark:border-red-500/50",
    green: "border-green-400/60 dark:border-green-500/50",
    indigo: "border-indigo-400/60 dark:border-indigo-500/50",
  };

  const hoverBorderColorMap = {
    red: "hover:border-red-500/80 dark:hover:border-red-400/80",
    green: "hover:border-green-500/80 dark:hover:border-green-400/80",
    indigo: "hover:border-indigo-500/80 dark:hover:border-indigo-400/80",
  };

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setPosition({ x, y });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`relative overflow-hidden rounded-2xl border-2 ${borderColorMap[color]} ${hoverBorderColorMap[color]} transition-all duration-500 ${className}`}
    >
      {isHovering && (
        <div
          className={`pointer-events-none absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r ${colorMap[color]} blur-2xl transition-all duration-200`}
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
          }}
        />
      )}
      {children}
    </div>
  );
}

export default function BeforeAfter() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { ref, isVisible } = useScrollReveal();

  const beforeItems = t("beforeAfter.beforeItems", { returnObjects: true });
  const afterItems = t("beforeAfter.afterItems", { returnObjects: true });

  // RTL mein Arrow flip
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24 bg-[#faf7ff] dark:bg-transparent">
      
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-100/40 via-transparent to-transparent dark:hidden" />

      <div className="pointer-events-none absolute -top-20 left-0 h-[30rem] w-[30rem] rounded-full bg-indigo-400/8 blur-3xl dark:bg-indigo-400/12" />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-[30rem] w-[30rem] rounded-full bg-violet-400/8 blur-3xl dark:bg-violet-400/12" />

      <div className={`relative mx-auto max-w-content scroll-reveal ${isVisible ? 'visible' : ''}`}>
        
        <div className="mb-12 text-center">
          <div className={`mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-indigo-500/30 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Sparkles className="h-3.5 w-3.5" />
            {t("beforeAfter.beforeLabel")}
          </div>
          <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
            {t("beforeAfter.title")} <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
            {t("beforeAfter.titleHighlight")}
          </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            {t("beforeAfter.subtitle")}
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2">
          
          {/* Desktop Center Gradient Arrow - RTL mein flip */}
          <div className="absolute top-1/2 left-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xl shadow-indigo-500/30">
              <ArrowIcon className="h-6 w-6 text-white" />
            </div>
          </div>

          {/* BEFORE BOX */}
          <MouseFollower 
            color="red" 
            className="bg-gradient-to-br from-red-100/80 to-red-200/40 p-8 shadow-xl shadow-red-500/5 hover:shadow-2xl hover:shadow-red-500/20 dark:from-red-900/50 dark:to-red-800/40 dark:shadow-red-500/10"
          >
            <div className="relative">
              <div className={`mb-6 flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30 transition-all duration-300 group-hover:scale-110">
                  <X className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold text-red-700 dark:text-red-400">
                  {t("beforeAfter.withoutStallio")}
                </h3>
              </div>
              
              <div className={`relative space-y-4 ${isRTL ? 'pr-6 pl-0' : 'pl-6'}`}>
                <div className={`absolute top-2 bottom-2 w-0.5 bg-gradient-to-b from-red-500/60 to-red-500/20 ${isRTL ? 'right-0' : 'left-0'}`} />
                {beforeItems.map((item, index) => (
                  <li key={index} className={`relative flex items-start gap-3 text-slate-700 dark:text-slate-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`absolute top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white shadow-md ${isRTL ? '-right-6' : '-left-6'}`}>
                      {index + 1}
                    </div>
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </div>
            </div>
          </MouseFollower>

          {/* AFTER BOX */}
          <MouseFollower 
            color="green" 
            className="bg-gradient-to-br from-green-100/80 to-green-200/40 p-8 shadow-xl shadow-green-500/5 hover:shadow-2xl hover:shadow-green-500/20 dark:from-green-900/50 dark:to-green-800/40 dark:shadow-green-500/10"
          >
            <div className="relative">
              <div className={`mb-6 flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/30 transition-all duration-300 group-hover:scale-110">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold text-green-700 dark:text-green-400">
                  {t("beforeAfter.withStallio")}
                </h3>
              </div>
              
              <div className={`relative space-y-4 ${isRTL ? 'pr-6 pl-0' : 'pl-6'}`}>
                <div className={`absolute top-2 bottom-2 w-0.5 bg-gradient-to-b from-green-500/60 to-green-500/20 ${isRTL ? 'right-0' : 'left-0'}`} />
                {afterItems.map((item, index) => (
                  <li key={index} className={`relative flex items-start gap-3 text-slate-700 dark:text-slate-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`absolute top-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[8px] font-bold text-white shadow-md ${isRTL ? '-right-6' : '-left-6'}`}>
                      {index + 1}
                    </div>
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </div>
            </div>
          </MouseFollower>
        </div>

        {/* Bottom Legend */}
        <div className={`mt-10 flex items-center justify-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
            <div className="h-3 w-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-lg shadow-red-500/30" />
            <span>{t("beforeAfter.confusing")}</span>
          </div>
          <ArrowIcon className="h-5 w-5 text-indigo-400" />
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
            <div className="h-3 w-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 shadow-lg shadow-green-500/30" />
            <span>{t("beforeAfter.clearSimple")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}