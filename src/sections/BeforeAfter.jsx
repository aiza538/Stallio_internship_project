import { X, Check, ArrowRight, AlertCircle } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useState, useRef } from "react";

const BEFORE_ITEMS = [
  { icon: AlertCircle, text: "Multiple links shared with customers" },
  { icon: AlertCircle, text: "Customers get confused where to buy" },
  { icon: AlertCircle, text: "You stay unorganized" },
  { icon: AlertCircle, text: "Hard to track orders" },
];

const AFTER_ITEMS = [
  { icon: Check, text: "One link for catalog and orders" },
  { icon: Check, text: "Customers order directly" },
  { icon: Check, text: "You stay organized" },
  { icon: Check, text: "Easy order tracking" },
];

// Mouse Follower Component - Only Box Highlight
function MouseFollower({ children, className = "", color = "indigo" }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  const colorMap = {
    red: "from-red-500/40 via-red-400/20 to-transparent",
    green: "from-green-500/40 via-green-400/20 to-transparent",
    indigo: "from-indigo-500/40 via-indigo-400/20 to-transparent",
  };

  const borderColorMap = {
    red: "border-red-500/70 dark:border-red-400/60",
    green: "border-green-500/70 dark:border-green-400/60",
    indigo: "border-indigo-500/70 dark:border-indigo-400/60",
  };

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
        isHovering ? borderColorMap[color] : ''
      } ${className}`}
    >
      {/* Mouse Follower Glow - Only Box Background */}
      {isHovering && (
        <div
          className={`pointer-events-none absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r ${colorMap[color]} blur-2xl transition-all duration-200`}
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

export default function BeforeAfter() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute -top-20 left-0 h-[30rem] w-[30rem] rounded-full bg-indigo-400/8 blur-3xl dark:bg-indigo-400/12" />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-[30rem] w-[30rem] rounded-full bg-violet-400/8 blur-3xl dark:bg-violet-400/12" />

      <div className="relative mx-auto max-w-content">
        {/* Section Header */}
        <div className={`mb-12 text-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <span className="mb-3 inline-block font-mono text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Before vs After
          </span>
          <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
            See The Difference
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            See how Stallio transforms your selling experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Before - Without Stallio */}
          <MouseFollower 
            color="red" 
            className={`bg-gradient-to-br from-red-100/60 to-red-200/30 p-6 shadow-xl shadow-red-500/5 hover:shadow-2xl hover:shadow-red-500/20 dark:from-red-950/50 dark:to-red-900/30 dark:shadow-red-500/10 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} 
            style={{ transitionDelay: '0.1s' }}
          >
            <div className="relative">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full bg-red-200/80 p-2.5 shadow-md shadow-red-500/20 transition-all duration-300 group-hover:scale-110 dark:bg-red-900/60">
                  <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-red-700 dark:text-red-400">
                  Without Stallio
                </h3>
              </div>
              <ul className="space-y-3">
                {BEFORE_ITEMS.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                    <span className="text-sm">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </MouseFollower>

          {/* After - With Stallio */}
          <MouseFollower 
            color="green" 
            className={`bg-gradient-to-br from-green-100/60 to-green-200/30 p-6 shadow-xl shadow-green-500/5 hover:shadow-2xl hover:shadow-green-500/20 dark:from-green-950/50 dark:to-green-900/30 dark:shadow-green-500/10 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} 
            style={{ transitionDelay: '0.2s' }}
          >
            <div className="relative">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full bg-green-200/80 p-2.5 shadow-md shadow-green-500/20 transition-all duration-300 group-hover:scale-110 dark:bg-green-900/60">
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-green-700 dark:text-green-400">
                  With Stallio
                </h3>
              </div>
              <ul className="space-y-3">
                {AFTER_ITEMS.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                    <span className="text-sm">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </MouseFollower>
        </div>

        {/* Comparison Bar */}
        <div className={`mt-8 flex items-center justify-center gap-4 transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
            <div className="h-3 w-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-lg shadow-red-500/30" />
            <span>Confusing</span>
          </div>
          <ArrowRight className="h-5 w-5 text-indigo-400" />
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
            <div className="h-3 w-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 shadow-lg shadow-green-500/30" />
            <span>Clear & Simple</span>
          </div>
        </div>

        {/* CTA */}
        <div className={`mt-10 text-center transition-all duration-700 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <a
            href="#start-free"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/35"
          >
            <span className="relative z-10">Start Your Free Trial</span>
            <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-violet-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </a>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            No credit card required. Get started in minutes.
          </p>
        </div>
      </div>
    </section>
  );
}