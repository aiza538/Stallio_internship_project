// src/sections/pricing/InsideTheBox.jsx
import { Store, Package, BarChart, Headphones, Tag, ShoppingCart, FileText, Globe, Truck, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

// ✅ Har box ka alag color (Light + Dark Strong)
const FEATURE_COLORS = [
  { bg: "from-amber-200/80 to-amber-100 dark:from-amber-900/60 dark:to-amber-800/60", iconBg: "bg-amber-100 text-amber-700 dark:bg-amber-800/70 dark:text-amber-400", borderColor: "border-amber-500/70 dark:border-amber-400/60", glowColor: "from-amber-500/40 via-amber-400/20 to-transparent", badge: "bg-amber-500 dark:bg-amber-600" },
  { bg: "from-emerald-200/80 to-emerald-100 dark:from-emerald-900/60 dark:to-emerald-800/60", iconBg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-800/70 dark:text-emerald-400", borderColor: "border-emerald-500/70 dark:border-emerald-400/60", glowColor: "from-emerald-500/40 via-emerald-400/20 to-transparent", badge: "bg-emerald-500 dark:bg-emerald-600" },
  { bg: "from-blue-200/80 to-blue-100 dark:from-blue-900/60 dark:to-blue-800/60", iconBg: "bg-blue-100 text-blue-700 dark:bg-blue-800/70 dark:text-blue-400", borderColor: "border-blue-500/70 dark:border-blue-400/60", glowColor: "from-blue-500/40 via-blue-400/20 to-transparent", badge: "bg-blue-500 dark:bg-blue-600" },
  { bg: "from-rose-200/80 to-rose-100 dark:from-rose-900/60 dark:to-rose-800/60", iconBg: "bg-rose-100 text-rose-700 dark:bg-rose-800/70 dark:text-rose-400", borderColor: "border-rose-500/70 dark:border-rose-400/60", glowColor: "from-rose-500/40 via-rose-400/20 to-transparent", badge: "bg-rose-500 dark:bg-rose-600" },
  { bg: "from-cyan-200/80 to-cyan-100 dark:from-cyan-900/60 dark:to-cyan-800/60", iconBg: "bg-cyan-100 text-cyan-700 dark:bg-cyan-800/70 dark:text-cyan-400", borderColor: "border-cyan-500/70 dark:border-cyan-400/60", glowColor: "from-cyan-500/40 via-cyan-400/20 to-transparent", badge: "bg-cyan-500 dark:bg-cyan-600" },
  { bg: "from-orange-200/80 to-orange-100 dark:from-orange-900/60 dark:to-orange-800/60", iconBg: "bg-orange-100 text-orange-700 dark:bg-orange-800/70 dark:text-orange-400", borderColor: "border-orange-500/70 dark:border-orange-400/60", glowColor: "from-orange-500/40 via-orange-400/20 to-transparent", badge: "bg-orange-500 dark:bg-orange-600" },
  { bg: "from-purple-200/80 to-purple-100 dark:from-purple-900/60 dark:to-purple-800/60", iconBg: "bg-purple-100 text-purple-700 dark:bg-purple-800/70 dark:text-purple-400", borderColor: "border-purple-500/70 dark:border-purple-400/60", glowColor: "from-purple-500/40 via-purple-400/20 to-transparent", badge: "bg-purple-500 dark:bg-purple-600" },
  { bg: "from-pink-200/80 to-pink-100 dark:from-pink-900/60 dark:to-pink-800/60", iconBg: "bg-pink-100 text-pink-700 dark:bg-pink-800/70 dark:text-pink-400", borderColor: "border-pink-500/70 dark:border-pink-400/60", glowColor: "from-pink-500/40 via-pink-400/20 to-transparent", badge: "bg-pink-500 dark:bg-pink-600" },
  { bg: "from-teal-200/80 to-teal-100 dark:from-teal-900/60 dark:to-teal-800/60", iconBg: "bg-teal-100 text-teal-700 dark:bg-teal-800/70 dark:text-teal-400", borderColor: "border-teal-500/70 dark:border-teal-400/60", glowColor: "from-teal-500/40 via-teal-400/20 to-transparent", badge: "bg-teal-500 dark:bg-teal-600" },
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
      className={`relative overflow-hidden rounded-xl border-2 transition-all duration-500 ${isHovering ? borderColor : 'border-transparent'} ${className}`}
    >
      {isHovering && (
        <div
          className={`pointer-events-none absolute h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r ${glowColor} blur-2xl transition-all duration-200`}
          style={{ left: `${position.x}%`, top: `${position.y}%` }}
        />
      )}
      {children}
    </div>
  );
}

export default function InsideTheBox() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { ref, isVisible } = useScrollReveal();
  const features = t("insideTheBox.features", { returnObjects: true });

  // RTL mein Arrow flip
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24 bg-[#faf7ff] dark:bg-transparent">
      
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-100/40 via-transparent to-transparent dark:hidden" />

      <div className="pointer-events-none absolute -bottom-20 right-0 h-[30rem] w-[30rem] rounded-full bg-violet-400/8 blur-3xl dark:bg-violet-400/12" />
      <div className="pointer-events-none absolute -top-20 left-0 h-[30rem] w-[30rem] rounded-full bg-indigo-400/8 blur-3xl dark:bg-indigo-400/12" />
      
      <div className={`relative mx-auto max-w-content scroll-reveal ${isVisible ? 'visible' : ''}`}>
        
        <div className="mb-10 text-center">
          <div className={`mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-violet-500/30 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Sparkles className="h-3.5 w-3.5" />
            {t("insideTheBox.label")}
          </div>
          <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
            {t("insideTheBox.title1")} <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">{t("insideTheBox.titleHighlight")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">{t("insideTheBox.subtitle")}</p>
        </div>

        {/* ✅ Equal Height Grid — dir="rtl" lets the browser auto-place items in natural
            right-to-left reading order (1 top-right, 2 next to its left, 3 further left,
            then row 2 starts with 4 top-right again) without any manual order math. */}
        <div
          dir={isRTL ? 'rtl' : 'ltr'}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => {
            const color = FEATURE_COLORS[index % FEATURE_COLORS.length];
            
            return (
              <div key={index} className="relative h-full">
                
                {/* Badge - RTL mein left se right flip */}
                <div className={`absolute -top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full ${color.badge} text-[10px] font-bold text-white shadow-md ${isRTL ? '-right-2' : '-left-2'}`}>
                  {index + 1}
                </div>

                <MouseFollower
                  borderColor={color.borderColor}
                  glowColor={color.glowColor}
                  className={`h-full bg-gradient-to-br ${color.bg} p-5 shadow-lg shadow-indigo-500/5 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/15 dark:shadow-indigo-500/5`}
                >
                  <div className={`relative flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color.iconBg} transition-all duration-300 group-hover:scale-110`}>
                      {index === 0 && <Store className="h-6 w-6" />}
                      {index === 1 && <Headphones className="h-6 w-6" />}
                      {index === 2 && <FileText className="h-6 w-6" />}
                      {index === 3 && <Package className="h-6 w-6" />}
                      {index === 4 && <Tag className="h-6 w-6" />}
                      {index === 5 && <Globe className="h-6 w-6" />}
                      {index === 6 && <BarChart className="h-6 w-6" />}
                      {index === 7 && <ShoppingCart className="h-6 w-6" />}
                      {index === 8 && <Truck className="h-6 w-6" />}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-display text-base font-semibold text-slate-800 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}>{feature.title}</h3>
                      <p className={`mt-1 text-sm text-slate-600 dark:text-slate-300 ${isRTL ? 'text-right' : 'text-left'}`}>{feature.description}</p>
                    </div>
                  </div>
                </MouseFollower>
              </div>
            );
          })}
        </div>

        <div className={`mt-10 flex flex-col items-center justify-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <a
            href="#demo"
            className={`inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-500/25 transition-colors duration-300 hover:shadow-xl hover:shadow-violet-500/35 hover:brightness-110 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {t("insideTheBox.browseDemo")}
            <ArrowIcon className="h-4 w-4 transition-none" />
          </a>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t("insideTheBox.footerText")}</p>
        </div>
      </div>
    </section>
  );
}
