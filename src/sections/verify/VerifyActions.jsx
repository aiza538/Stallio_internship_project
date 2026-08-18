import { useState } from "react";
import { RefreshCw, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function VerifyActions() {
  const { ref, isVisible } = useScrollReveal();
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState(null);

  const handleResend = () => {
    setIsResending(true);
    setResendStatus(null);
    setTimeout(() => {
      setIsResending(false);
      setResendStatus('success');
      setTimeout(() => setResendStatus(null), 5000);
    }, 1500);
  };

  return (
    <section ref={ref} className={`relative px-4 py-12 sm:px-6 lg:px-8 lg:py-16 bg-white dark:bg-[#0d071a] scroll-reveal ${isVisible ? 'visible' : ''}`}>
      
      {/* ========== SHADES (EXACTLY LIKE LOGIN & VERIFYHERO) ========== */}
      {/* LIGHT MODE PURPLISH BACKGROUND SHADE */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/70 via-white to-white block dark:hidden" />
      
      {/* DARK MODE BACKGROUND GLOW */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2d1045] via-[#150b2e] to-[#0d071a] hidden dark:block" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl dark:bg-purple-500/10" />
      {/* ============================================================== */}

      <div className="mx-auto max-w-2xl relative z-10">
        <div className="rounded-2xl border border-slate-200/50 dark:border-purple-800/30 bg-white/80 dark:bg-white/5 p-6 sm:p-8 backdrop-blur-md shadow-lg shadow-purple-500/5 dark:shadow-purple-900/20 transition-all duration-300 hover:shadow-xl">
          
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
            Didn't receive the email?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Check your spam folder or click below to resend the verification link.
          </p>

          {resendStatus === 'success' && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 dark:bg-green-950/30 p-3 text-sm text-green-700 dark:text-green-400">
              <CheckCircle className="h-4 w-4 shrink-0" />
              Verification email resent successfully!
            </div>
          )}
          
          {resendStatus === 'error' && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 dark:bg-red-950/30 p-3 text-sm text-red-700 dark:text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              Something went wrong. Please try again.
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleResend}
              disabled={isResending}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-purple-800/30 px-6 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white/60 dark:bg-white/10 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed backdrop-blur-sm"
            >
              <RefreshCw className={`h-4 w-4 ${isResending ? 'animate-spin' : ''}`} />
              {isResending ? 'Sending...' : 'Resend verification email'}
            </button>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
            >
              Contact support <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              The verification link expires in 24 hours. If you're still having trouble,{' '}
              <Link to="/contact" className="text-purple-600 dark:text-purple-400 hover:underline">
                contact support
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}