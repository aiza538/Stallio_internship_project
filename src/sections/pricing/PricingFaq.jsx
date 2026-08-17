// src/sections/pricing/PricingFaq.jsx
import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

// ✅ UPDATED MouseFollower Component - Borders highlight on hover (Same as PricingCards)
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
      // ✅ Changed: Border transparency logic - hover par full visible, shadow add ki
      className={`relative overflow-hidden rounded-xl border-2 transition-all duration-500 ${
        isHovering ? `${borderColor} border-opacity-100 shadow-lg` : 'border-transparent border-opacity-0'
      } ${className}`}
    >
      {isHovering && (
        <div
          // ✅ Changed: Glow ko aur bright aur bada kar diya
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

// ✅ UPDATED FAQS FROM YOUR 9 SCREENSHOTS
const FAQS = [
  {
    question: "Do I need my own domain or hosting?",
    answer: "No. Your shop lives at stallio.shop/your-username. Share that link everywhere; we host the storefront and dashboard."
  },
  {
    question: "Does Stallio process payments from my customers?",
    answer: "No. You tell buyers how to pay (bank transfer, payment link, cash on delivery, etc.). Stallio handles the order, invoice PDF, and paid or awaiting status; you confirm when money arrives."
  },
  {
    question: "Are products and orders unlimited?",
    answer: "Yes. Both monthly and yearly plans include unlimited products, product images, and orders. Same full feature set on either plan."
  },
  {
    question: "Do I need a card to start?",
    answer: "No. You can explore Stallio without putting a card on file. When you choose a paid plan, you will add payment details through our secure checkout."
  },
  {
    question: "What happens after the free trial?",
    answer: "We remind you before the trial ends. You can pick monthly or yearly billing, or cancel if it is not a fit. Until you subscribe, you are not charged subscription fees."
  },
  {
    question: "Are prices in US dollars?",
    answer: "Subscriptions are billed in USD. The country picker on this page shows approximate local amounts for planning; your bank may apply its own exchange rate or fees."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes for monthly plans. Cancel from your account and you will not be billed for future months. Yearly plans are prepaid for the term; see Terms for details on refunds if we offer them."
  },
  {
    question: "Do both plans include the same features?",
    answer: "Yes. Monthly and yearly include the same storefront, dashboard, and tools. Yearly is discounted because you commit for a full year."
  },
  {
    question: "Who do I contact about billing?",
    answer: "Use the Contact page and choose a billing-related subject. Include your shop email so we can find your account quickly."
  },
];

// ✅ UPDATED: Ab hum index pass kar rahe hain aur ek hi active state use kar rahe hain
function FAQItem({ faq, index, activeIndex, setActiveIndex }) {
  const isOpen = activeIndex === index;

  const colors = [
    { border: "border-purple-500/70 dark:border-purple-400/60", glow: "from-purple-500/40 via-purple-400/20 to-transparent", bg: "from-purple-50 to-purple-100/50 dark:from-purple-950/40 dark:to-purple-900/20" },
    { border: "border-blue-500/70 dark:border-blue-400/60", glow: "from-blue-500/40 via-blue-400/20 to-transparent", bg: "from-blue-50 to-blue-100/50 dark:from-blue-950/40 dark:to-blue-900/20" },
    { border: "border-amber-500/70 dark:border-amber-400/60", glow: "from-amber-500/40 via-amber-400/20 to-transparent", bg: "from-amber-50 to-amber-100/50 dark:from-amber-950/40 dark:to-amber-900/20" },
    { border: "border-emerald-500/70 dark:border-emerald-400/60", glow: "from-emerald-500/40 via-emerald-400/20 to-transparent", bg: "from-emerald-50 to-emerald-100/50 dark:from-emerald-950/40 dark:to-emerald-900/20" },
  ];

  const color = colors[index % colors.length];

  return (
    <MouseFollower
      borderColor={color.border}
      glowColor={color.glow}
      // ✅ Removed extra border class so only the hover border is visible
      className={`bg-gradient-to-br ${color.bg} p-6 backdrop-blur-sm shadow-sm`}
    >
      <button
        // ✅ Logic: Agar yeh khula hai toh band karo, warna isko kholo (baaki saare band ho jayenge)
        onClick={() => setActiveIndex(isOpen ? null : index)}
        className="flex w-full items-center justify-between text-left focus:outline-none"
      >
        <span className="text-base font-medium text-slate-800 dark:text-white">
          {faq.question}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-purple-500 dark:text-purple-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {faq.answer}
        </div>
      )}
    </MouseFollower>
  );
}

export default function PricingFaq() {
  const { ref, isVisible } = useScrollReveal();
  
  // ✅ Ek hi state variable rakha hai jo index store karega
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24 bg-white dark:bg-[#0d071a]">
      
      {/* ✅ Light mode - clean white background */}
      {/* Dark mode - same gradient as PricingCards */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2d1045] via-[#150b2e] to-[#0d071a] hidden dark:block" />
      
      {/* Dark mode glows */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl dark:bg-purple-500/10" />
      <div className="pointer-events-none absolute -top-40 left-1/2 z-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-400/20" />
      <div className="pointer-events-none absolute -bottom-40 right-0 z-0 h-[30rem] w-[30rem] rounded-full bg-purple-400/12 blur-3xl dark:bg-purple-400/15" />

      <div className={`relative z-10 mx-auto max-w-3xl scroll-reveal ${isVisible ? 'visible' : ''}`}>
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-400">
            FAQ
          </span>
          <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
            Frequently asked <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-purple-300 dark:via-purple-300 dark:to-violet-300">questions</span>
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Get answers to the most common questions about Stallio pricing.
          </p>
        </div>
        
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <FAQItem 
              key={index} 
              faq={faq} 
              index={index} 
              activeIndex={activeIndex} 
              setActiveIndex={setActiveIndex} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}