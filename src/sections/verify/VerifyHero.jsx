import { MailCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function VerifyHero() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24 bg-white dark:bg-[#0d071a]">
      
      {/* ========== SHADES (EXACTLY LIKE LOGIN) ========== */}
      {/* LIGHT MODE PURPLISH BACKGROUND SHADE */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/70 via-white to-white block dark:hidden" />
      
      {/* DARK MODE BACKGROUND GLOW */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2d1045] via-[#150b2e] to-[#0d071a] hidden dark:block" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl dark:bg-purple-500/10" />
      {/* ================================================== */}

      <div className={`relative z-10 mx-auto max-w-2xl text-center scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="flex justify-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50">
            <MailCheck className="h-10 w-10 text-purple-600 dark:text-purple-400" />
          </div>
        </div>

        <h1 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
          Check your <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
            email
          </span>
        </h1>
        
        <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
          We've sent a verification link to <strong className="text-slate-800 dark:text-white">your@email.com</strong>
        </p>
        
        <div className="mt-6 rounded-xl border border-slate-200/50 dark:border-purple-800/30 bg-white/80 dark:bg-white/5 p-4 backdrop-blur-md shadow-sm">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            ✉️ Click the link in the email to verify your account and start selling.
          </p>
        </div>

        <div className="mt-8">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:brightness-105"
          >
            Go to Login <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}