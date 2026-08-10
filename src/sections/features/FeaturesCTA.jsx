import { ArrowRight, Sparkles } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function FeaturesCTA() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/features_CTA.jpg" 
          alt="" 
          className="h-full w-full object-cover opacity-60 dark:opacity-45 blur-sm" 
        />
      </div>
      
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-400/20 z-0" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[30rem] w-[30rem] rounded-full bg-purple-400/12 blur-3xl dark:bg-purple-400/15 z-0" />
      
      <div className={`relative z-10 mx-auto max-w-content text-center scroll-reveal ${isVisible ? 'visible' : ''}`}>
        
        <div className="inline-flex items-center gap-2 self-start rounded-full border border-indigo-200/30 bg-white/70 px-4 py-1.5 text-sm font-medium text-brand-600 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-slate-300">
          <Sparkles className="h-4 w-4" strokeWidth={2} />
          See it on a real storefront
        </div>

        <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl lg:text-5xl">
          Spin up your shop in minutes,{' '}
          <br className="hidden sm:block" />
          or {" "}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
            browse the demo
          </span>{" "}
          first.
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          No card on file. Get started in minutes.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#start-free"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-colors duration-300 hover:shadow-xl hover:shadow-indigo-500/35 hover:brightness-110 dark:shadow-indigo-500/20"
          >
            Start Free
            <ArrowRight className="h-5 w-5 transition-none" />
          </a>
          <a
            href="#demo"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/60 px-8 py-3.5 text-base font-semibold text-slate-600 transition-colors duration-300 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md dark:border-white/10 dark:bg-white/10 dark:text-slate-300 dark:hover:border-indigo-400 dark:hover:bg-white/15 dark:hover:text-indigo-400"
          >
            Browse Demo
          </a>
        </div>
      </div>
    </section>
  );
}