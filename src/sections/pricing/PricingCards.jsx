// src/sections/pricing/PricingCards.jsx
import { useState, useRef } from "react";
import { 
  Check, Zap, Globe, Infinity, ShieldCheck, Star, ArrowRight, User, Share2 
} from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";

// ✅ UPDATED MouseFollower Component - Borders highlight on hover
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
      className={`relative overflow-hidden rounded-xl border-2 transition-all duration-500 ${
        isHovering ? `${borderColor} border-opacity-100 shadow-lg` : 'border-transparent border-opacity-0'
      } ${className}`}
    >
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

export default function PricingCards() {
  const { ref, isVisible } = useScrollReveal();

  const ALL_FEATURES = [
    { text: "Hosted stallio.shop link (no domain)", color: "from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20", border: "border-amber-500/70 dark:border-amber-400/60", glow: "from-amber-500/40 via-amber-400/20 to-transparent" },
    { text: "Unlimited products, photos, and orders", color: "from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20", border: "border-emerald-500/70 dark:border-emerald-400/60", glow: "from-emerald-500/40 via-emerald-400/20 to-transparent" },
    { text: "Mobile storefront, cart, and checkout", color: "from-indigo-50 to-indigo-100/50 dark:from-indigo-950/30 dark:to-indigo-900/20", border: "border-indigo-500/70 dark:border-indigo-400/60", glow: "from-indigo-500/40 via-indigo-400/20 to-transparent" },
    { text: "Variants, sale prices, and stock", color: "from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20", border: "border-blue-500/70 dark:border-blue-400/60", glow: "from-blue-500/40 via-blue-400/20 to-transparent" },
    { text: "About and Contact pages", color: "from-rose-50 to-rose-100/50 dark:from-rose-950/30 dark:to-rose-900/20", border: "border-rose-500/70 dark:border-rose-400/60", glow: "from-rose-500/40 via-rose-400/20 to-transparent" },
    { text: "Coupons and delivery fees", color: "from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20", border: "border-orange-500/70 dark:border-orange-400/60", glow: "from-orange-500/40 via-orange-400/20 to-transparent" },
    { text: "PDF invoice per order", color: "from-violet-50 to-violet-100/50 dark:from-violet-950/30 dark:to-violet-900/20", border: "border-violet-500/70 dark:border-violet-400/60", glow: "from-violet-500/40 via-violet-400/20 to-transparent" },
    { text: "Mark paid, ship, and export CSV", color: "from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/20", border: "border-pink-500/70 dark:border-pink-400/60", glow: "from-pink-500/40 via-pink-400/20 to-transparent" },
    { text: "Shop and dashboard in EN, ES, and AR", color: "from-cyan-50 to-cyan-100/50 dark:from-cyan-950/30 dark:to-cyan-900/20", border: "border-cyan-500/70 dark:border-cyan-400/60", glow: "from-cyan-500/40 via-cyan-400/20 to-transparent" },
    { text: "Revenue and order charts", color: "from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20", border: "border-purple-500/70 dark:border-purple-400/60", glow: "from-purple-500/40 via-purple-400/20 to-transparent" },
    { text: "Buyer messages and support chat", color: "from-yellow-50 to-yellow-100/50 dark:from-yellow-950/30 dark:to-yellow-900/20", border: "border-yellow-500/70 dark:border-yellow-400/60", glow: "from-yellow-500/40 via-yellow-400/20 to-transparent" },
    { text: "First month free, no card required", color: "from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20", border: "border-green-500/70 dark:border-green-400/60", glow: "from-green-500/40 via-green-400/20 to-transparent" },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24 bg-white dark:bg-[#0d071a]">
      
      {/* Light mode - clean white background */}
      {/* Dark mode - gradient with purple center glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2d1045] via-[#150b2e] to-[#0d071a] hidden dark:block" />
      
      {/* Dark mode glows */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl dark:bg-purple-500/10" />
      <div className="pointer-events-none absolute -top-40 left-1/2 z-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-400/20" />
      <div className="pointer-events-none absolute -bottom-40 right-0 z-0 h-[30rem] w-[30rem] rounded-full bg-purple-400/12 blur-3xl dark:bg-purple-400/15" />

      <div className={`relative z-10 mx-auto max-w-7xl scroll-reveal ${isVisible ? 'visible' : ''}`}>
        
        {/* Section Header - Light mode text */}
        <div className="text-center mb-12">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-400">
            Choose Billing
          </span>
          <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
            Monthly or yearly, <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-purple-300 dark:via-purple-300 dark:to-violet-300">your choice</span>
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Preview local amounts by country. Subscriptions are charged in US dollars.
          </p>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Country Selector */}
          <MouseFollower
            borderColor="border-amber-500/70 dark:border-amber-400/60"
            glowColor="from-amber-500/40 via-amber-400/20 to-transparent"
            className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/40 dark:to-amber-900/20 p-6 backdrop-blur-sm border border-amber-200/30 dark:border-amber-800/30 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                  Estimate
                </span>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100/50 dark:bg-amber-900/30">
                <User className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <h4 className="text-lg font-bold text-slate-800 dark:text-white mt-2">
              Your country
            </h4>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 mb-4">
              Search and select to see approximate prices in your currency on the plans.
            </p>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe className="h-4 w-4 text-slate-400" />
              </div>
              
              {/* Dark mode dropdown background and text */}
              <select className="block w-full pl-10 pr-10 py-2.5 border-2 border-amber-300 dark:border-amber-700 rounded-xl bg-white dark:bg-[#1a122e] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none cursor-pointer backdrop-blur-sm">
                <option value="United States">United States</option>
                <option value="Pakistan">Pakistan</option>
                <option value="United Kingdom">United Kingdom</option>
              </select>
              
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <div className="h-5 w-px bg-slate-300 dark:bg-slate-600 mr-2"></div>
                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </MouseFollower>

          {/* Monthly Plan */}
          <MouseFollower
            borderColor="border-blue-500/70 dark:border-blue-400/60"
            glowColor="from-blue-500/40 via-blue-400/20 to-transparent"
            className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/40 dark:to-blue-900/20 p-6 backdrop-blur-sm shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Monthly</span>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100/50 dark:bg-blue-900/30">
                <Share2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-4xl font-bold text-slate-900 dark:text-white">$5</span>
              <span className="text-sm text-slate-500 dark:text-slate-400">/mo</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">After trial</p>
            
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
              Flexible billing. Cancel anytime from your account.
            </p>
            
            <div className="mt-6">
              <Link
                to="/signup"
                className="group block w-full text-center rounded-xl bg-blue-500 py-2.5 px-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:bg-blue-600"
              >
                Start Monthly <ArrowRight className="inline h-4 w-4 ml-1" />
              </Link>
            </div>
          </MouseFollower>

          {/* Yearly Plan */}
          <MouseFollower
            borderColor="border-purple-500/70 dark:border-purple-400/60"
            glowColor="from-purple-500/40 via-purple-400/20 to-transparent"
            className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/40 dark:to-purple-900/20 p-6 backdrop-blur-sm shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Infinity className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <span className="text-xs font-medium text-purple-600 dark:text-purple-400">Yearly</span>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100/50 dark:bg-purple-900/30">
                <Share2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-4xl font-bold text-slate-900 dark:text-white">$50</span>
              <span className="text-sm text-slate-500 dark:text-slate-400">/yr</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">After trial</p>
            
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
              Pay once per year. Best if you are committed to growing your shop.
            </p>
            
            <div className="mt-6">
              <Link
                to="/signup"
                className="group block w-full text-center rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 py-2.5 px-4 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] hover:brightness-105"
              >
                Start Yearly <ArrowRight className="inline h-4 w-4 ml-1" />
              </Link>
            </div>
          </MouseFollower>
        </div>

        {/* Everything in both plans - Light mode */}
        <div className="relative rounded-3xl border border-purple-200/50 dark:border-purple-800/30 bg-white/80 dark:bg-purple-950/30 p-8 shadow-xl shadow-purple-500/5 dark:shadow-purple-900/20 mb-8 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="mb-1 inline-block text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-purple-400">
                Included
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Everything in both plans
              </h3>
            </div>
            <Star className="h-8 w-8 text-purple-400 dark:text-purple-400" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ALL_FEATURES.map((feature, index) => (
              <MouseFollower
                key={index}
                borderColor={feature.border}
                glowColor={feature.glow}
                className={`bg-gradient-to-br ${feature.color} p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md backdrop-blur-sm`}
              >
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-purple-600 dark:text-purple-400 shrink-0" strokeWidth={3} />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {feature.text}
                  </span>
                </div>
              </MouseFollower>
            ))}
          </div>
        </div>

        {/* Trial Card - Light mode */}
        <div className="rounded-3xl border border-purple-200/50 dark:border-purple-800/30 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-purple-950/30 dark:to-purple-950/30 p-6 flex items-center gap-4 flex-wrap shadow-sm backdrop-blur-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50">
            <ShieldCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-base font-semibold text-slate-800 dark:text-white">
              Trial first, then you choose
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Your first month is free. We will remind you before the trial ends so you can pick monthly or yearly, or cancel if it is not a fit.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}