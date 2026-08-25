// src/sections/about/AboutValues.jsx
import { Shield, Zap, Heart, Users, Sparkles } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

const VALUE_COLORS = [
  { bg: "from-amber-200/80 to-amber-100 dark:from-amber-900/60 dark:to-amber-800/60", iconBg: "bg-amber-200 text-amber-700 dark:bg-amber-800/70 dark:text-amber-400", borderColor: "border-amber-500/70 dark:border-amber-400/60", glowColor: "from-amber-500/40 via-amber-400/20 to-transparent", numBg: "bg-amber-500 dark:bg-amber-600" },
  { bg: "from-blue-200/80 to-blue-100 dark:from-blue-900/60 dark:to-blue-800/60", iconBg: "bg-blue-200 text-blue-700 dark:bg-blue-800/70 dark:text-blue-400", borderColor: "border-blue-500/70 dark:border-blue-400/60", glowColor: "from-blue-500/40 via-blue-400/20 to-transparent", numBg: "bg-blue-500 dark:bg-blue-600" },
  { bg: "from-rose-200/80 to-rose-100 dark:from-rose-900/60 dark:to-rose-800/60", iconBg: "bg-rose-200 text-rose-700 dark:bg-rose-800/70 dark:text-rose-400", borderColor: "border-rose-500/70 dark:border-rose-400/60", glowColor: "from-rose-500/40 via-rose-400/20 to-transparent", numBg: "bg-rose-500 dark:bg-rose-600" },
  { bg: "from-emerald-200/80 to-emerald-100 dark:from-emerald-900/60 dark:to-emerald-800/60", iconBg: "bg-emerald-200 text-emerald-700 dark:bg-emerald-800/70 dark:text-emerald-400", borderColor: "border-emerald-500/70 dark:border-emerald-400/60", glowColor: "from-emerald-500/40 via-emerald-400/20 to-transparent", numBg: "bg-emerald-500 dark:bg-emerald-600" },
];

const VALUE_ICONS = [Shield, Zap, Heart, Users];

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

export default function AboutValues() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { ref, isVisible } = useScrollReveal();
  const values = t("aboutValues.values", { returnObjects: true });

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24 bg-[#faf7ff] dark:bg-transparent">
      
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-100/40 via-transparent to-transparent dark:hidden" />

      <div className="pointer-events-none absolute -top-20 right-0 h-[30rem] w-[30rem] rounded-full bg-indigo-400/8 blur-3xl dark:bg-indigo-400/12" />
      
      <div className={`relative mx-auto max-w-content scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="mb-12 text-center">
          <div className={`mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-indigo-500/30 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Sparkles className="h-3.5 w-3.5" />
            {t("aboutValues.label")}
          </div>
          <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
            {t("aboutValues.title1")} <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">{t("aboutValues.titleHighlight")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">{t("aboutValues.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const color = VALUE_COLORS[index % VALUE_COLORS.length];
            const Icon = VALUE_ICONS[index % VALUE_ICONS.length];

            return (
              <div key={index} className={`relative h-full ${isRTL ? (index === 0 ? 'lg:order-4' : index === 1 ? 'lg:order-3' : index === 2 ? 'lg:order-2' : 'lg:order-1') : ''}`}>
                {/* RTL: Number Badge ko Right side shift karna */}
                <div className={`absolute -top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full ${color.numBg} text-sm font-bold text-white shadow-md ${isRTL ? '-right-3' : '-left-3'}`}>
                  {index + 1}
                </div>

                <MouseFollower
                  borderColor={color.borderColor}
                  glowColor={color.glowColor}
                  className={`h-full bg-gradient-to-br ${color.bg} p-6 text-center shadow-xl shadow-indigo-500/5 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 dark:shadow-indigo-500/10`}
                >
                  <div className="relative flex h-full flex-col items-center justify-center">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-full ${color.iconBg} transition-all duration-300 group-hover:scale-110 shadow-lg`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-slate-800 dark:text-white">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {value.description}
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