// src/sections/about/SimpleFastCredible.jsx
import { Sparkles, Zap, Shield } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const FEATURE_COLORS = [
  { bg: "from-amber-200/80 to-amber-100 dark:from-amber-900/60 dark:to-amber-800/60", iconBg: "bg-amber-200 text-amber-700 dark:bg-amber-800/70 dark:text-amber-400", borderColor: "border-amber-500/70 dark:border-amber-400/60", glowColor: "rgba(245, 158, 11, 0.3)", lineColor: "bg-amber-400 dark:bg-amber-400", icon: Sparkles },
  { bg: "from-blue-200/80 to-blue-100 dark:from-blue-900/60 dark:to-blue-800/60", iconBg: "bg-blue-200 text-blue-700 dark:bg-blue-800/70 dark:text-blue-400", borderColor: "border-blue-500/70 dark:border-blue-400/60", glowColor: "rgba(59, 130, 246, 0.3)", lineColor: "bg-blue-400 dark:bg-blue-400", icon: Zap },
  { bg: "from-purple-200/80 to-purple-100 dark:from-purple-900/60 dark:to-purple-800/60", iconBg: "bg-purple-200 text-purple-700 dark:bg-purple-800/70 dark:text-purple-400", borderColor: "border-purple-500/70 dark:border-purple-400/60", glowColor: "rgba(168, 85, 247, 0.3)", lineColor: "bg-purple-400 dark:bg-purple-400", icon: Shield },
];

export default function SimpleFastCredible() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal();
  const features = t("simpleFastCredible.features", { returnObjects: true });

  const [hoverIndex, setHoverIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    // ✅ LIGHT MODE: Halka purplish shade | DARK MODE: Same
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24 bg-[#faf7ff] dark:bg-transparent">
      
      {/* ✅ LIGHT MODE PURPLE SHADE */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-100/40 via-transparent to-transparent dark:hidden" />

      <div className="pointer-events-none absolute -top-20 right-0 h-[30rem] w-[30rem] rounded-full bg-indigo-400/8 blur-3xl dark:bg-indigo-400/12" />
      <div className="pointer-events-none absolute -bottom-20 left-0 h-[30rem] w-[30rem] rounded-full bg-purple-400/8 blur-3xl dark:bg-purple-400/12" />
      
      <div className={`relative mx-auto max-w-content scroll-reveal ${isVisible ? 'visible' : ''}`}>
        
        {/* 🟢 HEADING SECTION (Simple. Fast. Credible.) 🟢 */}
        <div className="mb-12 text-center">
          
          {/* Pill Shape Heading */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4c1d95] to-[#7c3aed] px-5 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-white shadow-lg shadow-purple-900/30">
            <Sparkles className="h-4 w-4" />
            SIMPLE. FAST. CREDIBLE.
          </div>

          <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
            {t("simpleFastCredible.title1")} <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">{t("simpleFastCredible.titleHighlight")}</span>
          </h2>
        </div>
        {/* 🟢 HEADING SECTION END 🟢 */}

        <div className="relative flex flex-col items-center justify-center gap-8 md:flex-row">
          {features.map((feature, index) => {
            const color = FEATURE_COLORS[index % FEATURE_COLORS.length];
            const Icon = color.icon;

            return (
              <div key={index} className="relative flex w-full max-w-xs flex-col items-center">
                <div
                  ref={index === hoverIndex ? cardRef : null}
                  onMouseMove={index === hoverIndex ? handleMouseMove : undefined}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  className={`relative w-full rounded-2xl border-2 ${color.borderColor} bg-gradient-to-br ${color.bg} p-8 text-center shadow-xl shadow-indigo-500/5 backdrop-blur-md transition-all duration-300 overflow-hidden hover:shadow-xl hover:-translate-y-1 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  {hoverIndex === index && (
                    <div className="pointer-events-none absolute rounded-full blur-[50px] transition-all duration-100"
                      style={{ width: "200px", height: "200px", left: mousePos.x - 100, top: mousePos.y - 100, backgroundColor: color.glowColor }}
                    />
                  )}
                  <div className="relative z-10">
                    <div className={`mx-auto inline-flex rounded-full ${color.iconBg} p-5 transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="h-10 w-10" />
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-bold text-slate-800 dark:text-white">{feature.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{feature.description}</p>
                  </div>
                </div>
                <div className={`mt-3 h-1 w-12 rounded-full ${color.lineColor}`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}