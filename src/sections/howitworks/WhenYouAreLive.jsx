// src/sections/howitworks/WhenYouAreLive.jsx
import { 
  Sparkles, LayoutDashboard, CreditCard, 
  Smartphone, ShoppingCart, Tag, FileText
} from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useState, useRef } from "react";

const FEATURES = [
  {
    icon: LayoutDashboard,
    title: "Command center",
    description: "Orders, products, and requests in one view. Update stock between deliveries without opening ten apps.",
    subItems: [
      "Mark paid, ship, and download invoice PDFs",
      "Coupons, delivery, and stock in one place",
      "Export orders or add a manual phone order"
    ],
    bg: "from-amber-200/80 to-amber-100 dark:from-amber-900/60 dark:to-amber-800/60",
    iconBg: "bg-amber-200 text-amber-700 dark:bg-amber-800/70 dark:text-amber-400",
    borderColor: "border-amber-500/70 dark:border-amber-400/60",
    glowColor: "from-amber-500/40 via-amber-400/20 to-transparent",
  },
  {
    icon: Smartphone,
    title: "Thumb friendly",
    description: "Categories, cart, coupons, and checkout on the phone. Buyers can switch English, Spanish, or Arabic on your store.",
    badges: [
      { icon: ShoppingCart, label: "CART" },
      { icon: Tag, label: "COUPONS" },
      { icon: FileText, label: "INVOICES" }
    ],
    bg: "from-blue-200/80 to-blue-100 dark:from-blue-900/60 dark:to-blue-800/60",
    iconBg: "bg-blue-200 text-blue-700 dark:bg-blue-800/70 dark:text-blue-400",
    borderColor: "border-blue-500/70 dark:border-blue-400/60",
    glowColor: "from-blue-500/40 via-blue-400/20 to-transparent",
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

export default function WhenYouAreLive() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute -top-20 right-0 h-[30rem] w-[30rem] rounded-full bg-indigo-400/8 blur-3xl dark:bg-indigo-400/12" />
      <div className="pointer-events-none absolute -bottom-20 left-0 h-[30rem] w-[30rem] rounded-full bg-purple-400/8 blur-3xl dark:bg-purple-400/12" />

      <div className={`relative mx-auto max-w-content scroll-reveal ${isVisible ? 'visible' : ''}`}>
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block font-mono text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            When You Are Live
          </span>
          <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
            Buyers see polish. <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
                You see control.
              </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            A fast storefront on the outside. A calm dashboard on the inside.
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
                className={`bg-gradient-to-br ${feature.bg} p-8 shadow-xl shadow-indigo-500/5 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 dark:shadow-indigo-500/10 h-full`}
              >
                <div className="relative flex flex-col items-start">
                  <div className={`inline-flex rounded-2xl ${feature.iconBg} p-3.5 transition-all duration-300 group-hover:scale-110`}>
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-slate-800 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>

                  {/* Sub Items - Command Center */}
                  {feature.subItems && (
                    <ul className="mt-4 space-y-2">
                      {feature.subItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-500 dark:text-slate-400">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-400" />
                          {item}
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
                          {badge.label}
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