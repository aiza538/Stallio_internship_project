// src/sections/pricing/PricingFaq.jsx
import { useState, useRef } from "react";
import { ChevronDown, HelpCircle, Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { Link } from "react-router-dom";

const FAQS = [
  { question: "Do I need my own domain?", answer: "No. Your shop lives at stallio.shop/your-username. Share that link everywhere; we host the storefront and dashboard." },
  { question: "Does Stallio process payments?", answer: "No. You tell buyers how to pay (bank transfer, payment link, cash on delivery, etc.). Stallio handles the order and invoice PDF." },
  { question: "Are products and orders unlimited?", answer: "Yes. Both monthly and yearly plans include unlimited products, product images, and orders." },
  { question: "Do I need a card to start?", answer: "No. You can explore Stallio without putting a card on file. When you choose a paid plan, you will add payment details." },
  { question: "What happens after the free trial?", answer: "We remind you before the trial ends. You can pick monthly or yearly billing, or cancel if it is not a fit." },
  { question: "Are prices in US dollars?", answer: "Subscriptions are billed in USD. The country picker shows approximate local amounts for planning." },
  { question: "Can I cancel anytime?", answer: "Yes for monthly plans. Cancel from your account and you will not be billed for future months." },
  { question: "Do both plans include the same features?", answer: "Yes. Monthly and yearly include the same storefront, dashboard, and tools. Yearly is discounted." },
];

// ✅ Colors - Light mode strong, Dark mode solid aur bright
const COLORS = [
  { border: "border-purple-500/70 dark:border-purple-400/60", glow: "from-purple-500/40 via-purple-400/20 to-transparent", solid: "from-purple-200/80 to-purple-100 dark:from-purple-900/60 dark:to-purple-800/60", icon: "text-purple-700 dark:text-purple-400", text: "text-purple-900 dark:text-white" },
  { border: "border-blue-500/70 dark:border-blue-400/60", glow: "from-blue-500/40 via-blue-400/20 to-transparent", solid: "from-blue-200/80 to-blue-100 dark:from-blue-900/60 dark:to-blue-800/60", icon: "text-blue-700 dark:text-blue-400", text: "text-blue-900 dark:text-white" },
  { border: "border-emerald-500/70 dark:border-emerald-400/60", glow: "from-emerald-500/40 via-emerald-400/20 to-transparent", solid: "from-emerald-200/80 to-emerald-100 dark:from-emerald-900/60 dark:to-emerald-800/60", icon: "text-emerald-700 dark:text-emerald-400", text: "text-emerald-900 dark:text-white" },
  { border: "border-amber-500/70 dark:border-amber-400/60", glow: "from-amber-500/40 via-amber-400/20 to-transparent", solid: "from-amber-200/80 to-amber-100 dark:from-amber-900/60 dark:to-amber-800/60", icon: "text-amber-700 dark:text-amber-400", text: "text-amber-900 dark:text-white" },
  { border: "border-rose-500/70 dark:border-rose-400/60", glow: "from-rose-500/40 via-rose-400/20 to-transparent", solid: "from-rose-200/80 to-rose-100 dark:from-rose-900/60 dark:to-rose-800/60", icon: "text-rose-700 dark:text-rose-400", text: "text-rose-900 dark:text-white" },
  { border: "border-cyan-500/70 dark:border-cyan-400/60", glow: "from-cyan-500/40 via-cyan-400/20 to-transparent", solid: "from-cyan-200/80 to-cyan-100 dark:from-cyan-900/60 dark:to-cyan-800/60", icon: "text-cyan-700 dark:text-cyan-400", text: "text-cyan-900 dark:text-white" },
  { border: "border-orange-500/70 dark:border-orange-400/60", glow: "from-orange-500/40 via-orange-400/20 to-transparent", solid: "from-orange-200/80 to-orange-100 dark:from-orange-900/60 dark:to-orange-800/60", icon: "text-orange-700 dark:text-orange-400", text: "text-orange-900 dark:text-white" },
  { border: "border-indigo-500/70 dark:border-indigo-400/60", glow: "from-indigo-500/40 via-indigo-400/20 to-transparent", solid: "from-indigo-200/80 to-indigo-100 dark:from-indigo-900/60 dark:to-indigo-800/60", icon: "text-indigo-700 dark:text-indigo-400", text: "text-indigo-900 dark:text-white" },
];

// ✅ MouseFollower
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
        isHovering ? `${borderColor} border-opacity-100 shadow-lg` : 'border-transparent border-opacity-0'
      } ${className}`}
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

export default function PricingFaq() {
  const { ref, isVisible } = useScrollReveal();
  
  // ✅ Pehla question open nahi hoga
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section ref={ref} className={`relative overflow-hidden py-24 scroll-reveal ${isVisible ? 'visible' : ''}`}>
      
      {/* ========== NEW SHADES (SAME AS VERIFYHERO) ========== */}
      {/* LIGHT MODE PURPLISH BACKGROUND SHADE */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/70 via-white to-white block dark:hidden" />
      
      {/* DARK MODE BACKGROUND GLOW */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2d1045] via-[#150b2e] to-[#0d071a] hidden dark:block" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl dark:bg-purple-500/10" />
      {/* ====================================================== */}

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ================= CREATIVE HEADER ================= */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/30 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-600 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-brand-400">
            <Sparkles className="h-3.5 w-3.5" /> Support
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 dark:bg-green-900/40 px-3 py-1 text-xs font-semibold text-green-700 dark:text-green-300">
              <MessageCircle className="h-3 w-3" /> Live Chat
            </span>
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
            Need answers?{" "}
            <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-purple-300 dark:to-violet-300">
              We've got you.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">
            Frequently asked questions about pricing, plans, and how Stallio works.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ================= LEFT SIDE (STICKY CTA) ================= */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-3xl bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 p-8 shadow-2xl shadow-purple-500/20">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md mb-6">
                  <MessageCircle className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Still have questions?
                </h3>
                <p className="mt-3 text-sm text-purple-100 leading-relaxed">
                  Can't find the answer you're looking for? Our friendly support team is here to help you.
                </p>
                <div className="mt-6">
                  <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-purple-600 transition-all duration-300 hover:shadow-xl hover:bg-purple-50">
                    Contact Support <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE (ACCORDION) ================= */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {FAQS.map((faq, index) => {
                const color = COLORS[index % COLORS.length];
                const isOpen = activeIndex === index;

                return (
                  <MouseFollower
                    key={index}
                    borderColor={color.border}
                    glowColor={color.glow}
                    className="w-full"
                  >
                    <div
                      className={`rounded-2xl border-2 border-transparent bg-gradient-to-br ${color.solid}`}
                    >
                      <button
                        onClick={() => setActiveIndex(isOpen ? null : index)}
                        className="flex w-full items-center justify-between p-5 text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/50 dark:bg-white/5`}>
                            <HelpCircle className={`h-5 w-5 ${isOpen ? color.icon : color.text}`} />
                          </div>
                          <span className={`text-base font-semibold ${isOpen ? color.text : "text-slate-700 dark:text-slate-300"}`}>
                            {faq.question}
                          </span>
                        </div>
                        <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-500 ${isOpen ? `rotate-180 ${color.icon}` : color.text}`} />
                      </button>

                      {/* ✅ Sirf Answer Par Animation */}
                      <div
                        className={`faq-answer ${isOpen ? "max-h-60 opacity-1 translate-y-0" : "max-h-0 opacity-0 translate-y-4"}`}
                      >
                        <p className="px-5 pb-5 pl-19 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </MouseFollower>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}