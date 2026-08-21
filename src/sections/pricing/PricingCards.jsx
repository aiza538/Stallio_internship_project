// src/sections/pricing/PricingCards.jsx
import { useState, useRef } from "react";
import { Check, Zap, Infinity, ShieldCheck, ArrowRight, User, Sparkles, CreditCard, Rocket, Clock, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import CustomDropdown from "../../components/ui/CustomSelect";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const COUNTRIES = [
  { value: "US", label: "United States", currency: "$", rate: 1 },
  { value: "PK", label: "Pakistan", currency: "₨", rate: 278 },
  { value: "UK", label: "United Kingdom", currency: "£", rate: 0.79 },
  { value: "AE", label: "UAE", currency: "د.إ", rate: 3.67 },
];

function MouseFollower({ children, className = "", borderColor = "", glowColor = "", allowOverflow = false }) {
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
      } ${allowOverflow ? '' : 'overflow-hidden'} ${className}`}
    >
      {isHovering && (
        <div
          className={`pointer-events-none absolute h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r ${glowColor} blur-3xl transition-all duration-200`}
          style={{ left: `${position.x}%`, top: `${position.y}%` }}
        />
      )}
      {children}
    </div>
  );
}

export default function PricingCards() {
  const { ref, isVisible } = useScrollReveal();
  const [country, setCountry] = useState("US");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedCountry = COUNTRIES.find((c) => c.value === country);
  
  const formatPrice = (usd) => {
    return `${selectedCountry.currency}${Math.round(usd * selectedCountry.rate)}`;
  };

  const handleDropdownToggle = (isOpen) => {
    setDropdownOpen(isOpen);
  };

  // ✅ Colors - Light mode strong, Dark mode solid aur bright
  const ALL_FEATURES = [
    { text: "Hosted stallio.shop link (no domain)", color: "from-amber-200/80 to-amber-100 dark:from-amber-900/60 dark:to-amber-800/60", border: "border-amber-500/70 dark:border-amber-400/60", glow: "from-amber-500/40 via-amber-400/20 to-transparent" },
    { text: "Unlimited products, photos, and orders", color: "from-emerald-200/80 to-emerald-100 dark:from-emerald-900/60 dark:to-emerald-800/60", border: "border-emerald-500/70 dark:border-emerald-400/60", glow: "from-emerald-500/40 via-emerald-400/20 to-transparent" },
    { text: "Mobile storefront, cart, and checkout", color: "from-indigo-200/80 to-indigo-100 dark:from-indigo-900/60 dark:to-indigo-800/60", border: "border-indigo-500/70 dark:border-indigo-400/60", glow: "from-indigo-500/40 via-indigo-400/20 to-transparent" },
    { text: "Variants, sale prices, and stock", color: "from-blue-200/80 to-blue-100 dark:from-blue-900/60 dark:to-blue-800/60", border: "border-blue-500/70 dark:border-blue-400/60", glow: "from-blue-500/40 via-blue-400/20 to-transparent" },
    { text: "About and Contact pages", color: "from-rose-200/80 to-rose-100 dark:from-rose-900/60 dark:to-rose-800/60", border: "border-rose-500/70 dark:border-rose-400/60", glow: "from-rose-500/40 via-rose-400/20 to-transparent" },
    { text: "Coupons and delivery fees", color: "from-orange-200/80 to-orange-100 dark:from-orange-900/60 dark:to-orange-800/60", border: "border-orange-500/70 dark:border-orange-400/60", glow: "from-orange-500/40 via-orange-400/20 to-transparent" },
    { text: "PDF invoice per order", color: "from-violet-200/80 to-violet-100 dark:from-violet-900/60 dark:to-violet-800/60", border: "border-violet-500/70 dark:border-violet-400/60", glow: "from-violet-500/40 via-violet-400/20 to-transparent" },
    { text: "Mark paid, ship, and export CSV", color: "from-pink-200/80 to-pink-100 dark:from-pink-900/60 dark:to-pink-800/60", border: "border-pink-500/70 dark:border-pink-400/60", glow: "from-pink-500/40 via-pink-400/20 to-transparent" },
    { text: "Shop and dashboard in EN, ES, and AR", color: "from-cyan-200/80 to-cyan-100 dark:from-cyan-900/60 dark:to-cyan-800/60", border: "border-cyan-500/70 dark:border-cyan-400/60", glow: "from-cyan-500/40 via-cyan-400/20 to-transparent" },
    { text: "Revenue and order charts", color: "from-purple-200/80 to-purple-100 dark:from-purple-900/60 dark:to-purple-800/60", border: "border-purple-500/70 dark:border-purple-400/60", glow: "from-purple-500/40 via-purple-400/20 to-transparent" },
    { text: "Buyer messages and support chat", color: "from-yellow-200/80 to-yellow-100 dark:from-yellow-900/60 dark:to-yellow-800/60", border: "border-yellow-500/70 dark:border-yellow-400/60", glow: "from-yellow-500/40 via-yellow-400/20 to-transparent" },
    { text: "First month free, no card required", color: "from-green-200/80 to-green-100 dark:from-green-900/60 dark:to-green-800/60", border: "border-green-500/70 dark:border-green-400/60", glow: "from-green-500/40 via-green-400/20 to-transparent" },
  ];

  return (
    <section ref={ref} className={`relative overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24 dark:bg-[#0d071a] scroll-reveal ${isVisible ? 'visible' : ''}`}>
      
      {/* ========== NEW SHADES (SAME AS VERIFYHERO) ========== */}
      {/* LIGHT MODE PURPLISH BACKGROUND SHADE */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/70 via-white to-white block dark:hidden" />
      
      {/* DARK MODE BACKGROUND GLOW */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2d1045] via-[#150b2e] to-[#0d071a] hidden dark:block" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl dark:bg-purple-500/10" />
      {/* ====================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200/30 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-600 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-brand-400">
            <Sparkles className="h-3.5 w-3.5" /> Flexible Plans
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
            Start for free,{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-300 dark:to-purple-300">
              scale when ready
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">
            Select your country to see estimated local pricing. You only pay when you decide to upgrade.
          </p>
        </div>

        {/* Interactive Cards */}
        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-3 items-stretch">
          
          {/* Step 1: Country Selection */}
          <div className="relative h-full">
            <div className="absolute -top-6 left-1/2 z-30 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-violet-500 text-lg font-bold text-white shadow-lg shadow-purple-500/30">
              1
            </div>

            <MouseFollower
              borderColor="border-purple-500/70 dark:border-purple-400/60"
              glowColor="from-purple-500/40 via-purple-400/20 to-transparent"
              allowOverflow={dropdownOpen}
              className="flex h-full flex-col bg-gradient-to-br from-purple-50/80 to-violet-50/80 p-8 pt-10 backdrop-blur-md dark:from-purple-900/60 dark:to-violet-900/60"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 dark:bg-purple-800/70">
                  <User className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Choose Country</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-300">See local currency</p>
                </div>
              </div>
              
              <div className="mt-6">
                <CustomDropdown 
                  options={COUNTRIES}
                  value={country}
                  onChange={setCountry}
                  onOpenChange={handleDropdownToggle}
                  className="w-full"
                />
              </div>

              <div className="mt-auto pt-6 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-300">
                <Clock className="h-4 w-4" />
                <span>Estimates are for planning only.</span>
              </div>
            </MouseFollower>
          </div>

          {/* Step 2: Monthly Plan */}
          <div className="relative h-full">
            <div className="absolute -top-6 left-1/2 z-30 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-lg font-bold text-white shadow-lg shadow-blue-500/30">
              2
            </div>
            <MouseFollower
              borderColor="border-blue-500/70 dark:border-blue-400/60"
              glowColor="from-blue-500/40 via-blue-400/20 to-transparent"
              className="flex h-full flex-col bg-gradient-to-br from-blue-50/80 to-cyan-50/80 p-8 pt-10 backdrop-blur-md dark:from-blue-900/60 dark:to-cyan-900/60"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-300">Monthly</h3>
                </div>
                <CreditCard className="h-5 w-5 text-blue-400" />
              </div>
              
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-slate-900 dark:text-white">{formatPrice(5)}</span>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-300">/mo</span>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                No commitment. Cancel anytime.
              </p>
              
              <Link
                to="/signup"
                className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
              >
                Start Monthly <ArrowRight className="h-4 w-4" />
              </Link>
            </MouseFollower>
          </div>

          {/* Step 3: Yearly Plan */}
          <div className="relative h-full">
            <div className="absolute -top-6 left-1/2 z-30 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-lg font-bold text-white shadow-lg shadow-pink-500/30">
              3
            </div>
            <MouseFollower
              borderColor="border-pink-500/70 dark:border-pink-400/60"
              glowColor="from-pink-500/40 via-pink-400/20 to-transparent"
              className="flex h-full flex-col bg-gradient-to-br from-pink-50/80 to-rose-50/80 p-8 pt-10 backdrop-blur-md dark:from-pink-900/60 dark:to-rose-900/60"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Infinity className="h-5 w-5 text-pink-600 dark:text-pink-300" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-pink-600 dark:text-pink-300">Yearly</h3>
                </div>
                <Rocket className="h-5 w-5 text-pink-400" />
              </div>
              
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-slate-900 dark:text-white">{formatPrice(50)}</span>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-300">/yr</span>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Best value for serious sellers.
              </p>
              
              <Link
                to="/signup"
                className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]"
              >
                Start Yearly <ArrowRight className="h-4 w-4" />
              </Link>
            </MouseFollower>
          </div>
        </div>

        {/* Everything Included */}
        <div className="mt-32 rounded-3xl border border-indigo-200/30 bg-white/80 p-8 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Everything Included</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">No hidden fees. Both plans have the exact same features.</p>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_FEATURES.map((feature, index) => (
              <MouseFollower
                key={index}
                borderColor={feature.border}
                glowColor={feature.glow}
                className={`bg-gradient-to-br ${feature.color} flex items-center gap-3 p-4 backdrop-blur-sm`}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-md">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{feature.text}</span>
              </MouseFollower>
            ))}
          </div>
        </div>

        {/* Trial Card */}
        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center shadow-xl sm:flex-row sm:text-left">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-white">Try it free, no card required</h4>
            <p className="mt-1 text-sm text-indigo-100">
              Your first month is completely free. We'll remind you before the trial ends so you can choose your plan.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}