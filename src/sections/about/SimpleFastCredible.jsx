import { Sparkles, Zap, Shield } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useState, useRef } from "react";

const FEATURES = [
  {
    icon: Sparkles,
    title: "Simple",
    description: "No code, no theme maze",
    bg: "from-amber-100/60 to-amber-200/30 dark:from-amber-800/40 dark:to-amber-700/25",
    iconBg: "bg-amber-100 text-amber-700 dark:bg-amber-700/50 dark:text-amber-300",
    borderColor: "border-amber-500/70 dark:border-amber-400/60",
    glowColor: "from-amber-500/40 via-amber-400/20 to-transparent",
    lineColor: "bg-amber-400 dark:bg-amber-400",
  },
  {
    icon: Zap,
    title: "Fast",
    description: "Draft a store in minutes",
    bg: "from-blue-100/60 to-blue-200/30 dark:from-blue-800/40 dark:to-blue-700/25",
    iconBg: "bg-blue-100 text-blue-700 dark:bg-blue-700/50 dark:text-blue-300",
    borderColor: "border-blue-500/70 dark:border-blue-400/60",
    glowColor: "from-blue-500/40 via-blue-400/20 to-transparent",
    lineColor: "bg-blue-400 dark:bg-blue-400",
  },
  {
    icon: Shield,
    title: "Credible",
    description: "A link buyers recognize",
    bg: "from-purple-100/60 to-purple-200/30 dark:from-purple-800/40 dark:to-purple-700/25",
    iconBg: "bg-purple-100 text-purple-700 dark:bg-purple-700/50 dark:text-purple-300",
    borderColor: "border-purple-500/70 dark:border-purple-400/60",
    glowColor: "from-purple-500/40 via-purple-400/20 to-transparent",
    lineColor: "bg-purple-400 dark:bg-purple-400",
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

export default function SimpleFastCredible() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute -top-20 right-0 h-[30rem] w-[30rem] rounded-full bg-indigo-400/8 blur-3xl dark:bg-indigo-400/12" />
      <div className="pointer-events-none absolute -bottom-20 left-0 h-[30rem] w-[30rem] rounded-full bg-purple-400/8 blur-3xl dark:bg-purple-400/12" />
      
      <div className={`relative mx-auto max-w-content scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block font-mono text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Simple. Fast. Credible.
          </span>
          <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
            Built for <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
                    Momentum
                </span>
          </h2>
        </div>

        <div className="relative flex flex-col items-center justify-center gap-8 md:flex-row">
          {FEATURES.map((feature, index) => (
            <div key={index} className="relative flex w-full max-w-xs flex-col items-center">
              <MouseFollower
                borderColor={feature.borderColor}
                glowColor={feature.glowColor}
                className={`w-full bg-gradient-to-br ${feature.bg} p-8 text-center shadow-xl shadow-indigo-500/5 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 dark:shadow-indigo-500/10 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <div className={`mx-auto inline-flex rounded-2xl ${feature.iconBg} p-4 transition-all duration-300 group-hover:scale-110`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold text-slate-800 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>
                </div>
              </MouseFollower>

              <div className={`mt-3 h-1 w-12 rounded-full ${feature.lineColor}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}