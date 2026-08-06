// src/sections/FinalCTA.jsx
import { ArrowRight, Sparkles, Rocket } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function FinalCTA() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60 blur-sm dark:opacity-40"
        style={{
          backgroundImage: "url('/images/ready_to_launch.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/40 via-white/20 to-white/50 dark:from-slate-900/40 dark:via-slate-900/20 dark:to-slate-900/50" />
      <div className="absolute inset-0 z-0 bg-white/5 dark:bg-slate-900/5" />
      
      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 z-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-400/20" />
      <div className="pointer-events-none absolute -bottom-40 right-0 z-0 h-[30rem] w-[30rem] rounded-full bg-purple-400/12 blur-3xl dark:bg-purple-400/15" />
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-content text-center">
        {/* ✅ Badge - Light Mode Purple, Dark Mode Black */}
        <div className={`mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200/30 bg-white/60 px-4 py-1.5 text-sm font-medium backdrop-blur-sm transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Rocket className="h-4 w-4 text-indigo-600 dark:text-black" />
          <span className="text-indigo-600 dark:text-black">Start Your Journey Today</span>
        </div>

        {/* Heading */}
        <h2 className={`font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl lg:text-5xl transition-all duration-700 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          Ready to{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:to-violet-300">
            Launch
          </span>{' '}
          Your Store?
        </h2>

        {/* Subheading */}
        <p className={`mx-auto mt-4 max-w-2xl text-lg text-slate-700 dark:text-slate-200 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          Join thousands of sellers who started their journey with Stallio. 
          No credit card required. Get started in minutes.
        </p>

        {/* CTA Buttons */}
        <div className={`mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <a
            href="#start-free"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/35 dark:from-indigo-500 dark:to-violet-500"
          >
            Start Free Trial
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#learn-more"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/60 px-8 py-3.5 text-base font-semibold text-slate-600 transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md dark:border-white/10 dark:bg-white/10 dark:text-slate-300 dark:hover:border-indigo-400 dark:hover:bg-white/15 dark:hover:text-indigo-400"
          >
            Learn More
          </a>
        </div>

        {/* Trust Indicators */}
        <div className={`mt-8 flex flex-wrap items-center justify-center gap-6 text-sm transition-all duration-700 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <Sparkles className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
            No credit card required
          </span>
          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <Sparkles className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
            Free for 30 days
          </span>
          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <Sparkles className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
            Cancel anytime
          </span>
        </div>
      </div>
    </section>
  );
}