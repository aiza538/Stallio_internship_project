import { Sparkles, Link, Package, FileText, CreditCard } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useState, useRef } from "react";

const FEATURES = [
  {
    icon: Link,
    title: "stallio.shop link, no domain to buy",
    description: "Get your own hosted link — no domain purchase required.",
    bg: "from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20",
    iconBg: "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400",
    borderColor: "border-amber-500/70 dark:border-amber-400/60",
    glowColor: "from-amber-500/40 via-amber-400/20 to-transparent",
  },
  {
    icon: Package,
    title: "Unlimited products, photos, and orders",
    description: "Add as many products, photos, and orders as you want — no limits.",
    bg: "from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20",
    iconBg: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400",
    borderColor: "border-blue-500/70 dark:border-blue-400/60",
    glowColor: "from-blue-500/40 via-blue-400/20 to-transparent",
  },
  {
    icon: FileText,
    title: "PDF invoices and coupons built in",
    description: "Generate professional PDF invoices and create coupons for customers.",
    bg: "from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20",
    iconBg: "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400",
    borderColor: "border-purple-500/70 dark:border-purple-400/60",
    glowColor: "from-purple-500/40 via-purple-400/20 to-transparent",
  },
  {
    icon: CreditCard,
    title: "You collect payment your way",
    description: "Use your own payment method — we don't lock you in.",
    bg: "from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20",
    iconBg: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400",
    borderColor: "border-emerald-500/70 dark:border-emerald-400/60",
    glowColor: "from-emerald-500/40 via-emerald-400/20 to-transparent",
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
      className={`relative overflow-hidden rounded-xl border-2 transition-all duration-500 ${
        isHovering ? borderColor : 'border-transparent'
      } ${className}`}
    >
      {isHovering && (
        <div
          className={`pointer-events-none absolute h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r ${glowColor} blur-2xl transition-all duration-200`}
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

export default function AboutHero() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-70 blur-sm dark:opacity-60"
        style={{
          backgroundImage: "url('/images/about_hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/30 via-white/10 to-white/40 dark:from-slate-900/30 dark:via-slate-900/10 dark:to-slate-900/40" />
      <div className="absolute inset-0 z-0 bg-white/0 dark:bg-slate-900/0" />
      
      <div className="pointer-events-none absolute -top-40 left-1/2 z-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-400/20" />
      <div className="pointer-events-none absolute -bottom-40 right-0 z-0 h-[30rem] w-[30rem] rounded-full bg-purple-400/12 blur-3xl dark:bg-purple-400/15" />
      
      <div className={`relative z-10 mx-auto max-w-content scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-indigo-200/30 bg-white/70 px-4 py-1.5 text-sm font-medium text-indigo-600 backdrop-blur-sm dark:border-indigo-800/20 dark:bg-white/15 dark:text-white">
              <Sparkles className="h-4 w-4" />
              <span>About Stallio</span>
            </div>

            <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              A calm storefront for
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
                    people who already have buyers.
                </span>
            </h1>

            <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-800 dark:text-slate-100">
              We built Stallio for sellers who already have buyers: one hosted link, a real storefront, and a dashboard. No domain bill, site builder maze, or payment gateway to wire up first.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="#start-free"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/35 hover:brightness-110"
              >
                Start Free
                <Sparkles className="h-4 w-4 transition-none" />
              </a>
              <a
                href="#demo"
                className="group inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/70 px-6 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md dark:border-white/10 dark:bg-white/15 dark:text-slate-300 dark:hover:border-indigo-400 dark:hover:bg-white/20 dark:hover:text-indigo-400"
              >
                View Demo Store
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {FEATURES.map((feature, index) => (
              <MouseFollower
                key={index}
                borderColor={feature.borderColor}
                glowColor={feature.glowColor}
                className={`bg-gradient-to-br ${feature.bg} p-4 shadow-lg shadow-indigo-500/5 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/15 dark:shadow-indigo-500/5`}
              >
                <div className="relative flex items-start gap-3">
                  <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${feature.iconBg} transition-all duration-300 group-hover:scale-110`}>
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display text-base font-semibold text-slate-800 dark:text-white">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-tr-xl border-r border-t border-violet-300/20 transition-all duration-300 group-hover:border-violet-400/40 dark:border-violet-500/10 dark:group-hover:border-violet-400/30" />
                </div>
              </MouseFollower>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}