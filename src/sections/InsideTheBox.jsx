import { 
  Store, Package, BarChart, Headphones, 
  Tag, ShoppingCart, FileText, Globe, 
  Truck, Zap, ArrowRight, Sparkles
} from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useState, useRef } from "react";

const FEATURES = [
  {
    icon: Store,
    title: "Your Storefront",
    description: "A beautiful, customizable storefront that showcases your products perfectly.",
    bg: "from-amber-100/80 to-amber-200/40 dark:from-amber-900/40 dark:to-amber-800/20",
    iconBg: "bg-amber-100 text-amber-600 dark:bg-amber-800/50 dark:text-amber-300",
    borderColor: "border-amber-400/50 dark:border-amber-600/30",
    glowColor: "from-amber-400/30 via-amber-300/20 to-transparent",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Get help when you need it with our responsive support team.",
    bg: "from-emerald-100/80 to-emerald-200/40 dark:from-emerald-900/40 dark:to-emerald-800/20",
    iconBg: "bg-emerald-100 text-emerald-600 dark:bg-emerald-800/50 dark:text-emerald-300",
    borderColor: "border-emerald-400/50 dark:border-emerald-600/30",
    glowColor: "from-emerald-400/30 via-emerald-300/20 to-transparent",
  },
  {
    icon: FileText,
    title: "About & Contact Pages",
    description: "Add custom About and Contact pages on the same link to build trust with customers.",
    bg: "from-indigo-100/80 to-indigo-200/40 dark:from-indigo-900/40 dark:to-indigo-800/20",
    iconBg: "bg-indigo-100 text-indigo-600 dark:bg-indigo-800/50 dark:text-indigo-300",
    borderColor: "border-indigo-400/50 dark:border-indigo-600/30",
    glowColor: "from-indigo-400/30 via-indigo-300/20 to-transparent",
  },
  {
    icon: Package,
    title: "Order Management",
    description: "Track all orders in one place. Never miss a sale with real-time notifications.",
    bg: "from-blue-100/80 to-blue-200/40 dark:from-blue-900/40 dark:to-blue-800/20",
    iconBg: "bg-blue-100 text-blue-600 dark:bg-blue-800/50 dark:text-blue-300",
    borderColor: "border-blue-400/50 dark:border-blue-600/30",
    glowColor: "from-blue-400/30 via-blue-300/20 to-transparent",
  },
  {
    icon: Tag,
    title: "Categories & Variants",
    description: "Organize products with categories, manage variants, and set sale prices that buyers understand.",
    bg: "from-rose-100/80 to-rose-200/40 dark:from-rose-900/40 dark:to-rose-800/20",
    iconBg: "bg-rose-100 text-rose-600 dark:bg-rose-800/50 dark:text-rose-300",
    borderColor: "border-rose-400/50 dark:border-rose-600/30",
    glowColor: "from-rose-400/30 via-rose-300/20 to-transparent",
  },
  {
    icon: Globe,
    title: "Multi-Language Store",
    description: "Your store in English, Spanish, or Arabic — reach more customers in their language.",
    bg: "from-orange-100/80 to-orange-200/40 dark:from-orange-900/40 dark:to-orange-800/20",
    iconBg: "bg-orange-100 text-orange-600 dark:bg-orange-800/50 dark:text-orange-300",
    borderColor: "border-orange-400/50 dark:border-orange-600/30",
    glowColor: "from-orange-400/30 via-orange-300/20 to-transparent",
  },
  {
    icon: BarChart,
    title: "Analytics Dashboard",
    description: "Understand your customers with powerful insights and sales reports.",
    bg: "from-purple-100/80 to-purple-200/40 dark:from-purple-900/40 dark:to-purple-800/20",
    iconBg: "bg-purple-100 text-purple-600 dark:bg-purple-800/50 dark:text-purple-300",
    borderColor: "border-purple-400/50 dark:border-purple-600/30",
    glowColor: "from-purple-400/30 via-purple-300/20 to-transparent",
  },
  {
    icon: ShoppingCart,
    title: "Coupons & Delivery",
    description: "Create coupons, set delivery fees at checkout, and offer discounts to your customers.",
    bg: "from-cyan-100/80 to-cyan-200/40 dark:from-cyan-900/40 dark:to-cyan-800/20",
    iconBg: "bg-cyan-100 text-cyan-600 dark:bg-cyan-800/50 dark:text-cyan-300",
    borderColor: "border-cyan-400/50 dark:border-cyan-600/30",
    glowColor: "from-cyan-400/30 via-cyan-300/20 to-transparent",
  },
  {
    icon: Truck,
    title: "Mark Paid & Ship",
    description: "You mark paid and ship; payments stay with you and the buyer. Simple and secure.",
    bg: "from-teal-100/80 to-teal-200/40 dark:from-teal-900/40 dark:to-teal-800/20",
    iconBg: "bg-teal-100 text-teal-600 dark:bg-teal-800/50 dark:text-teal-300",
    borderColor: "border-teal-400/50 dark:border-teal-600/30",
    glowColor: "from-teal-400/30 via-teal-300/20 to-transparent",
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
      className={`relative overflow-hidden rounded-xl border transition-all duration-500 ${
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

export default function InsideTheBox() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute -bottom-20 right-0 h-[30rem] w-[30rem] rounded-full bg-violet-400/8 blur-3xl dark:bg-violet-400/12" />
      <div className="pointer-events-none absolute -top-20 left-0 h-[30rem] w-[30rem] rounded-full bg-indigo-400/8 blur-3xl dark:bg-indigo-400/12" />
      
      <div className={`relative mx-auto max-w-content scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block font-mono text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            Inside The Box
          </span>
          <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
            What buyers actually <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
            tap through
          </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Grid, product detail, cart cues — tight enough to feel premium, simple enough to ship today.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <MouseFollower
              key={index}
              borderColor={feature.borderColor}
              glowColor={feature.glowColor}
              className={`bg-gradient-to-br ${feature.bg} p-4 shadow-lg shadow-violet-500/5 transition-all duration-500 hover:shadow-xl hover:shadow-violet-500/15 dark:shadow-violet-500/5`}
            >
              <div className="relative flex items-center gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${feature.iconBg} transition-all duration-300 group-hover:scale-110`}>
                  <feature.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-sm font-semibold text-slate-800 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-tr-xl border-r border-t border-violet-300/20 transition-all duration-300 group-hover:border-violet-400/40 dark:border-violet-500/10 dark:group-hover:border-violet-400/30" />
              </div>
            </MouseFollower>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#demo"
            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-colors duration-300 hover:shadow-xl hover:shadow-violet-500/35 hover:brightness-110"
          >
            Browse Demo
            <ArrowRight className="h-4 w-4 transition-none" />
          </a>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            You mark paid and ship; payments stay with you and the buyer.
          </p>
        </div>
      </div>
    </section>
  );
}