// src/sections/about/WhyWeExist.jsx
import { AlertCircle, Check, Zap, ShoppingBag, MessageSquare, FileText, Package, Link as LinkIcon, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

function RedMouseFollower({ children, className = "" }) {
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
        isHovering ? 'border-red-500/70 dark:border-red-400/60' : 'border-red-200/40 dark:border-red-700/20'
      } ${className}`}
    >
      {isHovering && (
        <div
          className={`pointer-events-none absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-red-500/40 via-red-400/20 to-transparent blur-2xl transition-all duration-200`}
          style={{ left: `${position.x}%`, top: `${position.y}%` }}
        />
      )}
      {children}
    </div>
  );
}

function GreenMouseFollower({ children, className = "" }) {
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
        isHovering ? 'border-green-500/70 dark:border-green-400/60' : 'border-green-200/40 dark:border-green-700/20'
      } ${className}`}
    >
      {isHovering && (
        <div
          className={`pointer-events-none absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-green-500/40 via-green-400/20 to-transparent blur-2xl transition-all duration-200`}
          style={{ left: `${position.x}%`, top: `${position.y}%` }}
        />
      )}
      {children}
    </div>
  );
}

export default function WhyWeExist() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { ref, isVisible } = useScrollReveal();
  const frictionItems = t("whyWeExist.frictionItems", { returnObjects: true });
  const solutionItems = t("whyWeExist.solutionItems", { returnObjects: true });

  // RTL mein Arrow flip
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    // ✅ LIGHT MODE: Halka purplish shade | DARK MODE: Same
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24 bg-[#faf7ff] dark:bg-transparent">
      
      {/* ✅ LIGHT MODE PURPLE SHADE */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-100/40 via-transparent to-transparent dark:hidden" />

      <div className="pointer-events-none absolute -top-20 right-0 h-[30rem] w-[30rem] rounded-full bg-indigo-400/8 blur-3xl dark:bg-indigo-400/12" />
      <div className="pointer-events-none absolute -bottom-20 left-0 h-[30rem] w-[30rem] rounded-full bg-purple-400/8 blur-3xl dark:bg-purple-400/12" />

      <div className={`relative mx-auto max-w-content scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="mb-8 text-center">
          <div className={`mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-indigo-500/30 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Sparkles className="h-3.5 w-3.5" />
            {t("whyWeExist.label")}
          </div>
          <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
            {t("whyWeExist.title1")} <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">{t("whyWeExist.titleHighlight")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600 dark:text-slate-300">{t("whyWeExist.subtitle")}</p>
        </div>

        {/* Transformation Flow */}
        <div className={`relative grid grid-cols-1 gap-8 lg:grid-cols-2 ${isRTL ? 'lg:grid-flow-dense' : ''}`}>
          
          {/* Creative Center Arrow - RTL mein flip */}
          <div className="absolute top-1/2 left-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-green-500 shadow-xl shadow-indigo-500/20">
              <ArrowIcon className="h-6 w-6 text-white" />
            </div>
          </div>

          {/* Red / Friction - Creative Numbered Cards - RTL: Right side */}
          <RedMouseFollower className={`bg-gradient-to-br from-red-100/80 to-red-200/40 p-6 shadow-xl shadow-red-500/5 hover:shadow-2xl hover:shadow-red-500/20 dark:from-red-900/50 dark:to-red-800/40 dark:shadow-red-500/10 ${isRTL ? 'lg:order-2' : ''}`}>
            <div className={`relative ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className={`mb-4 flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30 transition-all duration-300 group-hover:scale-110 dark:from-red-600 dark:to-red-700">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold text-red-700 dark:text-red-400">{t("whyWeExist.frictionTitle")}</h3>
              </div>
              <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">{t("whyWeExist.frictionDesc")}</p>
              
              {/* Creative Timeline */}
              <div className="relative space-y-4">
              {frictionItems.map((item, index) => (
                <li key={index} className={`flex items-start gap-3 text-slate-700 dark:text-slate-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                <div>
                  <span className="font-semibold text-slate-800 dark:text-white">{item.title}</span>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{item.desc}</p>
                  </div>
                </li>
              ))}
            </div>
            </div>
          </RedMouseFollower>

          {/* Green / Solution - Creative Numbered Cards - RTL: Left side */}
          <GreenMouseFollower className={`bg-gradient-to-br from-green-100/80 to-green-200/40 p-6 shadow-xl shadow-green-500/5 hover:shadow-2xl hover:shadow-green-500/20 dark:from-green-900/50 dark:to-green-800/40 dark:shadow-green-500/10 ${isRTL ? 'lg:order-1' : ''}`}>
            <div className={`relative ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className={`mb-4 flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/30 transition-all duration-300 group-hover:scale-110 dark:from-green-600 dark:to-emerald-700">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold text-green-700 dark:text-green-400">{t("whyWeExist.solutionTitle")}</h3>
              </div>
              <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">{t("whyWeExist.solutionDesc")}</p>
              
              {/* Creative Timeline */}
              <div className="relative space-y-4">
                {solutionItems.map((item, index) => (
                <li key={index} className={`flex items-start gap-3 text-slate-700 dark:text-slate-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <LinkIcon className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                <div>
                  <span className="font-semibold text-slate-800 dark:text-white">{item.title}</span>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{item.desc}</p>
                </div>
                </li>
  )             )}
              </div>
            </div>
          </GreenMouseFollower>
        </div>
      </div>
    </section>
  );
}