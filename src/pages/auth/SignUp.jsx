// src/pages/auth/Signup.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Mail, Lock, Eye, EyeOff, AtSign, Store, Globe, 
  CreditCard, UploadCloud, UserPlus 
} from "lucide-react";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    shopName: "",
    username: "",
    password: "",
    confirmPassword: "",
    country: "",
    currency: "",
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup attempt:", formData);
  };

  return (

    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-30 via-purple-35 to-white dark:bg-[radial-gradient(circle_farthest-corner_at_center,_#2d1045_0%,_#25103c_20%,_#1a0b2e_40%,_#120a22_60%,_#0d071a_80%,_#0a0614_100%)] px-3 py-10 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* ✅ Center Radial Glow for Dark Mode only */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2d1045] via-[#0d071a] to-[#0d071a] hidden dark:block" />

      {/* ✅ Card */}
      <div className="relative z-10 w-full max-w-3xl space-y-8 bg-white/90 dark:bg-[#18132a]/90 backdrop-blur-lg border border-indigo-200/50 dark:border-indigo-800/40 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-indigo-500/10 dark:shadow-black/40 animate-on-load">
        
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
            Create your <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
                    shop
                </span>
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Free trial, one store link, and a dashboard to manage products and orders.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Email <span className="text-rose-500">*</span>
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
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Shop Name */}
            <div>
              <label htmlFor="shopName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Shop Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  <Store className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="shopName"
                  name="shopName"
                  type="text"
                  required
                  value={formData.shopName}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md"
                  placeholder="My Awesome Shop"
                />
              </div>
            </div>

            {/* Username (Store URL) */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Username (Store URL) <span className="text-rose-500">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  <AtSign className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md"
                  placeholder="myshop"
                />
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Letters, numbers, underscores and hyphens only
              </p>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Password (Min 8 characters) <span className="text-rose-500">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-10 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Confirm password <span className="text-rose-500">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-10 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md"
                  placeholder="Repeat password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Country */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Country <span className="text-rose-500">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  <Globe className="h-5 w-5 text-slate-400" />
                </div>
                <select
                  id="country"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white dark:bg-[#1e1b38] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md appearance-none"
                >
                  <option value="">Search country...</option>
                  <option value="US">United States</option>
                  <option value="PK">Pakistan</option>
                  <option value="UK">United Kingdom</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-slate-400">▼</span>
                </div>
              </div>
            </div>

            {/* Currency */}
            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Currency <span className="text-rose-500">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  <CreditCard className="h-5 w-5 text-slate-400" />
                </div>
                <select
                  id="currency"
                  name="currency"
                  required
                  value={formData.currency}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white dark:bg-[#1e1b38] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md appearance-none"
                >
                  <option value="">Search currency...</option>
                  <option value="USD">USD ($)</option>
                  <option value="PKR">PKR (Rs)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-slate-400">▼</span>
                </div>
              </div>
            </div>

            {/* Shop Logo (Optional) */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Shop Logo (Optional)
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  <UploadCloud className="h-5 w-5 text-slate-400" />
                </div>
                <div className="block w-full pl-10 pr-3 py-2.5 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-500 cursor-pointer">
                  <span className="text-sm">Choose Logo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start pt-2">
            <div className="flex items-center h-5">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-0 transition-colors duration-300 hover:border-indigo-500 accent-indigo-600"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="agreeTerms" className="text-slate-600 dark:text-slate-400">
                I agree to the{" "}
                <Link to="/terms" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                  Privacy Policy
                </Link>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-brand-600 shadow-lg shadow-brand-500/25 transition-all duration-300 hover:bg-brand-700 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]"
            >
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserPlus className="h-5 w-5 text-indigo-200 group-hover:text-indigo-100" />
              </span>
              Create My Shop
            </button>
          </div>

          <div className="text-center text-sm">
            <span className="text-slate-600 dark:text-slate-400">Already have a shop? </span>
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
              Log In →
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}