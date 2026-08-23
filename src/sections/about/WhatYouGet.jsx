// src/sections/about/WhatYouGet.jsx
import { Sparkles, Upload, Link, LayoutDashboard, Store, Settings, Zap, Package, FileText, Truck, CheckCircle2 } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

const FEATURE_COLORS = [
  { bg: "from-indigo-200/80 to-indigo-100 dark:from-indigo-900/60 dark:to-indigo-800/60", iconBg: "bg-indigo-200 text-indigo-700 dark:bg-indigo-800/70 dark:text-indigo-400", borderColor: "border-indigo-500/70 dark:border-indigo-400/60", glowColor: "from-indigo-500/40 via-indigo-400/20 to-transparent", icon: Zap },
  { bg: "from-blue-200/80 to-blue-100 dark:from-blue-900/60 dark:to-blue-800/60", iconBg: "bg-blue-200 text-blue-700 dark:bg-blue-800/70 dark:text-blue-400", borderColor: "border-blue-500/70 dark:border-blue-400/60", glowColor: "from-blue-500/40 via-blue-400/20 to-transparent", icon: Upload },
  { bg: "from-purple-200/80 to-purple-100 dark:from-purple-900/60 dark:to-purple-800/60", iconBg: "bg-purple-200 text-purple-700 dark:bg-purple-800/70 dark:text-purple-400", borderColor: "border-purple-500/70 dark:border-purple-400/60", glowColor: "from-purple-500/40 via-purple-400/20 to-transparent", icon: Link },
  { bg: "from-rose-200/80 to-rose-100 dark:from-rose-900/60 dark:to-rose-800/60", iconBg: "bg-rose-200 text-rose-700 dark:bg-rose-800/70 dark:text-rose-400", borderColor: "border-rose-500/70 dark:border-rose-400/60", glowColor: "from-rose-500/40 via-rose-400/20 to-transparent", icon: LayoutDashboard },
  { bg: "from-emerald-200/80 to-emerald-100 dark:from-emerald-900/60 dark:to-emerald-800/60", iconBg: "bg-emerald-200 text-emerald-700 dark:bg-emerald-800/70 dark:text-emerald-400", borderColor: "border-emerald-500/70 dark:border-emerald-400/60", glowColor: "from-emerald-500/40 via-emerald-400/20 to-transparent", icon: Store },
  { bg: "from-cyan-200/80 to-cyan-100 dark:from-cyan-900/60 dark:to-cyan-800/60", iconBg: "bg-cyan-200 text-cyan-700 dark:bg-cyan-800/70 dark:text-cyan-400", borderColor: "border-cyan-500/70 dark:border-cyan-400/60", glowColor: "from-cyan-500/40 via-cyan-400/20 to-transparent", icon: Settings },
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
        <div className={`pointer-events-none absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r ${glowColor} blur-2xl transition-all duration-200`}
          style={{ left: `${position.x}%`, top: `${position.y}%` }}
        />
      )}
      {children}
    </div>
  );
}

export default function WhatYouGet() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal();
  const features = t("whatYouGet.features", { returnObjects: true });

  return (
    // ✅ LIGHT MODE: Halka purplish shade | DARK MODE: Same
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24 bg-[#faf7ff] dark:bg-transparent">
      
      {/* ✅ LIGHT MODE PURPLE SHADE */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-100/40 via-transparent to-transparent dark:hidden" />

      <div className="pointer-events-none absolute -top-20 right-0 h-[30rem] w-[30rem] rounded-full bg-indigo-400/8 blur-3xl dark:bg-indigo-400/12" />
      <div className="pointer-events-none absolute -bottom-20 left-0 h-[30rem] w-[30rem] rounded-full bg-purple-400/8 blur-3xl dark:bg-purple-400/12" />
      
      <div className={`relative mx-auto max-w-content scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-violet-500/30">
            <Sparkles className="h-3.5 w-3.5" />
            {t("whatYouGet.label")}
          </div>
          <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
            {t("whatYouGet.title1")} <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">{t("whatYouGet.titleHighlight")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">{t("whatYouGet.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const color = FEATURE_COLORS[index % FEATURE_COLORS.length];
            const Icon = color.icon;

            return (
              <div key={index} className="relative h-full">
                <div className={`absolute -top-2 -left-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-[10px] font-bold text-white shadow-md`}>
                  {index + 1}
                </div>
                <MouseFollower
                  borderColor={color.borderColor}
                  glowColor={color.glowColor}
                  className={`h-full bg-gradient-to-br ${color.bg} p-6 shadow-xl shadow-indigo-500/5 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 dark:shadow-indigo-500/10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 0.05}s` }}
                >
                  <div className="relative">
                    <div className={`inline-flex rounded-2xl ${color.iconBg} p-3 transition-all duration-300 group-hover:scale-110`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-slate-800 dark:text-white">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{feature.description}</p>
                  </div>
                </MouseFollower>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}