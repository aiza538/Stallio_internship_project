import { Store, Package, Link, ArrowRight, Zap, Clock } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useState, useRef } from "react";

const STEPS = [
  {
    icon: Store,
    title: "Open Your Shop",
    description: "Name it, add basics, pick your URL path no staging servers, no theme rabbit holes.",
    bg: "from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20",
    iconBg: "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400",
    borderColor: "border-amber-500/70 dark:border-amber-400/60",
    glowColor: "from-amber-500/40 via-amber-400/20 to-transparent",
    highlight: "UNDER FIVE MINUTES",
  },
  {
    icon: Package,
    title: "List Products",
    description: "Photos, price, stock, ready to share. No spreadsheet gymnastics needed.",
    bg: "from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20",
    iconBg: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400",
    borderColor: "border-blue-500/70 dark:border-blue-400/60",
    glowColor: "from-blue-500/40 via-blue-400/20 to-transparent",
    highlight: "NO SPREADSHEET GYMNASTICS",
  },
  {
    icon: Link,
    title: "Drop the Link",
    description: "Bio, stories, DMs same link everywhere. Orders land in your dashboard.",
    bg: "from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20",
    iconBg: "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400",
    borderColor: "border-purple-500/70 dark:border-purple-400/60",
    glowColor: "from-purple-500/40 via-purple-400/20 to-transparent",
    highlight: "ORDERS LAND IN YOUR DASHBOARD",
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

export default function HowItWorks() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute -top-20 left-0 h-[30rem] w-[30rem] rounded-full bg-indigo-400/8 blur-3xl dark:bg-indigo-400/12" />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-[30rem] w-[30rem] rounded-full bg-violet-400/8 blur-3xl dark:bg-violet-400/12" />
      
      <div className={`relative mx-auto max-w-content scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block font-mono text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            How It Works
          </span>
          <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
            Three moves. <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
            You're live.
          </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            No staging servers. No theme rabbit holes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center">
              <MouseFollower
                borderColor={step.borderColor}
                glowColor={step.glowColor}
                className={`w-full bg-gradient-to-br ${step.bg} p-6 shadow-xl shadow-indigo-500/5 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 dark:shadow-indigo-500/10`}
              >
                <div className="relative flex min-h-[280px] flex-col items-center justify-center text-center">
                  <div className="mb-2 text-2xl font-display font-bold text-black dark:text-white">
                    Step {index + 1}
                  </div>

                  <div className={`inline-flex rounded-2xl ${step.iconBg} p-3 transition-all duration-300 group-hover:scale-110`}>
                    <step.icon className="h-8 w-8" />
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-slate-800 dark:text-white">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {step.description}
                  </p>

                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-indigo-100/80 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                    <Zap className="h-3 w-3" />
                    {step.highlight}
                  </div>
                </div>
              </MouseFollower>

              {index < STEPS.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 md:block">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg dark:bg-slate-800">
                    <ArrowRight className="h-4 w-4 text-indigo-500 dark:text-indigo-400" strokeWidth={2.5} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Three moves. You're live. No staging servers. No theme rabbit holes.
          </p>
        </div>
      </div>
    </section>
  );
}