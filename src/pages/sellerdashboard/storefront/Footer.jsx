// src/pages/sellerdashboard/storefront/Footer.jsx

import { useState, useEffect } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { getFooterPage, saveFooterPage } from "../../../api/storefrontApi";
import {
  Save,
  CheckCircle,
  Loader2,
  AlertCircle,
  X,
  FileText,
  Image,
  Type,
  AlignLeft,
  Sparkles,
  HelpCircle
} from "lucide-react";

export default function FooterStorefront() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [formData, setFormData] = useState({
    enabled: true,
    logo: "",
    title: "",
    description: ""
  });
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getFooterPage();
        if (response.success) {
          setFormData(response.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const showToast = (message, isError = false) => {
    setToastMessage({ text: message, isError });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSave = async () => {
    const errors = {};

    if (formData.enabled) {
      if (!formData.title?.trim()) errors.title = "Footer title is required";
      if (!formData.description?.trim()) errors.description = "Footer description is required";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      showToast("Please fill in all required fields ❌", true);
      return;
    }

    setValidationErrors({});
    setIsSaving(true);
    try {
      await saveFooterPage(formData);
      setIsSaved(true);
      showToast("Footer page saved successfully! ✅");
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      showToast("Failed to save. Please try again. ❌", true);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleEnabled = () => {
    setFormData({ ...formData, enabled: !formData.enabled });
    setValidationErrors({});
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
        <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm">Loading footer page...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-6 rounded-xl text-center border-2 ${isDark ? "bg-red-900/30 border-red-800/40" : "bg-red-50 border-red-200"}`}>
        <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Failed to Load</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-3 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5">

      {/* ✅ Toast - Chota Box */}
      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 px-3 py-2 rounded-xl shadow-lg border max-w-xs w-auto flex items-center gap-2 ${
          toastMessage.isError 
            ? isDark ? "bg-red-900/80 border-red-600 text-white" : "bg-red-50 border-red-400 text-red-700"
            : isDark ? "bg-gray-800 border-purple-700" : "bg-white border-gray-200"
        }`}>
          {toastMessage.isError ? (
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          ) : (
            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          )}
          <span className="text-xs font-medium flex-1">{toastMessage.text}</span>
          <button onClick={() => setToastMessage(null)} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <span className="flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase text-purple-500 dark:text-purple-400">
            <FileText className="w-3.5 h-3.5" />
            Your Storefront
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">Footer</h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Customize the footer at the bottom of your store with logo, title, and description.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-1.5 sm:gap-2 border-2 border-transparent ${isSaving ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isSaving ? <><Loader2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 animate-spin" /> <span className="hidden xs:inline">Saving...</span></> : isSaved ? <><CheckCircle className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> <span className="hidden xs:inline">Saved!</span></> : <><Save className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> <span>Save Footer</span></>}
          </button>
        </div>
      </div>

      {/* Enable Toggle */}
      <div className={`p-4 sm:p-5 rounded-xl border-2 transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 ${
        isDark ? "bg-gray-800/50 border-purple-700" : "bg-gray-50/80 border-purple-300"
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleEnabled}
              aria-pressed={formData.enabled}
              className={`relative inline-flex flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-300 ${
                formData.enabled ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                  formData.enabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Show footer on store
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formData.enabled ? "Visible to customers" : "Hidden from customers"}
              </p>
            </div>
            <HelpCircle className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${formData.enabled ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"}`}>
            {formData.enabled ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      {/* Form Fields */}
      <div className={`p-4 sm:p-5 rounded-xl border-2 transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 ${
        isDark ? "bg-gray-800/50 border-purple-700" : "bg-gray-50/80 border-purple-300"
      } ${!formData.enabled ? "opacity-60" : ""}`}>
        <div className="space-y-4 sm:space-y-5">

          {/* Logo */}
          <div>
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <Image className="w-4 h-4" />
              Logo URL
            </label>
            <input
              type="text"
              value={formData.logo || ""}
              onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
              disabled={!formData.enabled}
              placeholder="https://example.com/logo.png"
              className={`mt-1 w-full px-3 py-2 rounded-xl text-sm border-2 disabled:cursor-not-allowed ${isDark ? "bg-gray-800 border-purple-700 text-white" : "bg-white/80 border-gray-300 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
          </div>

          {/* Title - ✅ Error Message NEE CHE */}
          <div>
            <label className="text-xs font-bold flex items-center gap-1.5">
              <Type className="w-4 h-4" />
              Footer Title {formData.enabled && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              value={formData.title || ""}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                setValidationErrors({ ...validationErrors, title: false });
              }}
              disabled={!formData.enabled}
              placeholder="Sweet Cravings Studio"
              className={`mt-1 w-full px-3 py-2 rounded-xl text-sm border-2 transition-colors disabled:cursor-not-allowed ${
                validationErrors.title
                  ? "border-red-500 focus:ring-red-500"
                  : isDark 
                    ? "bg-gray-800 border-purple-700 text-white hover:border-purple-500" 
                    : "bg-white/80 border-gray-300 text-gray-900 hover:border-purple-400"
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
            {/* ✅ Error message YAHAN - Input ke NEE CHE */}
            {validationErrors.title && (
              <p className="text-xs text-red-500 mt-1.5 flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span className="break-words">{validationErrors.title}</span>
              </p>
            )}
          </div>

          {/* Description - ✅ Error Message NEE CHE */}
          <div>
            <label className="text-xs font-bold flex items-center gap-1.5">
              <AlignLeft className="w-4 h-4" />
              Footer Description {formData.enabled && <span className="text-red-500">*</span>}
            </label>
            <textarea
              value={formData.description || ""}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                setValidationErrors({ ...validationErrors, description: false });
              }}
              disabled={!formData.enabled}
              rows={3}
              placeholder="Delicious handcrafted treats made with love."
              className={`mt-1 w-full px-3 py-2 rounded-xl text-sm resize-none border-2 transition-colors disabled:cursor-not-allowed ${
                validationErrors.description
                  ? "border-red-500 focus:ring-red-500"
                  : isDark 
                    ? "bg-gray-800 border-purple-700 text-white hover:border-purple-500" 
                    : "bg-white/80 border-gray-300 text-gray-900 hover:border-purple-400"
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
            {/* ✅ Error message YAHAN - Input ke NEE CHE */}
            {validationErrors.description && (
              <p className="text-xs text-red-500 mt-1.5 flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span className="break-words">{validationErrors.description}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className={`p-4 rounded-xl border-2 transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 ${
        isDark ? "border-purple-700/50 bg-purple-900/20" : "border-purple-300 bg-purple-50/40"
      }`}>
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">✨ Tips for footer</p>
            <ul className="text-xs text-gray-600 dark:text-gray-400 mt-1 space-y-1">
              <li>• Add your brand logo to build recognition</li>
              <li>• Keep the footer description short and impactful</li>
              <li>• Make sure your footer is consistent with your brand</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}