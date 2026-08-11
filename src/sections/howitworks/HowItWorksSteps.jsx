// src/sections/howitworks/HowItWorksSteps.jsx
import { Sparkles, Store, Package, Share2, Zap, Clock, Check, User, Image, Link, Smartphone } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useState, useRef } from "react";

const STEPS = [
  {
    icon: User,
    number: "01",
    title: "Create your shop",
    description: "Sign up, name your store, pick your URL. You get a live link you can paste anywhere. No DNS, no deploy, no drama.",
    subItems: [
      "Create your account",
      "Add store name and details",
      "Get your link (stallio.shop/you)"
    ],
    bg: "from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20",
    iconBg: "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400",
    borderColor: "border-amber-500/70 dark:border-amber-400/60",
    glowColor: "from-amber-500/40 via-amber-400/20 to-transparent",
    subIconColor: "text-amber-500 dark:text-amber-400",
  },
  {
    icon: Image,
    number: "02",
    title: "Add your products",
    description: "Photos, prices, short descriptions. One catalog you can refine anytime. Buyers see clarity, not chaos.",
    subItems: [
      "Add product photos",
      "Set prices and descriptions",
      "Keep one organized catalog"
    ],
    bg: "from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20",
    iconBg: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400",
    borderColor: "border-blue-500/70 dark:border-blue-400/60",
    glowColor: "from-blue-500/40 via-blue-400/20 to-transparent",
    subIconColor: "text-blue-500 dark:text-blue-400",
  },
  {
    icon: Share2,
    number: "03",
    title: "Share and take orders",
    description: "Same link in bio, stories, and chats. They browse on the phone. You track everything in your dashboard.",
    subItems: [
      "Put the link in your profile or bio",
      "Share in chat or social posts",
      "Track orders in one place"
    ],
    bg: "from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20",
    iconBg: "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400",
    borderColor: "border-purple-500/70 dark:border-purple-400/60",
    glowColor: "from-purple-500/40 via-purple-400/20 to-transparent",
    subIconColor: "text-purple-500 dark:text-purple-400",
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

export default function HowItWorksSteps() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute -top-20 right-0 h-[30rem] w-[30rem] rounded-full bg-indigo-400/8 blur-3xl dark:bg-indigo-400/12" />
      <div className="pointer-events-none absolute -bottom-20 left-0 h-[30rem] w-[30rem] rounded-full bg-purple-400/8 blur-3xl dark:bg-purple-400/12" />

      <div className={`relative mx-auto max-w-content scroll-reveal ${isVisible ? 'visible' : ''}`}>
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block font-mono text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            How It Works
          </span>
          <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
            Open. List. <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
                Share
              </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Three deliberate beats so you ship a storefront that feels intentional, not improvised.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <div key={index}>
              <MouseFollower
                borderColor={step.borderColor}
                glowColor={step.glowColor}
                className={`bg-gradient-to-br ${step.bg} p-6 shadow-xl shadow-indigo-500/5 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 dark:shadow-indigo-500/10 h-full`}
              >
                <div className="relative flex h-full flex-col">
                  {/* Step Number + Icon Row */}
                  <div className="flex items-start justify-between">
                    <div className="text-3xl font-display font-bold text-black dark:text-white">
                      {step.number}
                    </div>
                    <div className={`inline-flex rounded-2xl ${step.iconBg} p-2.5 transition-all duration-300 group-hover:scale-110`}>
                      <step.icon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mt-3 font-display text-lg font-semibold text-slate-800 dark:text-white">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-1 flex-1 text-sm text-slate-600 dark:text-slate-300">
                    {step.description}
                  </p>

                  {/* Sub Items with Icons */}
                  {step.subItems && (
                    <ul className="mt-4 space-y-2 border-t border-indigo-200/30 pt-4 dark:border-indigo-800/30">
                      {step.subItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                          <Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${step.subIconColor}`} strokeWidth={2.5} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
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