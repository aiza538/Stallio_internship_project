// src/sections/howitworks/HowItWorksHero.jsx
import { ArrowRight, ArrowLeft, Sparkles, Link, Package, Share2, Clock, Smartphone } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

const STEPS = [
  {
    icon: Link,
    number: "01",
    titleKey: "howItWorksHero.steps.step1.title",
    descriptionKey: "howItWorksHero.steps.step1.description",
    bg: "from-amber-200/80 to-amber-100 dark:from-amber-900/60 dark:to-amber-800/60",
    iconBg: "bg-amber-200 text-amber-700 dark:bg-amber-800/70 dark:text-amber-400",
    borderColor: "border-amber-500/70 dark:border-amber-400/60",
    glowColor: "from-amber-500/40 via-amber-400/20 to-transparent",
  },
  {
    icon: Package,
    number: "02",
    titleKey: "howItWorksHero.steps.step2.title",
    descriptionKey: "howItWorksHero.steps.step2.description",
    bg: "from-blue-200/80 to-blue-100 dark:from-blue-900/60 dark:to-blue-800/60",
    iconBg: "bg-blue-200 text-blue-700 dark:bg-blue-800/70 dark:text-blue-400",
    borderColor: "border-blue-500/70 dark:border-blue-400/60",
    glowColor: "from-blue-500/40 via-blue-400/20 to-transparent",
  },
  {
    icon: Share2,
    number: "03",
    titleKey: "howItWorksHero.steps.step3.title",
    descriptionKey: "howItWorksHero.steps.step3.description",
    bg: "from-purple-200/80 to-purple-100 dark:from-purple-900/60 dark:to-purple-800/60",
    iconBg: "bg-purple-200 text-purple-700 dark:bg-purple-800/70 dark:text-purple-400",
    borderColor: "border-purple-500/70 dark:border-purple-400/60",
    glowColor: "from-purple-500/40 via-purple-400/20 to-transparent",
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
      className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-500 ${
        isHovering ? borderColor : 'border-transparent'
      } ${className}`}
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

export default function HowItWorksHero() {
  const { ref, isVisible } = useScrollReveal();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // RTL mein Arrow flip
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-50 blur-sm dark:opacity-40"
        style={{
          backgroundImage: "url('/images/how_it_works_hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/40 via-white/20 to-white/50 dark:from-slate-900/40 dark:via-slate-900/20 dark:to-slate-900/50" />
      <div className="absolute inset-0 z-0 bg-white/0 dark:bg-slate-900/0" />
      
      <div className="pointer-events-none absolute -top-40 left-1/2 z-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-400/20" />
      <div className="pointer-events-none absolute -bottom-40 right-0 z-0 h-[30rem] w-[30rem] rounded-full bg-purple-400/12 blur-3xl dark:bg-purple-400/15" />

      <div className={`relative z-10 mx-auto max-w-content scroll-reveal ${isVisible ? 'visible' : ''}`}>
        
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          
          {/* ✅ Mobile: Text RIGHT (source order), Desktop: Text RIGHT via lg:order-2 in RTL */}
          <div className={`flex flex-col justify-center ${isRTL ? 'text-right lg:order-2' : 'text-left'}`}>
            
            <div className={`inline-flex items-center gap-2 self-start rounded-full border border-indigo-200/30 bg-white/80 px-4 py-1.5 text-sm font-medium text-brand-600 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-slate-300 ${isRTL ? 'self-end flex-row-reverse' : ''}`}>
              <Sparkles className="h-4 w-4" strokeWidth={2} />
              {t("howItWorksHero.badge")}
            </div>

            <h1 className={`font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl ${isRTL ? 'text-right' : 'text-left'}`}>
              {t("howItWorksHero.title1")} <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
                {t("howItWorksHero.titleHighlight")}
              </span>
            </h1>

            <p className={`mt-4 max-w-lg text-base leading-relaxed text-slate-800 dark:text-slate-100 ${isRTL ? 'text-right self-end' : 'text-left'}`}>
              {t("howItWorksHero.description")}
            </p>

            <div className={`mt-4 flex flex-wrap items-center gap-4 ${isRTL ? 'justify-end' : ''}`}>
              <div className={`inline-flex items-center gap-2 self-start rounded-full border border-indigo-200/30 bg-white/80 px-4 py-1.5 text-sm font-medium text-brand-600 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-slate-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Clock className="h-4 w-4" strokeWidth={2} />
                {t("howItWorksHero.badge1")}
              </div>
              <div className={`inline-flex items-center gap-2 self-start rounded-full border border-indigo-200/30 bg-white/80 px-4 py-1.5 text-sm font-medium text-brand-600 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-slate-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Smartphone className="h-4 w-4" strokeWidth={2} />
                {t("howItWorksHero.badge2")}
              </div>
            </div>

            {/* ✅ Mobile: Buttons RIGHT, Desktop: Buttons RIGHT */}
            <div className={`mt-6 flex flex-row items-center gap-4 ${isRTL ? 'justify-end' : ''}`}>
              <RouterLink
                to="/signup"
                className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-colors duration-300 hover:shadow-xl hover:shadow-indigo-500/35 hover:brightness-110 dark:shadow-indigo-500/20 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {t("howItWorksHero.ctaPrimary")}
                <ArrowIcon className="h-4 w-4 transition-none" />
              </RouterLink>
              <a
                href="#demo"
                className={`inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/70 px-6 py-2.5 text-sm font-semibold text-slate-600 transition-colors duration-300 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md dark:border-white/10 dark:bg-white/15 dark:text-slate-300 dark:hover:border-indigo-400 dark:hover:bg-white/20 dark:hover:text-indigo-400 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {t("howItWorksHero.ctaSecondary")}
              </a>
            </div>
          </div>

          {/* ✅ Desktop: Boxes LEFT via lg:order-1 in RTL, Mobile: Boxes stay in source order (below text) */}
          <div className={`flex flex-col justify-center gap-4 ${isRTL ? 'lg:order-1' : ''}`}>
            {STEPS.map((step, index) => (
              <div
                key={index}
                className={`transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ 
                  transitionDelay: `${index * 0.15}s`,
                  animation: isVisible ? 'floatStep 3.5s ease-in-out infinite' : 'none'
                }}
              >
                <MouseFollower
                  borderColor={step.borderColor}
                  glowColor={step.glowColor}
                  className={`bg-gradient-to-br ${step.bg} p-5 shadow-xl shadow-indigo-500/5 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 dark:shadow-indigo-500/10`}
                >
                  <div className={`relative flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="text-3xl font-display font-bold text-black dark:text-white">
                      {step.number}
                    </div>
                    <div className={`inline-flex rounded-2xl ${step.iconBg} p-2.5 transition-all duration-300 group-hover:scale-110`}>
                      <step.icon className="h-5 w-5" />
                    </div>
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <h3 className="font-display font-semibold text-slate-800 dark:text-white">
                        {t(step.titleKey)}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {t(step.descriptionKey)}
                      </p>
                    </div>
                  </div>
                </MouseFollower>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
