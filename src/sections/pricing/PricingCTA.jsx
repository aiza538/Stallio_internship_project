// src/sections/pricing/PricingCTA.jsx
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function PricingCTA() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24 text-center bg-white dark:bg-[#0d071a]">
      
      {/* Light mode - clean white background */}
      {/* Dark mode - same gradient as PricingCards */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2d1045] via-[#150b2e] to-[#0d071a] hidden dark:block" />
      
      {/* Dark mode glows */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl dark:bg-purple-500/10" />
      <div className="pointer-events-none absolute -top-40 left-1/2 z-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-400/20" />
      <div className="pointer-events-none absolute -bottom-40 right-0 z-0 h-[30rem] w-[30rem] rounded-full bg-purple-400/12 blur-3xl dark:bg-purple-400/15" />


        <div className="absolute inset-0 z-0">
        <img 
          src="/images/features_CTA.jpg" 
          alt="" 
          className="h-full w-full object-cover opacity-60 dark:opacity-45 blur-sm" 
        />
      </div>

      <div className={`relative z-10 mx-auto max-w-3xl scroll-reveal ${isVisible ? 'visible' : ''}`}>
        {/* Light mode text */}
        <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
          Still <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-purple-300 dark:via-purple-300 dark:to-violet-300">deciding?</span>
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          Ask us anything on the contact page, or start a trial and see the product for yourself.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-600 backdrop-blur-sm transition-all duration-300 hover:border-purple-400 hover:text-purple-600 dark:border-white/10 dark:bg-white/15 dark:text-slate-300 dark:hover:border-purple-400 dark:hover:bg-white/20"
          >
            Contact Us
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:brightness-105"
          >
            Start Free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}