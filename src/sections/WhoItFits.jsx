import { Home, ShoppingBag, Shirt, HandMetal, Store as StoreIcon } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useState, useRef } from "react";

const TARGET_AUDIENCE = [
  {
    icon: Home,
    title: "Home Bakers",
    description: "Sell your baked goods from your home kitchen with a professional storefront.",
    bg: "from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20",
    iconBg: "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400",
    borderColor: "border-amber-500/70 dark:border-amber-400/60",
    glowColor: "from-amber-500/40 via-amber-400/20 to-transparent",
  },
  {
    icon: ShoppingBag,
    title: "Social Sellers",
    description: "Turn your social media followers into customers with one simple link.",
    bg: "from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/20",
    iconBg: "bg-pink-100 text-pink-600 dark:bg-pink-900/50 dark:text-pink-400",
    borderColor: "border-pink-500/70 dark:border-pink-400/60",
    glowColor: "from-pink-500/40 via-pink-400/20 to-transparent",
  },
  {
    icon: Shirt,
    title: "Clothing Labels",
    description: "Showcase your fashion brand with a beautiful online catalog.",
    bg: "from-indigo-50 to-indigo-100/50 dark:from-indigo-950/30 dark:to-indigo-900/20",
    iconBg: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400",
    borderColor: "border-indigo-500/70 dark:border-indigo-400/60",
    glowColor: "from-indigo-500/40 via-indigo-400/20 to-transparent",
  },
  {
    icon: HandMetal,
    title: "Handmade & Craft",
    description: "Share your handmade creations with customers who appreciate quality.",
    bg: "from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20",
    iconBg: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400",
    borderColor: "border-emerald-500/70 dark:border-emerald-400/60",
    glowColor: "from-emerald-500/40 via-emerald-400/20 to-transparent",
  },
  {
    icon: StoreIcon,
    title: "Local Shops",
    description: "Bring your local store online and reach more customers in your area.",
    bg: "from-violet-50 to-violet-100/50 dark:from-violet-950/30 dark:to-violet-900/20",
    iconBg: "bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400",
    borderColor: "border-violet-500/70 dark:border-violet-400/60",
    glowColor: "from-violet-500/40 via-violet-400/20 to-transparent",
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

export default function WhoItFits() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute -top-20 right-0 h-[30rem] w-[30rem] rounded-full bg-purple-400/8 blur-3xl dark:bg-purple-400/12" />
      
      <div className={`relative mx-auto max-w-content scroll-reveal ${isVisible ? 'visible' : ''}`}>
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block font-mono text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            WHO IT FITS
          </span>
          <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
            Your audience already follows you. <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
            Give them a shelf.
          </span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600 dark:text-slate-300">
            For people who sell from kitchens, studios, and counters not for teams who live inside enterprise dashboards.
          </p>
        </div>

        <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 stagger-children ${isVisible ? 'visible' : ''}`}>
          {TARGET_AUDIENCE.map((item, index) => (
            <MouseFollower
              key={index}
              borderColor={item.borderColor}
              glowColor={item.glowColor}
              className={`bg-gradient-to-br ${item.bg} p-6 shadow-xl shadow-indigo-500/5 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 dark:shadow-indigo-500/10`}
            >
              <div className="relative">
                <div className={`inline-flex rounded-2xl ${item.iconBg} p-3 transition-all duration-300 group-hover:scale-110`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-slate-800 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </div>
            </MouseFollower>
          ))}
        </div>
      </div>
    </section>
  );
}