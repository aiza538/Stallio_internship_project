// src/sections/pricing/PricingHero.jsx
import { useState } from "react";
import { Link } from "react-router-dom"; // ✅ Already imported
import { Sparkles, Zap, Infinity, ArrowRight, Clock, Smartphone } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useState as useStateHook, useRef } from "react";

function MouseFollower({ children, className = "", borderColor = "", glowColor = "" }) {
  const [position, setPosition] = useStateHook({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useStateHook(false);
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
      className={`relative overflow-hidden rounded-xl border-2 transition-all duration-500 ${
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

export default function PricingHero() {
  const { ref, isVisible } = useScrollReveal();
  const [billingCycle, setBillingCycle] = useState("monthly");

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-32 bg-gradient-to-br from-indigo-50 via-purple-50 to-white dark:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] dark:from-[#2d1045] dark:via-[#0d071a] dark:to-[#0d071a]">
      
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/pricing_hero.jpg" 
          alt="Pricing Background" 
          className="h-full w-full object-cover opacity-60 dark:opacity-40 blur-lg" 
        />
      </div>

      <div className="absolute inset-0 z-0 bg-white/20 dark:bg-black/20" />

      <div className={`relative z-10 mx-auto max-w-7xl scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          
          <div className="flex flex-col justify-center gap-6">
            
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-indigo-200/30 bg-white/80 px-4 py-1.5 text-sm font-medium text-brand-600 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-slate-300">
              <Sparkles className="h-4 w-4" strokeWidth={2} />
              Simple, transparent pricing
            </div>

            <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl text-slate-900 dark:text-white">
              Simple numbers. <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
                One full product.
              </span>
            </h1>

            <p className="max-w-lg text-lg leading-relaxed text-slate-800 dark:text-slate-100">
              One month on us, then choose monthly or yearly. Same features either way: storefront, dashboard, and tools included.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-indigo-200/30 bg-white/80 px-4 py-1.5 text-sm font-medium text-brand-600 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-slate-300">
                <Clock className="h-4 w-4" strokeWidth={2} />
                From $5/mo after trial
              </div>
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-indigo-200/30 bg-white/80 px-4 py-1.5 text-sm font-medium text-brand-600 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-slate-300">
                <Smartphone className="h-4 w-4" strokeWidth={2} />
                No card to start
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              {/* ✅ Start Free → Signup */}
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/35 hover:brightness-110 dark:shadow-indigo-500/20"
              >
                Start Free
                <ArrowRight className="h-4 w-4 transition-none" />
              </Link>
              <Link
                to="#features"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/70 px-6 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md dark:border-white/10 dark:bg-white/15 dark:text-slate-300 dark:hover:border-indigo-400 dark:hover:bg-white/20 dark:hover:text-indigo-400"
              >
                What You Get
              </Link>
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end animate-on-load">
            <div 
              className={`transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ animation: isVisible ? 'floatStep 3.5s ease-in-out infinite' : 'none' }}
            >
              <div className="w-full max-w-md bg-white/80 dark:bg-indigo-950/40 backdrop-blur-lg border border-indigo-200/50 dark:border-white/10 p-6 rounded-3xl shadow-xl shadow-indigo-500/5 dark:shadow-2xl shadow-black/30">
                
                <div className="mb-6">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                    CHOOSE BILLING
                  </h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    Preview local amounts by country. Subscriptions are charged in US dollars.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <MouseFollower
                    borderColor="border-blue-500/70 dark:border-blue-400/60"
                    glowColor="from-blue-500/40 via-blue-400/20 to-transparent"
                    className={`w-full bg-blue-200 dark:bg-blue-900/60 p-4 transition-all duration-300 rounded-xl border-2 ${
                      billingCycle === "monthly"
                        ? "border-blue-500/70 dark:border-blue-400/60"
                        : "border-transparent hover:border-blue-400/30 dark:hover:border-blue-500/30"
                    }`}
                  >
                    <button
                      onClick={() => setBillingCycle("monthly")}
                      className="relative z-10 flex w-full items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/30 text-blue-700 dark:bg-blue-400/20 dark:text-blue-400">
                          <Zap className="h-5 w-5" strokeWidth={2} />
                        </div>
                        <span className="font-medium text-slate-900 dark:text-white">Monthly</span>
                      </div>
                      <div className="text-lg font-bold text-slate-900 dark:text-white">
                        $5/mo
                      </div>
                    </button>
                  </MouseFollower>

                  <MouseFollower
                    borderColor="border-purple-500/70 dark:border-purple-400/60"
                    glowColor="from-purple-500/40 via-purple-400/20 to-transparent"
                    className={`w-full bg-purple-200 dark:bg-purple-900/60 p-4 transition-all duration-300 rounded-xl border-2 ${
                      billingCycle === "yearly"
                        ? "border-purple-500/70 dark:border-purple-400/60"
                        : "border-transparent hover:border-purple-400/30 dark:hover:border-purple-500/30"
                    }`}
                  >
                    <button
                      onClick={() => setBillingCycle("yearly")}
                      className="relative z-10 flex w-full items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/30 text-purple-700 dark:bg-purple-400/20 dark:text-purple-400">
                          <Infinity className="h-5 w-5" strokeWidth={2} />
                        </div>
                        <span className="font-medium text-slate-900 dark:text-white">Yearly</span>
                      </div>
                      <div className="text-lg font-bold text-slate-900 dark:text-white">
                        $50/yr
                      </div>
                    </button>
                  </MouseFollower>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}