// src/sections/howitworks/WhenYouAreLive.jsx
import { 
  Sparkles, LayoutDashboard, CreditCard, 
  Smartphone, ShoppingCart, Tag, FileText
} from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

const FEATURES = [
  {
    icon: LayoutDashboard,
    number: "01",
    titleKey: "whenYouAreLive.features.step1.title",
    descriptionKey: "whenYouAreLive.features.step1.description",
    subItemsKeys: [
      "whenYouAreLive.features.step1.subItems.0",
      "whenYouAreLive.features.step1.subItems.1",
      "whenYouAreLive.features.step1.subItems.2"
    ],
    // ✅ Pink Color (Orange ki jagah)
    bg: "from-pink-200/80 to-pink-100 dark:from-pink-900/60 dark:to-pink-800/60",
    iconBg: "bg-pink-200 text-pink-700 dark:bg-pink-800/70 dark:text-pink-400",
    borderColor: "border-pink-500/70 dark:border-pink-400/60",
    glowColor: "from-pink-500/40 via-pink-400/20 to-transparent",
    shadow: "shadow-pink-500/20 dark:shadow-pink-900/40",
    hoverGlow: "hover:shadow-pink-500/40 dark:hover:shadow-pink-800/60",
    subIconColor: "text-pink-500 dark:text-pink-400",
  },
  {
    icon: Smartphone,
    number: "02",
    titleKey: "whenYouAreLive.features.step2.title",
    descriptionKey: "whenYouAreLive.features.step2.description",
    badges: [
      { icon: ShoppingCart, labelKey: "whenYouAreLive.features.step2.badges.0" },
      { icon: Tag, labelKey: "whenYouAreLive.features.step2.badges.1" },
      { icon: FileText, labelKey: "whenYouAreLive.features.step2.badges.2" }
    ],
    // ✅ Blue Color (Same)
    bg: "from-blue-200/80 to-blue-100 dark:from-blue-900/60 dark:to-blue-800/60",
    iconBg: "bg-blue-200 text-blue-700 dark:bg-blue-800/70 dark:text-blue-400",
    borderColor: "border-blue-500/70 dark:border-blue-400/60",
    glowColor: "from-blue-500/40 via-blue-400/20 to-transparent",
    shadow: "shadow-blue-500/20 dark:shadow-blue-900/40",
    hoverGlow: "hover:shadow-blue-500/40 dark:hover:shadow-blue-800/60",
    subIconColor: "text-blue-500 dark:text-blue-400",
  },
];

function MouseFollower({ children, className = "", borderColor = "", glowColor = "", shadow, hoverGlow }) {
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
      className={`relative h-full overflow-hidden rounded-2xl border-2 transition-all duration-500 transform hover:-translate-y-1 ${
        isHovering ? borderColor : 'border-transparent'
      } ${className} ${isHovering ? shadow : ''} ${hoverGlow}`}
    >
      {isHovering && (
        <div
          className={`pointer-events-none absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r ${glowColor} blur-2xl transition-all duration-200`}
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

export default function WhenYouAreLive() {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useTranslation();

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24 bg-[#f4f2ff] dark:bg-[#0f0b1e]">
      
      {/* ✅ CENTER PURPLISH-BLUE RADIAL GLOW (Light & Subtle) */}
      <div 
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(circle at center, rgba(129, 140, 248, 0.12) 0%, rgba(139, 92, 246, 0.08) 25%, rgba(244, 242, 255, 0) 55%)"
        }}
      />
      <div 
        className="pointer-events-none absolute inset-0 dark:block hidden"
        style={{
          background: "radial-gradient(circle at center, rgba(129, 140, 248, 0.3) 0%, rgba(139, 92, 246, 0.2) 30%, rgba(15, 11, 30, 0) 60%)"
        }}
      />

      <div className={`relative mx-auto max-w-content scroll-reveal ${isVisible ? 'visible' : ''}`}>
        {/* Section Header */}
        <div className="mb-16 text-center">
          {/* ✅ Purple Gradient Pill (1st image jaisa) */}
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-white shadow-lg shadow-purple-500/30">
            <Sparkles className="h-4 w-4" />
            {t("whenYouAreLive.label")}
          </span>
          <h2 className="font-display text-4xl font-bold text-slate-800 dark:text-white sm:text-5xl">
            {t("whenYouAreLive.title1")} <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">{t("whenYouAreLive.titleHighlight")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            {t("whenYouAreLive.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <MouseFollower
                borderColor={feature.borderColor}
                glowColor={feature.glowColor}
                shadow={feature.shadow}
                hoverGlow={feature.hoverGlow}
                className={`bg-gradient-to-br ${feature.bg} p-8 shadow-xl shadow-indigo-500/10 backdrop-blur-lg transition-all duration-500 dark:shadow-2xl dark:shadow-black/40 h-full`}
              >
                <div className="relative flex flex-col items-start">
                  {/* Step Number + Icon */}
                  <div className="flex w-full items-center justify-between">
                    <span className="font-mono text-sm font-bold tracking-widest text-slate-500 dark:text-slate-300">
                      STEP {feature.number}
                    </span>
                    <div className={`inline-flex rounded-2xl ${feature.iconBg} p-3.5 shadow-lg transition-all duration-300 group-hover:scale-110`}>
                      <feature.icon className="h-7 w-7" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 font-display text-xl font-semibold text-slate-800 dark:text-white">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                    {t(feature.descriptionKey)}
                  </p>

                  {/* Sub Items - Command Center */}
                  {feature.subItemsKeys && (
                    <ul className="mt-4 space-y-2">
                      {feature.subItemsKeys.map((itemKey, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-500 dark:text-slate-400">
                          <span className={`mt-1.5 h-1.5 w-1.5 rounded-full ${feature.subIconColor}`} />
                          {t(itemKey)}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Badges - Thumb Friendly */}
                  {feature.badges && (
                    <div className="mt-5 flex flex-wrap items-center gap-2.5">
                      {feature.badges.map((badge, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-2 rounded-full border border-indigo-200/30 bg-white/60 px-4 py-1.5 text-sm font-semibold text-indigo-700 backdrop-blur-sm dark:border-indigo-800/20 dark:bg-white/5 dark:text-indigo-300"
                        >
                          <badge.icon className="h-4 w-4" />
                          {t(badge.labelKey)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </MouseFollower>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}