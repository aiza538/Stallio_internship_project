// src/sections/howitworks/HowItWorksSteps.jsx
import { Sparkles, Check, User, Image, Share2 } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

const STEPS = [
  {
    icon: User,
    number: "01",
    titleKey: "howItWorksSteps.steps.step1.title",
    descriptionKey: "howItWorksSteps.steps.step1.description",
    subItemsKeys: [
      "howItWorksSteps.steps.step1.subItems.0",
      "howItWorksSteps.steps.step1.subItems.1",
      "howItWorksSteps.steps.step1.subItems.2"
    ],
    bg: "from-amber-200/80 to-amber-100 dark:from-amber-900/60 dark:to-amber-800/60",
    iconBg: "bg-amber-200 text-amber-700 dark:bg-amber-800/70 dark:text-amber-400",
    borderColor: "border-amber-500/70 dark:border-amber-400/60",
    glowColor: "from-amber-500/40 via-amber-400/20 to-transparent",
    subIconColor: "text-amber-500 dark:text-amber-400",
    shadow: "shadow-amber-500/20 dark:shadow-amber-900/40",
    hoverGlow: "hover:shadow-amber-500/40 dark:hover:shadow-amber-800/60",
  },
  {
    icon: Image,
    number: "02",
    titleKey: "howItWorksSteps.steps.step2.title",
    descriptionKey: "howItWorksSteps.steps.step2.description",
    subItemsKeys: [
      "howItWorksSteps.steps.step2.subItems.0",
      "howItWorksSteps.steps.step2.subItems.1",
      "howItWorksSteps.steps.step2.subItems.2"
    ],
    bg: "from-blue-200/80 to-blue-100 dark:from-blue-900/60 dark:to-blue-800/60",
    iconBg: "bg-blue-200 text-blue-700 dark:bg-blue-800/70 dark:text-blue-400",
    borderColor: "border-blue-500/70 dark:border-blue-400/60",
    glowColor: "from-blue-500/40 via-blue-400/20 to-transparent",
    subIconColor: "text-blue-500 dark:text-blue-400",
    shadow: "shadow-blue-500/20 dark:shadow-blue-900/40",
    hoverGlow: "hover:shadow-blue-500/40 dark:hover:shadow-blue-800/60",
  },
  {
    icon: Share2,
    number: "03",
    titleKey: "howItWorksSteps.steps.step3.title",
    descriptionKey: "howItWorksSteps.steps.step3.description",
    subItemsKeys: [
      "howItWorksSteps.steps.step3.subItems.0",
      "howItWorksSteps.steps.step3.subItems.1",
      "howItWorksSteps.steps.step3.subItems.2"
    ],
    bg: "from-purple-200/80 to-purple-100 dark:from-purple-900/60 dark:to-purple-800/60",
    iconBg: "bg-purple-200 text-purple-700 dark:bg-purple-800/70 dark:text-purple-400",
    borderColor: "border-purple-500/70 dark:border-purple-400/60",
    glowColor: "from-purple-500/40 via-purple-400/20 to-transparent",
    subIconColor: "text-purple-500 dark:text-purple-400",
    shadow: "shadow-purple-500/20 dark:shadow-purple-900/40",
    hoverGlow: "hover:shadow-purple-500/40 dark:hover:shadow-purple-800/60",
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
      className={`group relative h-full overflow-hidden rounded-2xl border-2 transition-all duration-500 transform hover:-translate-y-1 ${
        isHovering ? borderColor : 'border-transparent'
      } ${className} ${isHovering ? shadow : ''} ${hoverGlow}`}
    >
      {isHovering && (
        <div
          className={`pointer-events-none absolute h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r ${glowColor} blur-3xl transition-all duration-300`}
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

export default function HowItWorksSteps() {
  const { ref, isVisible } = useScrollReveal();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

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
          <span className={`mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-white shadow-lg shadow-purple-500/30 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Sparkles className="h-4 w-4" />
            {t("howItWorksSteps.label")}
          </span>
          <h2 className="font-display text-4xl font-bold text-slate-800 dark:text-white sm:text-5xl">
            {t("howItWorksSteps.title1")} <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">{t("howItWorksSteps.titleHighlight")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            {t("howItWorksSteps.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <div key={index} className={`relative ${isRTL ? (index === 0 ? 'md:order-3' : index === 1 ? 'md:order-2' : 'md:order-1') : ''}`}>
              
              {/* Number Glow Background (Subtle) */}
              <div className={`absolute -top-12 font-display text-[8rem] font-black leading-none text-slate-400/20 opacity-60 select-none dark:text-white/5 ${isRTL ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'}`}>
                {step.number}
              </div>

              <MouseFollower
                borderColor={step.borderColor}
                glowColor={step.glowColor}
                shadow={step.shadow}
                hoverGlow={step.hoverGlow}
                className={`bg-gradient-to-br ${step.bg} p-8 shadow-xl shadow-indigo-500/10 backdrop-blur-lg dark:shadow-2xl dark:shadow-black/40`}
              >
                <div className={`relative flex h-full flex-col ${isRTL ? 'text-right' : 'text-left'}`}>
                  {/* Step Number + Icon Row */}
                  <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="font-mono text-sm font-bold tracking-widest text-slate-500 dark:text-slate-300">
                      STEP {step.number}
                    </span>
                    <div className={`inline-flex rounded-2xl ${step.iconBg} p-3 shadow-lg transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110`}>
                      <step.icon className="h-6 w-6" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 font-display text-2xl font-bold text-slate-800 dark:text-white">
                    {t(step.titleKey)}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                    {t(step.descriptionKey)}
                  </p>

                  {/* Sub Items */}
                  {step.subItemsKeys && (
                    <ul className={`mt-6 space-y-3 border-t border-slate-300/40 pt-5 dark:border-white/10 ${isRTL ? 'flex flex-col items-end' : ''}`}>
                      {step.subItemsKeys.map((itemKey, idx) => (
                        <li key={idx} className={`flex items-start gap-3 text-sm font-medium text-slate-600 dark:text-slate-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white shadow-sm dark:bg-slate-800/80 ${step.subIconColor}`}>
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                          <span>{t(itemKey)}</span>
                        </li>
                      ))}
                    </ul>
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