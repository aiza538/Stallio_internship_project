// src/sections/pricing/WhatsIncluded.jsx
import { Infinity, Smartphone, Link, Package, ShoppingCart, Tag, FileText, Truck, BarChart, MessageCircle, CreditCard, Globe, Sparkles, CheckCircle2 } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

// ✅ Har box ka apna alag color (Light + Dark Strong)
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
  { bg: "from-indigo-200/80 to-indigo-100 dark:from-indigo-900/60 dark:to-indigo-800/60", iconBg: "bg-indigo-100 text-indigo-700 dark:bg-indigo-800/70 dark:text-indigo-400", borderColor: "border-indigo-500/70 dark:border-indigo-400/60", glowColor: "from-indigo-500/40 via-indigo-400/20 to-transparent", badge: "bg-indigo-500 dark:bg-indigo-600" },
  { bg: "from-lime-200/80 to-lime-100 dark:from-lime-900/60 dark:to-lime-800/60", iconBg: "bg-lime-100 text-lime-700 dark:bg-lime-800/70 dark:text-lime-400", borderColor: "border-lime-500/70 dark:border-lime-400/60", glowColor: "from-lime-500/40 via-lime-400/20 to-transparent", badge: "bg-lime-500 dark:bg-lime-600" },
  { bg: "from-yellow-200/80 to-yellow-100 dark:from-yellow-900/60 dark:to-yellow-800/60", iconBg: "bg-yellow-100 text-yellow-700 dark:bg-yellow-800/70 dark:text-yellow-400", borderColor: "border-yellow-500/70 dark:border-yellow-400/60", glowColor: "from-yellow-500/40 via-yellow-400/20 to-transparent", badge: "bg-yellow-500 dark:bg-yellow-600" },
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

export default function WhatsIncluded() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal();
  const features = t("whatsIncluded.features", { returnObjects: true });

  return (
    // ✅ LIGHT MODE: Halka purplish shade | DARK MODE: Same
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24 bg-[#faf7ff] dark:bg-transparent">
      
      {/* ✅ LIGHT MODE PURPLE SHADE */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-100/40 via-transparent to-transparent dark:hidden" />

      <div className="pointer-events-none absolute -top-20 right-0 h-[30rem] w-[30rem] rounded-full bg-violet-400/8 blur-3xl dark:bg-violet-400/12" />
      <div className="pointer-events-none absolute -bottom-20 left-0 h-[30rem] w-[30rem] rounded-full bg-indigo-400/8 blur-3xl dark:bg-indigo-400/12" />
      
      <div className={`relative mx-auto max-w-content scroll-reveal ${isVisible ? 'visible' : ''}`}>
        
        {/* ✅ Creative Header with Badge */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-violet-500/30">
            <Sparkles className="h-3.5 w-3.5" />
            {t("whatsIncluded.label")}
          </div>
          <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
            {t("whatsIncluded.title1")} <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">{t("whatsIncluded.titleHighlight")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600 dark:text-slate-300">{t("whatsIncluded.subtitle")}</p>
        </div>

        {/* ✅ Equal Height + Colorful Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const color = FEATURE_COLORS[index % FEATURE_COLORS.length];
            
            return (
              <div key={index} className="relative h-full">
                
                {/* ✅ Creative: Checkmark Badge */}
                <div className={`absolute -top-2 -left-2 z-10 flex h-6 w-6 items-center justify-center rounded-full ${color.badge} shadow-md`}>
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>

                <MouseFollower
                  borderColor={color.borderColor}
                  glowColor={color.glowColor}
                  className={`h-full bg-gradient-to-br ${color.bg} p-5 shadow-lg shadow-indigo-500/5 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/15 dark:shadow-indigo-500/5`}
                >
                  <div className="relative flex items-start gap-4">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color.iconBg} transition-all duration-300 group-hover:scale-110`}>
                      {index === 0 && <Link className="h-6 w-6" />}
                      {index === 1 && <Infinity className="h-6 w-6" />}
                      {index === 2 && <Smartphone className="h-6 w-6" />}
                      {index === 3 && <Tag className="h-6 w-6" />}
                      {index === 4 && <FileText className="h-6 w-6" />}
                      {index === 5 && <ShoppingCart className="h-6 w-6" />}
                      {index === 6 && <FileText className="h-6 w-6" />}
                      {index === 7 && <Truck className="h-6 w-6" />}
                      {index === 8 && <Globe className="h-6 w-6" />}
                      {index === 9 && <BarChart className="h-6 w-6" />}
                      {index === 10 && <MessageCircle className="h-6 w-6" />}
                      {index === 11 && <CreditCard className="h-6 w-6" />}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-display text-base font-semibold text-slate-800 dark:text-white">{feature.title}</h4>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{feature.description}</p>
                    </div>
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