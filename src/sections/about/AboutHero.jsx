// src/sections/about/AboutHero.jsx
import { Sparkles, Link as LinkIcon, Package, FileText, CreditCard, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

const FEATURE_COLORS = [
  { bg: "from-amber-200/80 to-amber-100 dark:from-amber-900/60 dark:to-amber-800/60", iconBg: "bg-amber-200 text-amber-700 dark:bg-amber-800/70 dark:text-amber-400", borderColor: "border-amber-500/70 dark:border-amber-400/60", glowColor: "from-amber-500/40 via-amber-400/20 to-transparent" },
  { bg: "from-blue-200/80 to-blue-100 dark:from-blue-900/60 dark:to-blue-800/60", iconBg: "bg-blue-200 text-blue-700 dark:bg-blue-800/70 dark:text-blue-400", borderColor: "border-blue-500/70 dark:border-blue-400/60", glowColor: "from-blue-500/40 via-blue-400/20 to-transparent" },
  { bg: "from-purple-200/80 to-purple-100 dark:from-purple-900/60 dark:to-purple-800/60", iconBg: "bg-purple-200 text-purple-700 dark:bg-purple-800/70 dark:text-purple-400", borderColor: "border-purple-500/70 dark:border-purple-400/60", glowColor: "from-purple-500/40 via-purple-400/20 to-transparent" },
  { bg: "from-emerald-200/80 to-emerald-100 dark:from-emerald-900/60 dark:to-emerald-800/60", iconBg: "bg-emerald-200 text-emerald-700 dark:bg-emerald-800/70 dark:text-emerald-400", borderColor: "border-emerald-500/70 dark:border-emerald-400/60", glowColor: "from-emerald-500/40 via-emerald-400/20 to-transparent" },
];

const FEATURE_ICONS = [LinkIcon, Package, FileText, CreditCard];

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

export default function AboutHero() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { ref, isVisible } = useScrollReveal();
  const features = t("aboutHero.features", { returnObjects: true });

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-70 blur-sm dark:opacity-60"
        style={{
          backgroundImage: "url('/images/about_hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/30 via-white/10 to-white/40 dark:from-slate-900/30 dark:via-slate-900/10 dark:to-slate-900/40" />
      <div className="absolute inset-0 z-0 bg-white/0 dark:bg-slate-900/0" />
      
      <div className="pointer-events-none absolute -top-40 left-1/2 z-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-400/20" />
      <div className="pointer-events-none absolute -bottom-40 right-0 z-0 h-[30rem] w-[30rem] rounded-full bg-purple-400/12 blur-3xl dark:bg-purple-400/15" />
      
      <div className={`relative z-10 mx-auto max-w-content scroll-reveal ${isVisible ? 'visible' : ''}`}>
        {/* RTL mein: Text column -> order-2 (right side), Feature boxes -> order-1 (left side) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className={`flex flex-col justify-center ${isRTL ? 'lg:order-2 text-right' : 'text-left'}`}>
            <div className={`inline-flex items-center gap-2 self-start rounded-full border border-indigo-200/30 bg-white/70 px-4 py-1.5 text-sm font-medium text-brand-600 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-slate-300 ${isRTL ? 'lg:self-end self-end flex-row-reverse' : ''}`}>
                <Sparkles className="h-4 w-4" strokeWidth={2} />
                {t("aboutHero.badge")}
            </div>

            <h1 className={`font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl ${isRTL ? 'text-right' : 'text-left'}`}>
              {t("aboutHero.title1")}
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
                {t("aboutHero.titleHighlight")}
              </span>
            </h1>

            <p className={`mt-4 max-w-lg text-base leading-relaxed text-slate-800 dark:text-slate-100 ${isRTL ? 'text-right self-end' : 'text-left'}`}>
              {t("aboutHero.description")}
            </p>

            <div className={`mt-6 flex flex-wrap items-center gap-4 ${isRTL ? 'justify-end' : ''}`}>
              <Link
                to="/signup"
                className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/35 hover:brightness-110 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {t("aboutHero.startFree")}
                <Sparkles className="h-4 w-4 transition-none" />
              </Link>
              <a
                href="#demo"
                className={`group inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/70 px-6 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md dark:border-white/10 dark:bg-white/15 dark:text-slate-300 dark:hover:border-indigo-400 dark:hover:bg-white/20 dark:hover:text-indigo-400 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {t("aboutHero.viewDemo")}
              </a>
            </div>
          </div>

          {/* RTL mein Feature Boxes Left */}
          <div className={`flex flex-col gap-5 ${isRTL ? 'lg:order-1' : ''}`}>
            {features.map((feature, index) => {
              const color = FEATURE_COLORS[index % FEATURE_COLORS.length];
              const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];

              return (
                <MouseFollower
                  key={index}
                  borderColor={color.borderColor}
                  glowColor={color.glowColor}
                  className={`bg-gradient-to-br ${color.bg} p-4 shadow-lg shadow-indigo-500/5 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/15 dark:shadow-indigo-500/5`}
                >
                  <div className={`relative flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${color.iconBg} transition-all duration-300 group-hover:scale-110`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                      <h4 className="font-display text-base font-semibold text-slate-800 dark:text-white">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                    <div className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-tr-xl border-r border-t border-violet-300/20 transition-all duration-300 group-hover:border-violet-400/40 dark:border-violet-500/10 dark:group-hover:border-violet-400/30" />
                  </div>
                </MouseFollower>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
