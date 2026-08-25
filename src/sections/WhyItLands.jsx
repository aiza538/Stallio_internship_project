// src/sections/about/WhyItLands.jsx
import { Shield, Zap, TrendingUp, Users, Sparkles } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

// ✅ Colors (Har card ka alag color)
const REASON_COLORS = [
  { bg: "from-amber-200/80 to-amber-100 dark:from-amber-900/60 dark:to-amber-800/60", iconBg: "bg-amber-200 text-amber-700 dark:bg-amber-800/70 dark:text-amber-400", borderColor: "border-amber-500/70 dark:border-amber-400/60", glowColor: "from-amber-500/40 via-amber-400/20 to-transparent", badge: "bg-amber-500 dark:bg-amber-600" },
  { bg: "from-blue-200/80 to-blue-100 dark:from-blue-900/60 dark:to-blue-800/60", iconBg: "bg-blue-200 text-blue-700 dark:bg-blue-800/70 dark:text-blue-400", borderColor: "border-blue-500/70 dark:border-blue-400/60", glowColor: "from-blue-500/40 via-blue-400/20 to-transparent", badge: "bg-blue-500 dark:bg-blue-600" },
  { bg: "from-purple-200/80 to-purple-100 dark:from-purple-900/60 dark:to-purple-800/60", iconBg: "bg-purple-200 text-purple-700 dark:bg-purple-800/70 dark:text-purple-400", borderColor: "border-purple-500/70 dark:border-purple-400/60", glowColor: "from-purple-500/40 via-purple-400/20 to-transparent", badge: "bg-purple-500 dark:bg-purple-600" },
  { bg: "from-emerald-200/80 to-emerald-100 dark:from-emerald-900/60 dark:to-emerald-800/60", iconBg: "bg-emerald-200 text-emerald-700 dark:bg-emerald-800/70 dark:text-emerald-400", borderColor: "border-emerald-500/70 dark:border-emerald-400/60", glowColor: "from-emerald-500/40 via-emerald-400/20 to-transparent", badge: "bg-emerald-500 dark:bg-emerald-600" },
];

const REASON_ICONS = [Shield, Zap, TrendingUp, Users];

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

export default function WhyItLands() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { ref, isVisible } = useScrollReveal();
  const reasons = t("whyItLands.reasons", { returnObjects: true });

  return (
    // ✅ LIGHT MODE: Halka purplish shade | DARK MODE: Same
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24 bg-[#faf7ff] dark:bg-transparent">
      
      {/* ✅ LIGHT MODE PURPLE SHADE */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-100/40 via-transparent to-transparent dark:hidden" />

      <div className="pointer-events-none absolute -top-20 right-0 h-[30rem] w-[30rem] rounded-full bg-indigo-400/8 blur-3xl dark:bg-indigo-400/12" />
      
      <div className={`relative mx-auto max-w-content scroll-reveal ${isVisible ? 'visible' : ''}`}>
        
        {/* 🔥 Creative Header */}
        <div className="mb-12 text-center">
          <div className={`mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-indigo-500/30 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Sparkles className="h-3.5 w-3.5" />
            {t("whyItLands.label")}
          </div>
          <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
            {t("whyItLands.title1")} <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">{t("whyItLands.titleHighlight")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">{t("whyItLands.subtitle")}</p>
        </div>

        {/* 🔥 Creative: Cards with Circular Icons + Gradient Borders
            dir="rtl" makes the browser auto-place cards in natural right-to-left
            reading order (1 top-right, 2, 3, 4 towards the left) without any manual
            order math — same fix as InsideTheBox.jsx */}
        <div
          dir={isRTL ? 'rtl' : 'ltr'}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {reasons.map((reason, index) => {
            const color = REASON_COLORS[index % REASON_COLORS.length];
            const Icon = REASON_ICONS[index % REASON_ICONS.length];

            return (
              <div key={index} className="relative h-full">
                
                {/* Badge - RTL flip */}
                <div className={`absolute -top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full ${color.badge} text-[10px] font-bold text-white shadow-md ${isRTL ? '-right-2' : '-left-2'}`}>
                  {index + 1}
                </div>

                <MouseFollower
                  borderColor={color.borderColor}
                  glowColor={color.glowColor}
                  className={`h-full bg-gradient-to-br ${color.bg} p-6 text-center shadow-xl shadow-indigo-500/5 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 dark:shadow-indigo-500/10`}
                >
                  <div className="relative flex flex-col items-center">
                    
                    {/* Big Circular Icon */}
                    <div className={`flex h-14 w-14 items-center justify-center rounded-full ${color.iconBg} transition-all duration-300 group-hover:scale-110 shadow-lg`}>
                      <Icon className="h-7 w-7" />
                    </div>

                    <h3 className="mt-4 font-display text-lg font-semibold text-slate-800 dark:text-white">
                      {reason.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {reason.description}
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
