// src/pages/auth/Signup.jsx
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Mail, Lock, Eye, EyeOff, AtSign, Store, Globe, 
  CreditCard, UploadCloud, UserPlus, CheckCircle2, AlertCircle, ChevronDown, Sparkles, ShieldCheck 
} from "lucide-react";
import { useTranslation } from "react-i18next";

// ✅ Custom Dropdown Component
function CustomDropdown({ options, value, onChange, placeholder = "Select...", icon: Icon }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 px-3 py-2.5 text-left text-slate-900 dark:text-white transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5 text-slate-400" />}
          <span className={selectedOption ? "" : "text-slate-400"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-60 overflow-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1e1b38] p-1.5 shadow-xl">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                value === option.value
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300"
                  : "text-slate-700 hover:bg-slate-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-700/50"
              }`}
            >
              <span>{option.label}</span>
              {value === option.value && <CheckCircle2 className="h-4 w-4 text-indigo-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Signup() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [shopNameError, setShopNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [generalError, setGeneralError] = useState("");
  
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

  const isEmailValid = formData.email.trim() !== "" && /\S+@\S+\.\S+/.test(formData.email);
  const isPasswordValid = formData.password.trim() !== "";
  const isConfirmPasswordValid = formData.confirmPassword.trim() !== "";
  const isShopNameValid = formData.shopName.trim() !== "";
  const isUsernameValid = formData.username.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setShopNameError("");
    setUsernameError("");
    setGeneralError("");

    if (!isEmailValid) setEmailError(t("auth.signup.emailRequired"));
    if (!isPasswordValid) setPasswordError(t("auth.signup.passwordRequired"));
    if (!isConfirmPasswordValid) setConfirmPasswordError(t("auth.signup.confirmPasswordRequired"));
    if (!isShopNameValid) setShopNameError(t("auth.signup.shopNameRequired"));
    if (!isUsernameValid) setUsernameError(t("auth.signup.usernameRequired"));

    if (isEmailValid && isPasswordValid && isConfirmPasswordValid && isShopNameValid && isUsernameValid) {
      if (formData.password !== formData.confirmPassword) {
        setConfirmPasswordError(t("auth.signup.passwordMismatch"));
        return;
      }
      console.log("Signup attempt:", formData);
    } else {
      setGeneralError(t("auth.signup.fillAllFields"));
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-[#0d071a] px-3 py-10 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* ========== NEW SHADES (SAME AS VERIFYHERO) ========== */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/70 via-white to-white block dark:hidden" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2d1045] via-[#150b2e] to-[#0d071a] hidden dark:block" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl dark:bg-purple-500/10" />

      {/* ✅ Creative Split Layout + Animation */}
      <div className="relative z-10 flex w-full max-w-6xl my-8 shadow-2xl shadow-indigo-500/10 dark:shadow-black/40 rounded-3xl overflow-hidden animate-on-load border-2 border-indigo-300/60 dark:border-purple-500/40 ring-4 ring-purple-200/30 dark:ring-purple-900/20">
        
        {/* ========== LEFT SIDE (Desktop only) ========== */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-200 via-purple-100 to-indigo-100 dark:from-indigo-700 dark:via-purple-800 dark:to-violet-900 p-12 flex-col justify-between relative overflow-hidden">
          <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-purple-300/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-indigo-300/20 blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2">
              <img src="/Stallio_Logo.png" alt="Stallio" className="h-12 w-auto" />
              <span className="text-4xl text-purple-900 dark:text-white" style={{ fontFamily: "'Great Vibes', cursive", lineHeight: 0.8, marginTop: "6px", display: "block" }}>Stallio</span>
            </div>
            
            <h1 className="mt-12 text-5xl font-bold text-purple-900 dark:text-white leading-tight">
              <span className="block">{t("auth.signup.title1")}</span>
              <span className="block text-indigo-700 dark:text-indigo-300">{t("auth.signup.titleHighlight")}</span>
            </h1>
            <p className="mt-4 text-lg text-indigo-700 dark:text-indigo-300">{t("auth.signup.subtitle")}</p>

            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-4 text-purple-900 dark:text-white/90">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-300/40 dark:bg-white/10">
                  <Store className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{t("auth.signup.freeTrial")}</p>
                  <p className="text-sm text-indigo-700 dark:text-indigo-300">{t("auth.signup.noCardRequired")}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-purple-900 dark:text-white/90">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-300/40 dark:bg-white/10">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{t("auth.signup.secureReliable")}</p>
                  <p className="text-sm text-indigo-700 dark:text-indigo-300">{t("auth.signup.dataProtected")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-12">
            <div className="flex items-center gap-4 text-purple-900 dark:text-white/80">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-300/40 dark:bg-white/10">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <p className="text-lg font-semibold">{t("auth.signup.oneLink")}</p>
                <p className="text-sm text-indigo-700 dark:text-indigo-300">{t("auth.signup.readyToShare")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ========== RIGHT SIDE (Signup Form) ========== */}
        <div className="w-full md:w-1/2 bg-white/90 dark:bg-[#18132a]/90 backdrop-blur-lg p-6 sm:p-10 flex flex-col justify-center">
          
          {/* ✅ Mobile Header with PERFECT Logo Alignment */}
          <div className="md:hidden mb-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <img src="/Stallio_Logo.png" alt="Stallio" className="h-10 w-auto" />
              <span className="text-3xl text-slate-800 dark:text-white" style={{ fontFamily: "'Great Vibes', cursive", lineHeight: 0.8, marginTop: "5px", display: "block" }}>Stallio</span>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" /> {t("auth.signup.sellerSignup")}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
              {t("auth.signup.createYourShop")} <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">shop</span>
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t("auth.signup.freeTrial")}</p>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:block">
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 mb-4">
              <Sparkles className="h-3.5 w-3.5" /> {t("auth.signup.sellerSignup")}
            </span>
            <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white">
              {t("auth.signup.createYourShop")} <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">shop</span>
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t("auth.signup.freeTrial")}</p>
          </div>

          <form className="mt-6 md:mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {t("auth.signup.email")} <span className="text-rose-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-10 py-2.5 border rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md ${emailError ? "border-red-500" : "border-slate-200 dark:border-slate-700"}`}
                    placeholder="you@example.com"
                  />
                  {isEmailValid && <div className="absolute inset-y-0 right-0 pr-3 flex items-center"><CheckCircle2 className="h-5 w-5 text-green-500" /></div>}
                </div>
                {emailError && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> {emailError}</p>}
              </div>

              <div>
                <label htmlFor="shopName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {t("auth.signup.shopName")} <span className="text-rose-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Store className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="shopName"
                    name="shopName"
                    type="text"
                    value={formData.shopName}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-10 py-2.5 border rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md ${shopNameError ? "border-red-500" : "border-slate-200 dark:border-slate-700"}`}
                    placeholder="My Awesome Shop"
                  />
                  {isShopNameValid && <div className="absolute inset-y-0 right-0 pr-3 flex items-center"><CheckCircle2 className="h-5 w-5 text-green-500" /></div>}
                </div>
                {shopNameError && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> {shopNameError}</p>}
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {t("auth.signup.username")} <span className="text-rose-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <AtSign className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-10 py-2.5 border rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md ${usernameError ? "border-red-500" : "border-slate-200 dark:border-slate-700"}`}
                    placeholder="myshop"
                  />
                  {isUsernameValid && <div className="absolute inset-y-0 right-0 pr-3 flex items-center"><CheckCircle2 className="h-5 w-5 text-green-500" /></div>}
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t("auth.signup.usernameHint")}</p>
                {usernameError && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> {usernameError}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {t("auth.signup.password")} <span className="text-rose-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-10 py-2.5 border rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md ${passwordError ? "border-red-500" : "border-slate-200 dark:border-slate-700"}`}
                    placeholder="Create a strong password"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                  {isPasswordValid && <div className="absolute inset-y-0 right-12 pr-3 flex items-center"><CheckCircle2 className="h-5 w-5 text-green-500" /></div>}
                </div>
                {passwordError && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> {passwordError}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {t("auth.signup.confirmPassword")} <span className="text-rose-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-10 py-2.5 border rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md ${confirmPasswordError ? "border-red-500" : "border-slate-200 dark:border-slate-700"}`}
                    placeholder="Repeat password"
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                  {isConfirmPasswordValid && <div className="absolute inset-y-0 right-12 pr-3 flex items-center"><CheckCircle2 className="h-5 w-5 text-green-500" /></div>}
                </div>
                {confirmPasswordError && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> {confirmPasswordError}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {t("auth.signup.country")} <span className="text-rose-500">*</span>
                </label>
                <CustomDropdown
                  options={[
                    { value: "US", label: "United States" },
                    { value: "PK", label: "Pakistan" },
                    { value: "UK", label: "United Kingdom" },
                  ]}
                  value={formData.country}
                  onChange={(val) => setFormData((prev) => ({ ...prev, country: val }))}
                  placeholder={t("auth.signup.searchCountry")}
                  icon={Globe}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {t("auth.signup.currency")} <span className="text-rose-500">*</span>
                </label>
                <CustomDropdown
                  options={[
                    { value: "USD", label: "USD ($)" },
                    { value: "PKR", label: "PKR (Rs)" },
                    { value: "EUR", label: "EUR (€)" },
                  ]}
                  value={formData.currency}
                  onChange={(val) => setFormData((prev) => ({ ...prev, currency: val }))}
                  placeholder={t("auth.signup.searchCurrency")}
                  icon={CreditCard}
                />
              </div>

              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {t("auth.signup.shopLogo")}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UploadCloud className="h-5 w-5 text-slate-400" />
                  </div>
                  <div className="block w-full pl-10 pr-3 py-2.5 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-500 cursor-pointer">
                    <span className="text-sm">{t("auth.signup.chooseLogo")}</span>
                  </div>
                </div>
              </div>
            </div>

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
                  {t("auth.signup.agree")}{" "}
                  <Link to="/terms" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                    {t("auth.signup.terms")}
                  </Link>{" "}
                  {t("auth.signup.and")}{" "}
                  <Link to="/privacy" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                    {t("auth.signup.privacy")}
                  </Link>
                </label>
              </div>
            </div>

            {generalError && (
              <div className="flex items-center justify-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 p-2 rounded-lg">
                <AlertCircle className="h-4 w-4" />
                {generalError}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-brand-600 shadow-lg shadow-brand-500/25 transition-all duration-300 hover:bg-brand-700 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]"
              >
                <UserPlus className="h-5 w-5 text-indigo-200 group-hover:text-indigo-100" />
                {t("auth.signup.createMyShop")}
              </button>
            </div>

            <div className="text-center text-sm">
              <span className="text-slate-600 dark:text-slate-400">{t("auth.signup.alreadyHaveShop")} </span>
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                {t("auth.signup.logIn")}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}