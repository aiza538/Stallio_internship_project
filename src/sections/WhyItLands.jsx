// src/sections/about/WhyItLands.jsx
import { Shield, Zap, TrendingUp, Heart, Users, Clock } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useState, useRef } from "react";

const REASONS = [
  {
    icon: Shield,
    title: "Trusted by Sellers",
    description: "Join thousands of sellers who trust Stallio to power their business.",
    bg: "from-amber-200/80 to-amber-100 dark:from-amber-900/60 dark:to-amber-800/60",
    iconBg: "bg-amber-200 text-amber-700 dark:bg-amber-800/70 dark:text-amber-400",
    borderColor: "border-amber-500/70 dark:border-amber-400/60",
    glowColor: "from-amber-500/40 via-amber-400/20 to-transparent",
  },
  {
    icon: Zap,
    title: "Simple & Fast",
    description: "Get your store live in minutes. No coding, no complexity.",
    bg: "from-blue-200/80 to-blue-100 dark:from-blue-900/60 dark:to-blue-800/60",
    iconBg: "bg-blue-200 text-blue-700 dark:bg-blue-800/70 dark:text-blue-400",
    borderColor: "border-blue-500/70 dark:border-blue-400/60",
    glowColor: "from-blue-500/40 via-blue-400/20 to-transparent",
  },
  {
    icon: TrendingUp,
    title: "Grow Your Business",
    description: "Powerful tools to help you scale from startup to success.",
    bg: "from-purple-200/80 to-purple-100 dark:from-purple-900/60 dark:to-purple-800/60",
    iconBg: "bg-purple-200 text-purple-700 dark:bg-purple-800/70 dark:text-purple-400",
    borderColor: "border-purple-500/70 dark:border-purple-400/60",
    glowColor: "from-purple-500/40 via-purple-400/20 to-transparent",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join a growing community of sellers who support each other.",
    bg: "from-emerald-200/80 to-emerald-100 dark:from-emerald-900/60 dark:to-emerald-800/60",
    iconBg: "bg-emerald-200 text-emerald-700 dark:bg-emerald-800/70 dark:text-emerald-400",
    borderColor: "border-emerald-500/70 dark:border-emerald-400/60",
    glowColor: "from-emerald-500/40 via-emerald-400/20 to-transparent",
  },
];

// Mouse Follower Component
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

export default function WhyItLands() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute -top-20 right-0 h-[30rem] w-[30rem] rounded-full bg-indigo-400/8 blur-3xl dark:bg-indigo-400/12" />
      
      <div className={`relative mx-auto max-w-content scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block font-mono text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Why It Lands
          </span>
          <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
            Built for <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
            Real Sellers
          </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Everything you need to start, grow, and scale your business all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason, index) => (
            <MouseFollower
              key={index}
              borderColor={reason.borderColor}
              glowColor={reason.glowColor}
              className={`bg-gradient-to-br ${reason.bg} p-6 text-center shadow-xl shadow-indigo-500/5 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 dark:shadow-indigo-500/10`}
            >
              <div className="relative">
                <div className={`mx-auto inline-flex rounded-2xl ${reason.iconBg} p-3 transition-all duration-300 group-hover:scale-110`}>
                  <reason.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-slate-800 dark:text-white">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {reason.description}
                </p>
              </div>
            </MouseFollower>
          ))}
        </div>
      </div>
    </section>
  );
}