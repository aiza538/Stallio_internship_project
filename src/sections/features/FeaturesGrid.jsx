// src/sections/features/FeaturesGrid.jsx
import { 
  Store, Link, Package, LayoutDashboard, Smartphone, 
  Tag, FileText, Truck, Layers, CreditCard, BarChart, 
  MessageCircle, Headphones, Sparkles
} from "lucide-react";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const FEATURES = [
  {
    icon: Store,
    titleKey: "featuresGrid.features.step1.title",
    descriptionKey: "featuresGrid.features.step1.description",
    subItemsKeys: [
      "featuresGrid.features.step1.subItems.0",
      "featuresGrid.features.step1.subItems.1",
      "featuresGrid.features.step1.subItems.2"
    ],
    bg: "from-amber-200/80 to-amber-100 dark:from-amber-900/60 dark:to-amber-800/60",
    iconBg: "bg-amber-200 text-amber-700 dark:bg-amber-800/70 dark:text-amber-400",
    borderColor: "border-amber-500/70 dark:border-amber-400/60",
    glowColor: "from-amber-500/40 via-amber-400/20 to-transparent",
    themeColor: "#D97706",
    darkThemeColor: "#fbbf24",
    isLarge: true 
  },
  {
    icon: Link,
    titleKey: "featuresGrid.features.step2.title",
    descriptionKey: "featuresGrid.features.step2.description",
    bg: "from-blue-200/80 to-blue-100 dark:from-blue-900/60 dark:to-blue-800/60",
    iconBg: "bg-blue-200 text-blue-700 dark:bg-blue-800/70 dark:text-blue-400",
    borderColor: "border-blue-500/70 dark:border-blue-400/60",
    glowColor: "from-blue-500/40 via-blue-400/20 to-transparent",
    themeColor: "#2563EB",
    darkThemeColor: "#60a5fa",
  },
  {
    icon: Package,
    titleKey: "featuresGrid.features.step3.title",
    descriptionKey: "featuresGrid.features.step3.description",
    bg: "from-purple-200/80 to-purple-100 dark:from-purple-900/60 dark:to-purple-800/60",
    iconBg: "bg-purple-200 text-purple-700 dark:bg-purple-800/70 dark:text-purple-400",
    borderColor: "border-purple-500/70 dark:border-purple-400/60",
    glowColor: "from-purple-500/40 via-purple-400/20 to-transparent",
    themeColor: "#7C3AED",
    darkThemeColor: "#a78bfa",
  },
  {
    icon: LayoutDashboard,
    titleKey: "featuresGrid.features.step4.title",
    descriptionKey: "featuresGrid.features.step4.description",
    bg: "from-rose-200/80 to-rose-100 dark:from-rose-900/60 dark:to-rose-800/60",
    iconBg: "bg-rose-200 text-rose-700 dark:bg-rose-800/70 dark:text-rose-400",
    borderColor: "border-rose-500/70 dark:border-rose-400/60",
    glowColor: "from-rose-500/40 via-rose-400/20 to-transparent",
    themeColor: "#E11D48",
    darkThemeColor: "#fb7185",
  },
  {
    icon: Smartphone,
    titleKey: "featuresGrid.features.step5.title",
    descriptionKey: "featuresGrid.features.step5.description",
    bg: "from-emerald-200/80 to-emerald-100 dark:from-emerald-900/60 dark:to-emerald-800/60",
    iconBg: "bg-emerald-200 text-emerald-700 dark:bg-emerald-800/70 dark:text-emerald-400",
    borderColor: "border-emerald-500/70 dark:border-emerald-400/60",
    glowColor: "from-emerald-500/40 via-emerald-400/20 to-transparent",
    themeColor: "#059669",
    darkThemeColor: "#34d399",
  },
  {
    icon: Tag,
    titleKey: "featuresGrid.features.step6.title",
    descriptionKey: "featuresGrid.features.step6.description",
    bg: "from-cyan-200/80 to-cyan-100 dark:from-cyan-900/60 dark:to-cyan-800/60",
    iconBg: "bg-cyan-200 text-cyan-700 dark:bg-cyan-800/70 dark:text-cyan-400",
    borderColor: "border-cyan-500/70 dark:border-cyan-400/60",
    glowColor: "from-cyan-500/40 via-cyan-400/20 to-transparent",
    themeColor: "#0891B2",
    darkThemeColor: "#22d3ee",
  },
  {
    icon: FileText,
    titleKey: "featuresGrid.features.step7.title",
    descriptionKey: "featuresGrid.features.step7.description",
    bg: "from-indigo-200/80 to-indigo-100 dark:from-indigo-900/60 dark:to-indigo-800/60",
    iconBg: "bg-indigo-200 text-indigo-700 dark:bg-indigo-800/70 dark:text-indigo-400",
    borderColor: "border-indigo-500/70 dark:border-indigo-400/60",
    glowColor: "from-indigo-500/40 via-indigo-400/20 to-transparent",
    themeColor: "#4F46E5",
    darkThemeColor: "#818cf8",
  },
  {
    icon: Truck,
    titleKey: "featuresGrid.features.step8.title",
    descriptionKey: "featuresGrid.features.step8.description",
    bg: "from-teal-200/80 to-teal-100 dark:from-teal-900/60 dark:to-teal-800/60",
    iconBg: "bg-teal-200 text-teal-700 dark:bg-teal-800/70 dark:text-teal-400",
    borderColor: "border-teal-500/70 dark:border-teal-400/60",
    glowColor: "from-teal-500/40 via-teal-400/20 to-transparent",
    themeColor: "#0D9488",
    darkThemeColor: "#2dd4bf",
  },
  {
    icon: Layers,
    titleKey: "featuresGrid.features.step9.title",
    descriptionKey: "featuresGrid.features.step9.description",
    bg: "from-orange-200/80 to-orange-100 dark:from-orange-900/60 dark:to-orange-800/60",
    iconBg: "bg-orange-200 text-orange-700 dark:bg-orange-800/70 dark:text-orange-400",
    borderColor: "border-orange-500/70 dark:border-orange-400/60",
    glowColor: "from-orange-500/40 via-orange-400/20 to-transparent",
    themeColor: "#EA580C",
    darkThemeColor: "#fb923c",
  },
  {
    icon: CreditCard,
    titleKey: "featuresGrid.features.step10.title",
    descriptionKey: "featuresGrid.features.step10.description",
    bg: "from-violet-200/80 to-violet-100 dark:from-violet-900/60 dark:to-violet-800/60",
    iconBg: "bg-violet-200 text-violet-700 dark:bg-violet-800/70 dark:text-violet-400",
    borderColor: "border-violet-500/70 dark:border-violet-400/60",
    glowColor: "from-violet-500/40 via-violet-400/20 to-transparent",
    themeColor: "#8B5CF6",
    darkThemeColor: "#a78bfa",
  },
  {
    icon: BarChart,
    titleKey: "featuresGrid.features.step11.title",
    descriptionKey: "featuresGrid.features.step11.description",
    bg: "from-pink-200/80 to-pink-100 dark:from-pink-900/60 dark:to-pink-800/60",
    iconBg: "bg-pink-200 text-pink-700 dark:bg-pink-800/70 dark:text-pink-400",
    borderColor: "border-pink-500/70 dark:border-pink-400/60",
    glowColor: "from-pink-500/40 via-pink-400/20 to-transparent",
    themeColor: "#DB2777",
    darkThemeColor: "#f472b6",
  },
  {
    icon: MessageCircle,
    titleKey: "featuresGrid.features.step12.title",
    descriptionKey: "featuresGrid.features.step12.description",
    bg: "from-sky-200/80 to-sky-100 dark:from-sky-900/60 dark:to-sky-800/60",
    iconBg: "bg-sky-200 text-sky-700 dark:bg-sky-800/70 dark:text-sky-400",
    borderColor: "border-sky-500/70 dark:border-sky-400/60",
    glowColor: "from-sky-500/40 via-sky-400/20 to-transparent",
    themeColor: "#0EA5E9",
    darkThemeColor: "#38bdf8",
  },
  {
    icon: Headphones,
    titleKey: "featuresGrid.features.step13.title",
    descriptionKey: "featuresGrid.features.step13.description",
    bg: "from-lime-200/80 to-lime-100 dark:from-lime-900/60 dark:to-lime-800/60",
    iconBg: "bg-lime-200 text-lime-700 dark:bg-lime-800/70 dark:text-lime-400",
    borderColor: "border-lime-500/70 dark:border-lime-400/60",
    glowColor: "from-lime-500/40 via-lime-400/20 to-transparent",
    themeColor: "#84CC16",
    darkThemeColor: "#a3e635",
  },
];

function MouseFollower({ children, className = "", borderColor = "", glowColor = "", themeColor = "", darkThemeColor = "" }) {
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
      className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 ${
        isHovering ? borderColor : 'border-transparent'
      } ${className}`}
    >
      <div 
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, ${themeColor}, transparent)`
        }}
      />

      {isHovering && (
        <div
          className={`pointer-events-none absolute h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r ${glowColor} blur-3xl transition-all duration-200`}
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

export default function FeaturesGrid() {
  const { t } = useTranslation();

  // ✅ FIX: useScrollReveal ka ref poore (tall) section pe lagane ki bajaye
  // ek chhoti "sentinel" div pe lagaya hai. Hook ka visibility ratio
  // (visibleHeight / rect.height) hai — agar ref itne bade grid pe hota
  // (13 cards, 2000px+ tall), to uska 15% viewport mein aana bahut mushkil
  // hota aur isVisible kabhi true hi nahi hota (cards hamesha opacity:0
  // pe atke reh jaate — bilkul wahi bug jo screenshots mein dikh raha tha).
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
      className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24 bg-[#faf7ff] dark:bg-transparent"
    >
      {/* Sentinel: sirf trigger point, layout pe koi asar nahi */}
      <div ref={ref} className="absolute top-0 left-0 h-1 w-full" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-100/40 via-transparent to-transparent dark:hidden" />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-[30rem] w-[30rem] rounded-full bg-purple-400/8 blur-3xl dark:bg-purple-400/12" />
      
      <div className="relative mx-auto max-w-7xl">
        <div className={`mb-12 text-center scroll-reveal ${isVisible ? 'visible' : ''}`}>
          
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-white shadow-lg shadow-purple-500/30">
            <Sparkles className="h-4 w-4" />
            {t("featuresGrid.label")}
          </span>

          <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
            {t("featuresGrid.title1")}{" "} 
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
              {t("featuresGrid.titleHighlight")}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className={`group scroll-reveal ${isVisible ? 'visible' : ''} bg-gradient-to-br ${feature.bg} p-6 shadow-xl shadow-indigo-500/5 transition-all duration-700 hover:shadow-2xl hover:shadow-indigo-500/20 dark:shadow-indigo-500/10 rounded-2xl border-2 border-transparent hover:-translate-y-2 hover:rotate-1 ${
                feature.isLarge ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
              style={{ 
                transitionDelay: `${index * 0.1}s`
              }}
            >
              <div className="relative flex h-full flex-col items-start gap-4">
                
                <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <feature.icon className="h-32 w-32" strokeWidth={1} />
                </div>

                <div className="relative">
                  <div className={`absolute inset-0 rounded-full ${feature.iconBg} opacity-0 group-hover:opacity-50 animate-pulse`} />
                  <div className={`relative inline-flex rounded-2xl ${feature.iconBg} p-3 transition-all duration-500 group-hover:scale-110`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                </div>

                <div className={`${feature.isLarge ? 'space-y-3 sm:space-y-4' : 'space-y-2'}`}>
                  <h3 className={`font-display font-semibold text-slate-800 dark:text-white ${feature.isLarge ? 'text-2xl sm:text-4xl lg:text-5xl' : 'text-lg'}`}>
                    {t(feature.titleKey)}
                  </h3>
                  
                  <div className={`h-px w-12 bg-gradient-to-r ${feature.borderColor} opacity-50`} />
                  
                  <p className={`leading-relaxed text-slate-600 dark:text-slate-300 ${feature.isLarge ? 'text-base sm:text-lg' : 'text-sm'}`}>
                    {t(feature.descriptionKey)}
                  </p>
                  {feature.subItemsKeys && (
                    <ul className={`mt-3 space-y-1.5 text-slate-500 dark:text-slate-400 ${feature.isLarge ? 'text-sm sm:text-base' : 'text-xs'}`}>
                      {feature.subItemsKeys.map((subKey, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-indigo-400 shrink-0" />
                          {t(subKey)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
