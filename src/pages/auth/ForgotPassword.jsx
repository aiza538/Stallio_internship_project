// src/pages/auth/ForgotPassword.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, ShieldCheck, CheckCircle2, Sparkles, AlertCircle } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const isEmailValid = email.trim() !== "" && /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEmailValid) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    console.log("Reset password for:", email);
    setIsSubmitted(true);
    setTimeout(() => {
      navigate("/verify-email");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-[#0d071a] px-3 py-10 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/70 via-white to-white block dark:hidden" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2d1045] via-[#150b2e] to-[#0d071a] hidden dark:block" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl dark:bg-purple-500/10" />

      {/* ✅ Purple/Blue Border (Ring) */}
      <div className="relative z-10 flex w-full max-w-4xl my-8 shadow-2xl shadow-indigo-500/10 dark:shadow-black/40 rounded-3xl overflow-hidden animate-on-load border-2 border-indigo-300/60 dark:border-purple-500/40 ring-4 ring-purple-200/30 dark:ring-purple-900/20">
        
        {/* Left Side - Desktop only */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-200 via-purple-100 to-indigo-100 dark:from-indigo-700 dark:via-purple-800 dark:to-violet-900 p-10 flex-col justify-between relative overflow-hidden">
          <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-purple-300/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-indigo-300/20 blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2">
              <img src="/Stallio_Logo.png" alt="Stallio" className="h-12 w-auto" />
              <span className="text-4xl text-purple-900 dark:text-white" style={{ fontFamily: "'Great Vibes', cursive", lineHeight: 0.8, marginTop: "6px", display: "block" }}>Stallio</span>
            </div>
            <h1 className="mt-12 text-5xl font-bold text-purple-900 dark:text-white leading-tight">
              Don't worry, <br />
              <span className="text-indigo-700 dark:text-indigo-300">we've got you.</span>
            </h1>
            <p className="mt-4 text-lg text-indigo-700 dark:text-indigo-300">Enter your email and we'll help you get back into your account securely.</p>
          </div>
          <div className="relative z-10 mt-12">
            <div className="flex items-center gap-4 text-purple-900 dark:text-white/80">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-300/40 dark:bg-white/10">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-lg font-semibold">Secure & Easy</p>
                <p className="text-sm text-indigo-700 dark:text-indigo-300">Your account is protected.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Responsive */}
        <div className="w-full md:w-1/2 bg-white/90 dark:bg-[#18132a]/90 backdrop-blur-lg p-8 sm:p-12 flex flex-col justify-center">
          {/* ✅ Mobile Header with PERFECT Logo Alignment */}
          <div className="md:hidden mb-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <img src="/Stallio_Logo.png" alt="Stallio" className="h-10 w-auto" />
              {/* leading-none ensures no extra height */}
              <span className="text-3xl text-slate-800 dark:text-white" style={{ fontFamily: "'Great Vibes', cursive", lineHeight: 0.8, marginTop: "5px", display: "block" }}>Stallio</span>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" /> Reset Password
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">Reset <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">password</span></h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">We'll send you a link to reset your password.</p>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:block">
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 mb-4">
              <Sparkles className="h-3.5 w-3.5" /> Reset Password
            </span>
            <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white">Reset <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">password</span></h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">We'll send you a link to reset your password.</p>
          </div>

          <form className="mt-6 md:mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email address <span className="text-red-500">*</span></label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input id="email" name="email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  className={`block w-full pl-10 pr-10 py-2.5 border rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md ${error ? "border-red-500" : "border-slate-200 dark:border-slate-700"}`}
                  placeholder="you@example.com" />
                {isEmailValid && <div className="absolute inset-y-0 right-0 pr-3 flex items-center"><CheckCircle2 className="h-5 w-5 text-green-500" /></div>}
              </div>
              {error && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> {error}</p>}
            </div>

            <div>
              <button type="submit" disabled={isSubmitted}
                className={`group relative w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-xl text-sm font-semibold text-white shadow-lg transition-all duration-300 ${isSubmitted ? "bg-green-600 shadow-green-500/30" : "bg-brand-600 shadow-brand-500/25 hover:bg-brand-700 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]"}`}>
                {isSubmitted ? (<><CheckCircle2 className="h-5 w-5 mr-2" /> Link Sent!</>) : (<>Send reset link</>)}
              </button>
            </div>

            <div className="text-center">
              <Link to="/login" className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-300">
                <ArrowLeft className="h-4 w-4" /> Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}