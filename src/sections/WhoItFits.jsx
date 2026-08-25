// src/sections/howitworks/WhoItFits.jsx
import { Home, ShoppingBag, Shirt, HandMetal, Store as StoreIcon, Sparkles } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

// ✅ Colors (Har card ka alag color)
const AUDIENCE_COLORS = [
  { bg: "from-amber-200/80 to-amber-100 dark:from-amber-900/60 dark:to-amber-800/60", iconBg: "bg-amber-200 text-amber-700 dark:bg-amber-800/70 dark:text-amber-400", borderColor: "border-amber-500/70 dark:border-amber-400/60", glowColor: "from-amber-500/40 via-amber-400/20 to-transparent", dotColor: "bg-amber-500 dark:bg-amber-400" },
  { bg: "from-pink-200/80 to-pink-100 dark:from-pink-900/60 dark:to-pink-800/60", iconBg: "bg-pink-200 text-pink-700 dark:bg-pink-800/70 dark:text-pink-400", borderColor: "border-pink-500/70 dark:border-pink-400/60", glowColor: "from-pink-500/40 via-pink-400/20 to-transparent", dotColor: "bg-pink-500 dark:bg-pink-400" },
  { bg: "from-indigo-200/80 to-indigo-100 dark:from-indigo-900/60 dark:to-indigo-800/60", iconBg: "bg-indigo-200 text-indigo-700 dark:bg-indigo-800/70 dark:text-indigo-400", borderColor: "border-indigo-500/70 dark:border-indigo-400/60", glowColor: "from-indigo-500/40 via-indigo-400/20 to-transparent", dotColor: "bg-indigo-500 dark:bg-indigo-400" },
  { bg: "from-emerald-200/80 to-emerald-100 dark:from-emerald-900/60 dark:to-emerald-800/60", iconBg: "bg-emerald-200 text-emerald-700 dark:bg-emerald-800/70 dark:text-emerald-400", borderColor: "border-emerald-500/70 dark:border-emerald-400/60", glowColor: "from-emerald-500/40 via-emerald-400/20 to-transparent", dotColor: "bg-emerald-500 dark:bg-emerald-400" },
  { bg: "from-violet-200/80 to-violet-100 dark:from-violet-900/60 dark:to-violet-800/60", iconBg: "bg-violet-200 text-violet-700 dark:bg-violet-800/70 dark:text-violet-400", borderColor: "border-violet-500/70 dark:border-violet-400/60", glowColor: "from-violet-500/40 via-violet-400/20 to-transparent", dotColor: "bg-violet-500 dark:bg-violet-400" },
];

const AUDIENCE_ICONS = [Home, ShoppingBag, Shirt, HandMetal, StoreIcon];

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

export default function WhoItFits() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { ref, isVisible } = useScrollReveal();
  const audience = t("whoItFits.audience", { returnObjects: true });

  return (
    // ✅ LIGHT MODE: Halka purplish shade | DARK MODE: Same
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24 bg-[#faf7ff] dark:bg-transparent">
      
      {/* ✅ LIGHT MODE PURPLE SHADE */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-100/40 via-transparent to-transparent dark:hidden" />

      <div className="pointer-events-none absolute -top-20 right-0 h-[30rem] w-[30rem] rounded-full bg-purple-400/8 blur-3xl dark:bg-purple-400/12" />
      
      <div className={`relative mx-auto max-w-content scroll-reveal ${isVisible ? 'visible' : ''}`}>
        
        {/* 🔥 Creative Header */}
        <div className="mb-12 text-center">
          <div className={`mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-purple-500/30 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Sparkles className="h-3.5 w-3.5" />
            {t("whoItFits.label")}
          </div>
          <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
            {t("whoItFits.title1")} <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">{t("whoItFits.titleHighlight")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600 dark:text-slate-300">
            {t("whoItFits.subtitle")}
          </p>
        </div>

        {/* ✅ Equal Height Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {audience.map((item, index) => {
            const color = AUDIENCE_COLORS[index % AUDIENCE_COLORS.length];
            const Icon = AUDIENCE_ICONS[index % AUDIENCE_ICONS.length];

            return (
              <div key={index} className="relative h-full">
                
                {/* Creative: Top Color Dot - RTL mein flip */}
                <div className={`absolute -top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full ${color.dotColor} shadow-md ${isRTL ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'}`} />

                {/* Equal Height MouseFollower */}
                <MouseFollower
                  borderColor={color.borderColor}
                  glowColor={color.glowColor}
                  className={`h-full bg-gradient-to-br ${color.bg} p-6 rounded-2xl shadow-xl shadow-indigo-500/5 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 dark:shadow-indigo-500/10`}
                >
                  <div className="relative flex h-full flex-col items-center text-center">
                    
                    {/* Big Circular Icon */}
                    <div className={`flex h-16 w-16 items-center justify-center rounded-full ${color.iconBg} transition-all duration-300 group-hover:scale-110 shadow-lg`}>
                      <Icon className="h-8 w-8" />
                    </div>

                    <h3 className="mt-5 font-display text-lg font-semibold text-slate-800 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {item.description}
                    </p>
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