import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function ContactCTA() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
      ref={ref} 
      className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-20 text-center bg-white dark:bg-[#0d071a]"
    >
      {/* ========== BACKGROUND GLOW EFFECTS (Same as screenshot) ========== */}
      {/* Light Mode subtle purple glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/60 via-white to-white block dark:hidden" />
      
      {/* Dark Mode deep purple glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2d1045] via-[#150b2e] to-[#0d071a] hidden dark:block" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl dark:bg-purple-500/10" />
      {/* ================================================================== */}

      <div className={`relative z-10 mx-auto max-w-5xl scroll-reveal ${isVisible ? 'visible' : ''}`}>
        
        {/* Flex container for Text on Left and Buttons on Right */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* LEFT SIDE: Text Content */}
          <div className="text-left max-w-lg">
            <p className="text-sm font-semibold tracking-wide text-purple-600 dark:text-purple-400 uppercase mb-2">
              SELF-SERVE
            </p>
            <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl mb-3">
              Trying Stallio <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
              first?
            </span>
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300">
              Most answers live in How it works and Features. Start Free anytime.
            </p>
          </div>

          {/* RIGHT SIDE: Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            
            {/* Button 1: How It Works (Outline style) */}
            <Link
              to="/how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-slate-300/70 dark:border-white/15 bg-white/70 dark:bg-white/10 px-8 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 backdrop-blur-sm transition-all duration-300 hover:border-slate-400 dark:hover:border-white/30 hover:shadow-lg"
            >
              How It Works
            </Link>

            {/* Button 2: Features (Solid Purple style with arrow) */}
            <Link
              to="/features"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/40 hover:brightness-105"
            >
              Features <ArrowRight className="h-4 w-4" />
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}