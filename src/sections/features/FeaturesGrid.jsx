import { 
  Store, Link, Package, LayoutDashboard, Smartphone, 
  Tag, FileText, Truck, Layers, CreditCard, BarChart, 
  MessageCircle, Headphones
} from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useState, useRef, useEffect } from "react";

const FEATURES = [
  {
    icon: Store,
    title: "A storefront, not a science project",
    description: "Buyers browse categories, pick variants, apply coupons, and place orders on their phone. Share one link tonight with no hosting bill, custom domain, or deploy keys.",
    subItems: [
      "Hosted on stallio.shop/yourname",
      "English, Spanish, or Arabic storefront",
      "About, contact, and home page included"
    ],
    bg: "from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20",
    iconBg: "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400",
    borderColor: "border-amber-500/70 dark:border-amber-400/60",
    glowColor: "from-amber-500/40 via-amber-400/20 to-transparent",
    isLarge: true 
  },
  {
    icon: Link,
    title: "Custom Store Link",
    description: "One path for bio, WhatsApp, stories, and QR. Copy and paste; we host the shop.",
    bg: "from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20",
    iconBg: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400",
    borderColor: "border-blue-500/70 dark:border-blue-400/60",
    glowColor: "from-blue-500/40 via-blue-400/20 to-transparent",
  },
  {
    icon: Package,
    title: "Product Catalog",
    description: "Unlimited products and images. Variants, sale prices, stock, and hide/show without deleting.",
    bg: "from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20",
    iconBg: "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400",
    borderColor: "border-purple-500/70 dark:border-purple-400/60",
    glowColor: "from-purple-500/40 via-purple-400/20 to-transparent",
  },
  {
    icon: LayoutDashboard,
    title: "Order Dashboard",
    description: "Every order in one inbox. Search, filter, mark paid, set delivery status, add tracking.",
    bg: "from-rose-50 to-rose-100/50 dark:from-rose-950/30 dark:to-rose-900/20",
    iconBg: "bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400",
    borderColor: "border-rose-500/70 dark:border-rose-400/60",
    glowColor: "from-rose-500/40 via-rose-400/20 to-transparent",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Storefront",
    description: "Grid, product pages, and checkout tuned for thumbs, where your buyers actually are.",
    bg: "from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20",
    iconBg: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400",
    borderColor: "border-emerald-500/70 dark:border-emerald-400/60",
    glowColor: "from-emerald-500/40 via-emerald-400/20 to-transparent",
  },
  {
    icon: Tag,
    title: "Coupons and Promos",
    description: "Percent or fixed-off codes with optional expiry. Buyers apply them at checkout.",
    bg: "from-cyan-50 to-cyan-100/50 dark:from-cyan-950/30 dark:to-cyan-900/20",
    iconBg: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/50 dark:text-cyan-400",
    borderColor: "border-cyan-500/70 dark:border-cyan-400/60",
    glowColor: "from-cyan-500/40 via-cyan-400/20 to-transparent",
  },
  {
    icon: FileText,
    title: "PDF Invoices",
    description: "Download a professional invoice per order to send on WhatsApp or email.",
    bg: "from-indigo-50 to-indigo-100/50 dark:from-indigo-950/30 dark:to-indigo-900/20",
    iconBg: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400",
    borderColor: "border-indigo-500/70 dark:border-indigo-400/60",
    glowColor: "from-indigo-500/40 via-indigo-400/20 to-transparent",
  },
  {
    icon: Truck,
    title: "Delivery and COD",
    description: "Fixed or free-above-minimum delivery, ETA text, checkout notes, and cash on delivery toggle.",
    bg: "from-teal-50 to-teal-100/50 dark:from-teal-950/30 dark:to-teal-900/20",
    iconBg: "bg-teal-100 text-teal-600 dark:bg-teal-900/50 dark:text-teal-400",
    borderColor: "border-teal-500/70 dark:border-teal-400/60",
    glowColor: "from-teal-500/40 via-teal-400/20 to-transparent",
  },
  {
    icon: Layers,
    title: "Categories and Pages",
    description: "Group products, run a custom home hero, trust lines, reviews, plus About and Contact.",
    bg: "from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20",
    iconBg: "bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400",
    borderColor: "border-orange-500/70 dark:border-orange-400/60",
    glowColor: "from-orange-500/40 via-orange-400/20 to-transparent",
  },
  {
    icon: CreditCard,
    title: "You Control Payment",
    description: "Tell buyers how to pay by bank, link, or COD. Stallio tracks the order; you confirm when money arrives.",
    bg: "from-violet-50 to-violet-100/50 dark:from-violet-950/30 dark:to-violet-900/20",
    iconBg: "bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400",
    borderColor: "border-violet-500/70 dark:border-violet-400/60",
    glowColor: "from-violet-500/40 via-violet-400/20 to-transparent",
  },
  {
    icon: BarChart,
    title: "Revenue Overview",
    description: "Charts and totals for paid orders across today, the week, or a custom range.",
    bg: "from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/20",
    iconBg: "bg-pink-100 text-pink-600 dark:bg-pink-900/50 dark:text-pink-400",
    borderColor: "border-pink-500/70 dark:border-pink-400/60",
    glowColor: "from-pink-500/40 via-pink-400/20 to-transparent",
  },
  {
    icon: MessageCircle,
    title: "Buyer Messages",
    description: "Contact form submissions land in your inbox so nothing sits only on Instagram.",
    bg: "from-sky-50 to-sky-100/50 dark:from-sky-950/30 dark:to-sky-900/20",
    iconBg: "bg-sky-100 text-sky-600 dark:bg-sky-900/50 dark:text-sky-400",
    borderColor: "border-sky-500/70 dark:border-sky-400/60",
    glowColor: "from-sky-500/40 via-sky-400/20 to-transparent",
  },
  {
    icon: Headphones,
    title: "Seller Support",
    description: "Chat with the Stallio team from your dashboard when you need a hand.",
    bg: "from-lime-50 to-lime-100/50 dark:from-lime-950/30 dark:to-lime-900/20",
    iconBg: "bg-lime-100 text-lime-600 dark:bg-lime-900/50 dark:text-lime-400",
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

export default function FeaturesGrid() {
  const { ref, isVisible } = useScrollReveal();
  const [isMobile, setIsMobile] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Load animation trigger
    setHasLoaded(true);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute -top-20 right-0 h-[30rem] w-[30rem] rounded-full bg-indigo-400/8 blur-3xl dark:bg-indigo-400/12" />
      
      <div className={`relative mx-auto max-w-7xl scroll-reveal ${(isVisible || isMobile || hasLoaded) ? 'visible' : ''}`}>
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block font-mono text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Catalog, checkout, orders, and invoices
          </span>
          <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
            Everything in{" "} 
             <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
                     one dashboard loop.
                </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <MouseFollower
              key={index}
              borderColor={feature.borderColor}
              glowColor={feature.glowColor}
              className={`bg-gradient-to-br ${feature.bg} p-6 shadow-xl shadow-indigo-500/5 transition-all duration-700 hover:shadow-2xl hover:shadow-indigo-500/20 dark:shadow-indigo-500/10 ${
                (isVisible || isMobile || hasLoaded) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              } ${feature.isLarge ? 'sm:col-span-2 lg:col-span-2 row-span-1 sm:row-span-2' : ''}`} 
              style={{ 
                transitionDelay: `${index * 0.08}s`,
                transitionProperty: 'all',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div className="relative flex h-full flex-col items-start gap-4">
                <div className={`inline-flex rounded-2xl ${feature.iconBg} p-3 transition-all duration-300 group-hover:scale-110`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                
                <div className={`${feature.isLarge ? 'space-y-3 sm:space-y-4' : 'space-y-2'}`}>
                  <h3 className={`font-display font-semibold text-slate-800 dark:text-white ${feature.isLarge ? 'text-2xl sm:text-4xl lg:text-5xl' : 'text-lg'}`}>
                    {feature.title}
                  </h3>
                  <p className={`leading-relaxed text-slate-600 dark:text-slate-300 ${feature.isLarge ? 'text-base sm:text-lg' : 'text-sm'}`}>
                    {feature.description}
                  </p>
                  {feature.subItems && (
                    <ul className={`mt-3 space-y-1.5 text-slate-500 dark:text-slate-400 ${feature.isLarge ? 'text-sm sm:text-base' : 'text-xs'}`}>
                      {feature.subItems.map((sub, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-indigo-400 shrink-0" />
                          {sub}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </MouseFollower>
          ))}
        </div>
      </div>
    </section>
  );
}