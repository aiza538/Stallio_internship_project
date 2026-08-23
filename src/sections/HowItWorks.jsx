// src/sections/howitworks/HowItWorks.jsx
import { Store, Package, Link, ArrowRight, Zap, Clock, Sparkles } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

const STEPS_COLORS = [
  {
    bg: "from-amber-200/80 to-amber-100 dark:from-amber-900/60 dark:to-amber-800/60",
    iconBg: "bg-amber-200 text-amber-700 dark:bg-amber-800/70 dark:text-amber-400",
    numberBg: "bg-amber-500 dark:bg-amber-600",
    borderColor: "border-amber-500/70 dark:border-amber-400/60",
    glowColor: "from-amber-500/40 via-amber-400/20 to-transparent",
    dotColor: "bg-amber-500 dark:bg-amber-400",
  },
  {
    bg: "from-blue-200/80 to-blue-100 dark:from-blue-900/60 dark:to-blue-800/60",
    iconBg: "bg-blue-200 text-blue-700 dark:bg-blue-800/70 dark:text-blue-400",
    numberBg: "bg-blue-500 dark:bg-blue-600",
    borderColor: "border-blue-500/70 dark:border-blue-400/60",
    glowColor: "from-blue-500/40 via-blue-400/20 to-transparent",
    dotColor: "bg-blue-500 dark:bg-blue-400",
  },
  {
    bg: "from-purple-200/80 to-purple-100 dark:from-purple-900/60 dark:to-purple-800/60",
    iconBg: "bg-purple-200 text-purple-700 dark:bg-purple-800/70 dark:text-purple-400",
    numberBg: "bg-purple-500 dark:bg-purple-600",
    borderColor: "border-purple-500/70 dark:border-purple-400/60",
    glowColor: "from-purple-500/40 via-purple-400/20 to-transparent",
    dotColor: "bg-purple-500 dark:bg-purple-400",
  },
];

function MouseFollower({ children, className = "", borderColor = "", glowColor = "" }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

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
      className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-500 ${isHovering ? borderColor : 'border-transparent'} ${className}`}
    >
      {isHovering && (
        <div
          className={`pointer-events-none absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r ${glowColor} blur-2xl transition-all duration-200`}
          style={{ left: `${position.x}%`, top: `${position.y}%` }}
        />
      )}
      {children}
    </div>
  );
}

export default function HowItWorks() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal();
  const steps = t("howItWorks.steps", { returnObjects: true });

  return (
    // ✅ LIGHT MODE: Halka purplish shade | DARK MODE: Same
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24 bg-[#faf7ff] dark:bg-transparent">
      
      {/* ✅ LIGHT MODE PURPLE SHADE */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-100/40 via-transparent to-transparent dark:hidden" />

      <div className="pointer-events-none absolute -top-20 left-0 h-[30rem] w-[30rem] rounded-full bg-indigo-400/8 blur-3xl dark:bg-indigo-400/12" />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-[30rem] w-[30rem] rounded-full bg-violet-400/8 blur-3xl dark:bg-violet-400/12" />
      
      <div className={`relative mx-auto max-w-content scroll-reveal ${isVisible ? 'visible' : ''}`}>
        
        {/* ✅ Styling same as 2nd image (Gradient Badge) */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-indigo-500/30">
            <Sparkles className="h-3.5 w-3.5" />
            {t("howItWorks.label")}
          </div>
          <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
            {t("howItWorks.title1")} <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">{t("howItWorks.titleHighlight")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">{t("howItWorks.subtitle")}</p>
        </div>

        {/* ✅ Creative Layout: Timeline Style */}
        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3">
          
          {/* Connecting Line (Desktop Only) */}
          <div className="absolute top-12 left-[15%] right-[15%] hidden h-0.5 bg-gradient-to-r from-amber-500 via-blue-500 to-purple-500 md:block" />

          {steps.map((step, index) => {
            const color = STEPS_COLORS[index % STEPS_COLORS.length];

            return (
              <div key={index} className="relative flex flex-col items-center">
                
                {/* ✅ Creative: Step Number + Dot + Line */}
                <div className="relative z-10 mb-6">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${color.numberBg} text-lg font-bold text-white shadow-lg`}>
                    {index + 1}
                  </div>
                  <div className={`absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full ${color.dotColor}`} />
                </div>

                {/* Glass Card */}
                <MouseFollower
                  borderColor={color.borderColor}
                  glowColor={color.glowColor}
                  className={`w-full bg-gradient-to-br ${color.bg} p-6 shadow-xl shadow-indigo-500/5 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 dark:shadow-indigo-500/10 backdrop-blur-md`}
                >
                  <div className="relative flex flex-col items-center justify-center text-center">
                    
                    {/* ✅ Creative: Icon Bade aur Circle mein */}
                    <div className={`inline-flex rounded-full ${color.iconBg} p-4 transition-all duration-300 group-hover:scale-110`}>
                      {index === 0 && <Store className="h-10 w-10" />}
                      {index === 1 && <Package className="h-10 w-10" />}
                      {index === 2 && <Link className="h-10 w-10" />}
                    </div>

                    <h3 className="mt-4 font-display text-xl font-bold text-slate-800 dark:text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{step.description}</p>
                    
                    {/* ✅ Creative: Highlight Badge with Border */}
                    <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border-2 border-indigo-200/50 bg-white/50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-800/30 dark:bg-indigo-950/20 dark:text-indigo-300">
                      <Zap className="h-3 w-3" />{step.highlight}
                    </div>
                  </div>
                </MouseFollower>

                {/* Creative: Arrow between cards */}
                {index < steps.length - 1 && (
                  <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 md:block">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg dark:bg-slate-800">
                      <ArrowRight className="h-4 w-4 text-indigo-500 dark:text-indigo-400" strokeWidth={2.5} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{t("howItWorks.footerText")}</p>
        </div>
      </div>
    </section>
  );
}