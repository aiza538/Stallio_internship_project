// src/sections/verify/VerifyActions.jsx
import { useState } from "react";
import { RefreshCw, CheckCircle, AlertCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

export default function VerifyActions() {
  const { ref, isVisible } = useScrollReveal();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
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

  // RTL mein Arrow flip
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section ref={ref} className={`relative px-4 py-12 sm:px-6 lg:px-8 lg:py-16 bg-white dark:bg-[#0d071a] scroll-reveal ${isVisible ? 'visible' : ''}`}>
      
      {/* ========== SHADES (EXACTLY LIKE LOGIN & VERIFYHERO) ========== */}
      {/* LIGHT MODE PURPLISH BACKGROUND SHADE */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/70 via-white to-white block dark:hidden" />
      
      {/* DARK MODE BACKGROUND GLOW */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2d1045] via-[#150b2e] to-[#0d071a] hidden dark:block" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl dark:bg-purple-500/10" />

      <div className="mx-auto max-w-5xl relative z-10">
        {/* ✅ Box (Width Increased) */}
        <div className="relative overflow-hidden rounded-2xl p-5 sm:p-6 shadow-lg shadow-purple-500/5 transition-all duration-300 hover:shadow-xl">
          
          {/* Light Mode: Solid Flat Purple */}
          <div className="absolute inset-0 bg-purple-100 dark:hidden" />
          
          {/* Dark Mode: Deep Purple Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed] via-[#6d28d9] to-[#4f46e5] hidden dark:block" />
          
          {/* Border */}
          <div className="absolute inset-0 rounded-2xl border border-purple-200/60 dark:border-purple-400/30" />

          <div className="relative z-10">
            <h2 className={`font-semibold text-purple-900 dark:text-white mb-1 ${isRTL ? 'text-2xl font-extrabold text-right' : 'text-lg text-left'}`}>
              {t("verifyActions.title")}
            </h2>
            <p className={`text-indigo-700 dark:text-indigo-100 ${isRTL ? 'text-lg font-bold text-right' : 'text-sm text-left'}`}>
              {t("verifyActions.subtitle")}
            </p>

            {resendStatus === 'success' && (
              <div className={`mt-3 flex items-center gap-2 rounded-lg bg-green-100 dark:bg-green-900/30 p-2.5 text-sm text-green-700 dark:text-green-300 ${isRTL ? 'text-base font-bold flex-row-reverse' : ''}`}>
                <CheckCircle className="h-4 w-4 shrink-0" />
                {t("verifyActions.success")}
              </div>
            )}
            
            {resendStatus === 'error' && (
              <div className={`mt-3 flex items-center gap-2 rounded-lg bg-red-100 dark:bg-red-900/30 p-2.5 text-sm text-red-700 dark:text-red-400 ${isRTL ? 'text-base font-bold flex-row-reverse' : ''}`}>
                <AlertCircle className="h-4 w-4 shrink-0" />
                {t("verifyActions.error")}
              </div>
            )}

            <div className={`mt-4 flex flex-col sm:flex-row gap-3 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              {/* Resend Button - Light: White, Dark: Solid White */}
              <button
                onClick={handleResend}
                disabled={isResending}
                className={`inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300/70 dark:border-white bg-white/70 dark:bg-white text-slate-700 dark:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed backdrop-blur-sm ${isRTL ? 'px-8 py-3.5 text-base font-extrabold flex-row-reverse' : 'px-6 py-2.5 text-sm font-medium'}`}
              >
                <RefreshCw className={`h-4 w-4 ${isResending ? 'animate-spin' : ''}`} />
                {isResending ? t("verifyActions.sending") : t("verifyActions.resend")}
              </button>

              {/* Contact Support - Light: Outline, Dark: Solid White */}
              <Link
                to="/contact"
                className={`inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300/70 dark:border-white bg-white/70 dark:bg-white text-purple-600 dark:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-50 transition-all duration-300 ${isRTL ? 'px-8 py-3.5 text-base font-extrabold flex-row-reverse' : 'px-6 py-2.5 text-sm font-medium'}`}
              >
                {t("verifyActions.contactSupport")} <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>

            <div className={`mt-4 pt-4 border-t border-purple-200/50 dark:border-white/10 ${isRTL ? 'text-right' : 'text-left'}`}>
              <p className={`text-indigo-700 dark:text-indigo-100 ${isRTL ? 'text-base font-bold' : 'text-xs'}`}>
                {t("verifyActions.expiry")}{' '}
                <Link to="/contact" className="text-purple-600 dark:text-purple-300 hover:underline">
                  {t("verifyActions.contactSupportLink")}
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}