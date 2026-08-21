// src/sections/pricing/WhatsIncluded.jsx
import { 
  Infinity, Smartphone, Zap, Shield, Users, 
  ArrowRight, Link, Package, ShoppingCart, 
  Tag, FileText, Truck, BarChart, MessageCircle,
  CreditCard, Globe
} from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useState, useRef } from "react";

const FEATURES = [
  {
    icon: Link,
    title: "Hosted stallio.shop link",
    description: "Get your own stallio.shop link no domain needed.",
    bg: "from-amber-200/80 to-amber-100 dark:from-amber-900/60 dark:to-amber-800/60",
    iconBg: "bg-amber-200 text-amber-700 dark:bg-amber-800/70 dark:text-amber-400",
    borderColor: "border-amber-500/70 dark:border-amber-400/60",
    glowColor: "from-amber-500/40 via-amber-400/20 to-transparent",
  },
  {
    icon: Infinity,
    title: "Unlimited products, photos & orders",
    description: "Add as many products, photos, and orders as you want no limits.",
    bg: "from-blue-200/80 to-blue-100 dark:from-blue-900/60 dark:to-blue-800/60",
    iconBg: "bg-blue-200 text-blue-700 dark:bg-blue-800/70 dark:text-blue-400",
    borderColor: "border-blue-500/70 dark:border-blue-400/60",
    glowColor: "from-blue-500/40 via-blue-400/20 to-transparent",
  },
  {
    icon: Smartphone,
    title: "Mobile storefront, cart & checkout",
    description: "Your store looks beautiful on every device phone, tablet, or desktop.",
    bg: "from-purple-200/80 to-purple-100 dark:from-purple-900/60 dark:to-purple-800/60",
    iconBg: "bg-purple-200 text-purple-700 dark:bg-purple-800/70 dark:text-purple-400",
    borderColor: "border-purple-500/70 dark:border-purple-400/60",
    glowColor: "from-purple-500/40 via-purple-400/20 to-transparent",
  },
  {
    icon: Tag,
    title: "Variants, sale prices & stock",
    description: "Manage product variants, set sale prices, and track stock levels.",
    bg: "from-emerald-200/80 to-emerald-100 dark:from-emerald-900/60 dark:to-emerald-800/60",
    iconBg: "bg-emerald-200 text-emerald-700 dark:bg-emerald-800/70 dark:text-emerald-400",
    borderColor: "border-emerald-500/70 dark:border-emerald-400/60",
    glowColor: "from-emerald-500/40 via-emerald-400/20 to-transparent",
  },
  {
    icon: FileText,
    title: "About & Contact pages",
    description: "Add custom About and Contact pages to build trust with your customers.",
    bg: "from-rose-200/80 to-rose-100 dark:from-rose-900/60 dark:to-rose-800/60",
    iconBg: "bg-rose-200 text-rose-700 dark:bg-rose-800/70 dark:text-rose-400",
    borderColor: "border-rose-500/70 dark:border-rose-400/60",
    glowColor: "from-rose-500/40 via-rose-400/20 to-transparent",
  },
  {
    icon: ShoppingCart,
    title: "Coupons & delivery fees",
    description: "Create coupons, set delivery fees, and offer discounts to customers.",
    bg: "from-cyan-200/80 to-cyan-100 dark:from-cyan-900/60 dark:to-cyan-800/60",
    iconBg: "bg-cyan-200 text-cyan-700 dark:bg-cyan-800/70 dark:text-cyan-400",
    borderColor: "border-cyan-500/70 dark:border-cyan-400/60",
    glowColor: "from-cyan-500/40 via-cyan-400/20 to-transparent",
  },
  {
    icon: FileText,
    title: "PDF invoice per order",
    description: "Generate professional PDF invoices for every order automatically.",
    bg: "from-indigo-200/80 to-indigo-100 dark:from-indigo-900/60 dark:to-indigo-800/60",
    iconBg: "bg-indigo-200 text-indigo-700 dark:bg-indigo-800/70 dark:text-indigo-400",
    borderColor: "border-indigo-500/70 dark:border-indigo-400/60",
    glowColor: "from-indigo-500/40 via-indigo-400/20 to-transparent",
  },
  {
    icon: Truck,
    title: "Mark paid, ship & export CSV",
    description: "Mark orders as paid, manage shipping, and export data to CSV.",
    bg: "from-teal-200/80 to-teal-100 dark:from-teal-900/60 dark:to-teal-800/60",
    iconBg: "bg-teal-200 text-teal-700 dark:bg-teal-800/70 dark:text-teal-400",
    borderColor: "border-teal-500/70 dark:border-teal-400/60",
    glowColor: "from-teal-500/40 via-teal-400/20 to-transparent",
  },
  {
    icon: Globe,
    title: "Shop & dashboard in EN, ES & AR",
    description: "Your store and dashboard are available in English, Spanish, and Arabic.",
    bg: "from-orange-200/80 to-orange-100 dark:from-orange-900/60 dark:to-orange-800/60",
    iconBg: "bg-orange-200 text-orange-700 dark:bg-orange-800/70 dark:text-orange-400",
    borderColor: "border-orange-500/70 dark:border-orange-400/60",
    glowColor: "from-orange-500/40 via-orange-400/20 to-transparent",
  },
  {
    icon: BarChart,
    title: "Revenue & order charts",
    description: "Track your business growth with powerful revenue and order analytics.",
    bg: "from-violet-200/80 to-violet-100 dark:from-violet-900/60 dark:to-violet-800/60",
    iconBg: "bg-violet-200 text-violet-700 dark:bg-violet-800/70 dark:text-violet-400",
    borderColor: "border-violet-500/70 dark:border-violet-400/60",
    glowColor: "from-violet-500/40 via-violet-400/20 to-transparent",
  },
  {
    icon: MessageCircle,
    title: "Buyer messages & support chat",
    description: "Connect with customers through built-in messaging and support chat.",
    bg: "from-pink-200/80 to-pink-100 dark:from-pink-900/60 dark:to-pink-800/60",
    iconBg: "bg-pink-200 text-pink-700 dark:bg-pink-800/70 dark:text-pink-400",
    borderColor: "border-pink-500/70 dark:border-pink-400/60",
    glowColor: "from-pink-500/40 via-pink-400/20 to-transparent",
  },
  {
    icon: CreditCard,
    title: "First month free, no card required",
    description: "Start your free trial today. No credit card needed to get started.",
    bg: "from-lime-200/80 to-lime-100 dark:from-lime-900/60 dark:to-lime-800/60",
    iconBg: "bg-lime-200 text-lime-700 dark:bg-lime-800/70 dark:text-lime-400",
    borderColor: "border-lime-500/70 dark:border-lime-400/60",
    glowColor: "from-lime-500/40 via-lime-400/20 to-transparent",
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

export default function WhatsIncluded() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute -top-20 right-0 h-[30rem] w-[30rem] rounded-full bg-violet-400/8 blur-3xl dark:bg-violet-400/12" />
      <div className="pointer-events-none absolute -bottom-20 left-0 h-[30rem] w-[30rem] rounded-full bg-indigo-400/8 blur-3xl dark:bg-indigo-400/12" />
      
      <div className={`relative mx-auto max-w-content scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block font-mono text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            What's Included
          </span>
          <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
            One plan. <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">The full seller toolkit.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600 dark:text-slate-300">
            Everything below is part of Stallio, not add-ons. Start free, then pick monthly or yearly when you are ready.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <MouseFollower
              key={index}
              borderColor={feature.borderColor}
              glowColor={feature.glowColor}
              className={`bg-gradient-to-br ${feature.bg} p-4 shadow-xl shadow-violet-500/5 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/20 dark:shadow-violet-500/10`}
            >
              <div className="relative flex items-start gap-3">
                <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${feature.iconBg} transition-all duration-300 group-hover:scale-110`}>
                  <feature.icon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-semibold text-slate-800 dark:text-white">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            </MouseFollower>
          ))}
        </div>
      </div>
    </section>
  );
}