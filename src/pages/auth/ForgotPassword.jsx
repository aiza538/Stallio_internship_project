// src/pages/auth/ForgotPassword.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset password for:", email);
    setIsSubmitted(true);
  };

  return (
    // ✅ Light mode: Purplish white background (unchanged)
    // ✅ Dark mode: matches Login.jsx (defined circular glow, fades to near-black)
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-30 via-purple-35 to-white dark:bg-[radial-gradient(circle_farthest-corner_at_center,_#2d1045_0%,_#25103c_20%,_#1a0b2e_40%,_#120a22_60%,_#0d071a_80%,_#0a0614_100%)] px-3 py-10 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* ✅ Card */}
      <div className="relative z-10 w-full max-w-md space-y-8 bg-white/90 dark:bg-[#18132a]/90 backdrop-blur-lg border border-indigo-200/50 dark:border-indigo-800/40 rounded-2xl p-8 shadow-2xl shadow-indigo-500/10 dark:shadow-black/40 animate-on-load">
        
        {/* Logo Static & Aligned */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-2.5">
            <img src="/Stallio_Logo.png" alt="Stallio" className="h-8 w-auto" />
            <span 
              className="text-2xl text-slate-800 dark:text-white transition-colors duration-300 mt-1"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              Stallio
            </span>
          </div>
          <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white">
            Reset <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
                    password
                </span>
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Enter the email address associated with your account, and we'll send you a link to reset your password.
          </p>
        </div>

        {!isSubmitted ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Email address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-brand-600 shadow-lg shadow-brand-500/25 transition-all duration-300 hover:bg-brand-700 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]"
              >
                Send reset link
              </button>
            </div>

            <div className="text-center">
              <Link to="/login" className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-300">
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </Link>
            </div>
          </form>
        ) : (
          <div className="mt-8 text-center space-y-4">
            <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/50 p-3 w-16 h-16 mx-auto flex items-center justify-center">
              <Mail className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Check your email</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              We sent a password reset link to <strong className="text-slate-900 dark:text-white">{email}</strong>
            </p>
            <div className="pt-4">
              <Link to="/login" className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-300">
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}