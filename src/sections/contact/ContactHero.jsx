// src/sections/contact/ContactHero.jsx
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function ContactHero() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="relative overflow-hidden px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0d071a] h-screen max-h-[800px] flex items-center justify-center">
      {/* Background Image - Light mode */}
      <div 
        className="absolute inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-70 blur-sm"
        style={{
          backgroundImage: "url('/images/contact_hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      {/* Background Image - Dark mode */}
      <div 
        className="absolute inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-50 blur-sm hidden dark:block"
        style={{
          backgroundImage: "url('/images/contact_hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      {/* Light mode overlay */}
      <div className="absolute inset-0 z-0 bg-white/40" />
      
      {/* Dark mode gradient overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2d1045]/70 via-[#150b2e]/70 to-[#0d071a]/80 hidden dark:block" />
      
      {/* Purple glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-500/20" />

      <div className={`relative z-10 mx-auto max-w-7xl text-center scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="max-w-5xl mx-auto">
          <span className="mb-4 inline-block font-mono text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            CONTACT
          </span>  
          <h1 className="font-display text-5xl font-bold text-slate-800 dark:text-white sm:text-6xl lg:text-7xl">
            We read every <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
              message
            </span>
          </h1>
          <p className="mt-6 text-xl text-slate-700 dark:text-slate-200 leading-relaxed max-w-3xl mx-auto">
            Product questions, partnership ideas, or something broken: send a note and we will point you in the right direction.
          </p>
        </div>
      </div>
    </section>
  );
}