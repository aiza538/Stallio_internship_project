// src/sections/about/SimpleFastCredible.jsx
import { Sparkles, Zap, Shield } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useRef, useState } from "react";

const FEATURES = [
  {
    icon: Sparkles,
    title: "Simple",
    description: "No code, no theme maze",
    bg: "from-amber-200/80 to-amber-100 dark:from-amber-900/60 dark:to-amber-800/60",
    iconBg: "bg-amber-200 text-amber-700 dark:bg-amber-800/70 dark:text-amber-400",
    borderColor: "border-amber-500/70 dark:border-amber-400/60",
    glowColor: "rgba(245, 158, 11, 0.3)",
    lineColor: "bg-amber-400 dark:bg-amber-400",
  },
  {
    icon: Zap,
    title: "Fast",
    description: "Draft a store in minutes",
    bg: "from-blue-200/80 to-blue-100 dark:from-blue-900/60 dark:to-blue-800/60",
    iconBg: "bg-blue-200 text-blue-700 dark:bg-blue-800/70 dark:text-blue-400",
    borderColor: "border-blue-500/70 dark:border-blue-400/60",
    glowColor: "rgba(59, 130, 246, 0.3)",
    lineColor: "bg-blue-400 dark:bg-blue-400",
  },
  {
    icon: Shield,
    title: "Credible",
    description: "A link buyers recognize",
    bg: "from-purple-200/80 to-purple-100 dark:from-purple-900/60 dark:to-purple-800/60",
    iconBg: "bg-purple-200 text-purple-700 dark:bg-purple-800/70 dark:text-purple-400",
    borderColor: "border-purple-500/70 dark:border-purple-400/60",
    glowColor: "rgba(168, 85, 247, 0.3)",
    lineColor: "bg-purple-400 dark:bg-purple-400",
  },
];

export default function SimpleFastCredible() {
  const { ref, isVisible } = useScrollReveal();
  
  const [hoverIndex, setHoverIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

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
              <div
                ref={index === hoverIndex ? cardRef : null}
                onMouseMove={index === hoverIndex ? handleMouseMove : undefined}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                className={`relative w-full rounded-2xl border-2 ${feature.borderColor} bg-gradient-to-br ${feature.bg} p-8 text-center shadow-xl shadow-indigo-500/5 backdrop-blur-md transition-all duration-300 overflow-hidden hover:shadow-xl hover:-translate-y-1 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Mouse Follower Glow Effect */}
                {hoverIndex === index && (
                  <div
                    className="pointer-events-none absolute rounded-full blur-[50px] transition-all duration-100"
                    style={{
                      width: "200px",
                      height: "200px",
                      left: mousePos.x - 100,
                      top: mousePos.y - 100,
                      backgroundColor: feature.glowColor,
                    }}
                  />
                )}

                <div className="relative z-10">
                  <div className={`mx-auto inline-flex rounded-2xl ${feature.iconBg} p-4 transition-transform duration-300 hover:scale-110`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold text-slate-800 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>
                </div>
              </div>

              <div className={`mt-3 h-1 w-12 rounded-full ${feature.lineColor}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}