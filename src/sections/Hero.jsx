// src/sections/Hero.jsx
import { ArrowRight, Sparkles } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Hero() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-400/15" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[30rem] w-[30rem] rounded-full bg-purple-400/8 blur-3xl dark:bg-purple-400/12" />
      
      <div className="relative mx-auto max-w-content text-center">
        {/* Trust Badge */}
        <div className={`mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200/30 bg-white/50 px-4 py-1.5 text-sm font-medium text-indigo-600 backdrop-blur-sm dark:border-indigo-800/20 dark:bg-white/5 dark:text-indigo-400 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Sparkles className="h-4 w-4" />
          <span>Used by 10,000+ sellers worldwide</span>
        </div>

        {/* Heading */}
        <h1 className={`font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl xl:text-7xl transition-all duration-700 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          Turn Your Catalog Into A
          <br />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-violet-400">
            Real Online Storefront
          </span>
        </h1>

        {/* Subheading */}
        <p className={`mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xl transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          One link for your catalog and orders, so customers know where to buy and you stay organized.
        </p>

        {/* CTA Buttons */}
        <div className={`mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <a
            href="#start-free"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/35 dark:shadow-indigo-500/20"
          >
            Get Started Free
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#learn-more"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/50 px-8 py-3.5 text-base font-semibold text-slate-600 transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-indigo-400 dark:hover:bg-white/10 dark:hover:text-indigo-400"
          >
            Learn More
          </a>
        </div>

        {/* Trust Indicators - Stagger */}
        <div className={`mt-12 flex flex-wrap items-center justify-center gap-8 text-center stagger-children ${isVisible ? 'visible' : ''}`}>
          <div>
            <p className="font-display text-2xl font-bold text-indigo-600 dark:text-indigo-400">10K+</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Active Sellers</p>
          </div>
          <div>
            <p className="font-display text-2xl font-bold text-purple-600 dark:text-purple-400">50K+</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Orders Processed</p>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400">★</span>
            ))}
            <span className="ml-2 text-sm text-slate-500 dark:text-slate-400">4.9/5 Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}