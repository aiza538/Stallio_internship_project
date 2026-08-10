import { useState, useRef } from "react";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Tag, 
  FileText, 
  Check,
  Sparkles
} from "lucide-react";

const features = [
  {
    id: 1,
    title: "Catalog, checkout, orders, and invoices in one dashboard loop.",
    icon: LayoutDashboard,
    boxBg: "bg-[#FFF9E6] dark:bg-[#1a1508]",
    boxBorder: "border-[#FFE5A3] dark:border-[#5a4a1a]",
    iconBg: "bg-[#FFF0C8] dark:bg-[#2a1f0d]",
    iconColor: "text-[#D97706] dark:text-[#fbbf24]",
    numberBg: "bg-[#D97706] dark:bg-[#b45309]",
    themeColor: "#D97706",
    darkThemeColor: "#fbbf24"
  },
  {
    id: 2,
    title: "Orders with payment and delivery status",
    icon: ShoppingBag,
    boxBg: "bg-[#EFF6FF] dark:bg-[#0a1428]",
    boxBorder: "border-[#93C5FD] dark:border-[#1a3a6a]",
    iconBg: "bg-[#DBEAFE] dark:bg-[#111d3b]",
    iconColor: "text-[#2563EB] dark:text-[#60a5fa]",
    numberBg: "bg-[#2563EB] dark:bg-[#1d4ed8]",
    themeColor: "#2563EB",
    darkThemeColor: "#60a5fa"
  },
  {
    id: 3,
    title: "Products with variants, sales, and stock",
    icon: Tag,
    boxBg: "bg-[#F5F3FF] dark:bg-[#120c24]",
    boxBorder: "border-[#DDD6FE] dark:border-[#3a2c6a]",
    iconBg: "bg-[#EDE9FE] dark:bg-[#1a1435]",
    iconColor: "text-[#7C3AED] dark:text-[#a78bfa]",
    numberBg: "bg-[#7C3AED] dark:bg-[#6d28d9]",
    themeColor: "#7C3AED",
    darkThemeColor: "#a78bfa"
  },
  {
    id: 4,
    title: "PDF invoice ready to send",
    icon: FileText,
    boxBg: "bg-[#FDF2F8] dark:bg-[#240a14]",
    boxBorder: "border-[#FBCFE8] dark:border-[#5a1a3a]",
    iconBg: "bg-[#FCE7F3] dark:bg-[#30101e]",
    iconColor: "text-[#DB2777] dark:text-[#f472b6]",
    numberBg: "bg-[#DB2777] dark:bg-[#be185d]",
    themeColor: "#DB2777",
    darkThemeColor: "#f472b6"
  },
];

function FeatureCard({ feature }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  return (
    <div 
      className="relative flex items-start gap-4 group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={`${feature.numberBg} flex h-10 w-10 items-center justify-center rounded-full text-white text-sm font-bold shadow-md dark:shadow-[0_0_15px_rgba(0,0,0,0.5)] shrink-0 z-10 transition-colors duration-300`}>
        {feature.id}
      </div>

      <div 
        ref={cardRef}
        className={`relative flex-1 rounded-xl border ${feature.boxBorder} ${feature.boxBg} p-4 overflow-hidden transition-all duration-300`}
        style={{
          borderColor: isHovering ? (document.documentElement.classList.contains('dark') ? feature.darkThemeColor : feature.themeColor) : undefined
        }}
      >
        {isHovering && (
          <div 
            className="absolute pointer-events-none w-24 h-24 rounded-full blur-xl transition-all duration-[20ms] ease-linear"
            style={{
              background: document.documentElement.classList.contains('dark') 
                ? `radial-gradient(circle, ${feature.darkThemeColor}40 0%, transparent 70%)`
                : `radial-gradient(circle, ${feature.themeColor}40 0%, transparent 70%)`,
              left: `${position.x - 12}%`,
              top: `${position.y - 12}%`,
            }}
          />
        )}

        <div className="relative z-10 flex items-start gap-3">
          <div className={`${feature.iconBg} ${feature.iconColor} flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-300`}>
            <feature.icon className="h-5 w-5" strokeWidth={2} />
          </div>
          <p className="text-[0.95rem] text-slate-800 dark:text-white pt-0.5 leading-relaxed font-medium">
            {feature.title}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FeaturesHero() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-70 blur-sm dark:opacity-60"
        style={{
          backgroundImage: "url('/images/features_hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/30 via-white/10 to-white/40 dark:from-slate-900/30 dark:via-slate-900/10 dark:to-slate-900/40" />
      <div className="absolute inset-0 z-0 bg-white/0 dark:bg-slate-900/0" />
      
      <div className="pointer-events-none absolute -top-40 left-1/2 z-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-400/20" />
      <div className="pointer-events-none absolute -bottom-40 right-0 z-0 h-[30rem] w-[30rem] rounded-full bg-purple-400/12 blur-3xl dark:bg-purple-400/15" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
          
          <div className="flex flex-col justify-center gap-6 animate-on-load">
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-indigo-200/30 bg-white/70 px-4 py-1.5 text-sm font-medium text-brand-600 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-slate-300">
                <Sparkles className="h-4 w-4" strokeWidth={2} />
                    Features
            </div>
            
            <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl text-slate-900 dark:text-white">
              Everything you need
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
                    to sell from one link.
                </span>
            </h1>
            
            <p className="mt-2 text-lg text-slate-900 dark:text-white leading-relaxed max-w-lg">
              Storefront, dashboard, and seller tools in one place: hosted link, unlimited catalog and orders, no buyer payment gateway required.
            </p>

            <ul className="flex flex-col gap-3 mt-4">
              {[
                "stallio.shop link, no domain purchase",
                "Unlimited products, photos, and orders",
                "PDF invoices and order export",
                "Coupons, delivery fees, and COD at checkout"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-900 dark:text-white">
                  <Check className="h-5 w-5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-[0.95rem]">{item}</span>
                </li>
              ))}
            </ul>

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

          <div className="relative flex items-center justify-center mt-8 lg:mt-0 animate-on-load">
            <div className="w-full max-w-md rounded-3xl bg-indigo-950/40 dark:bg-indigo-950/60 backdrop-blur-lg border border-white/15 dark:border-white/10 p-8 shadow-2xl shadow-black/30">
              <div className="flex flex-col gap-5">
                {features.map((feature) => (
                  <FeatureCard key={feature.id} feature={feature} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}