// src/pages/sellerdashboard/storefront/Others.jsx

import { useState, useEffect } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { getOthersPage, saveOthersPage } from "../../../api/storefrontApi";
import {
  Save,
  CheckCircle,
  Loader2,
  AlertCircle,
  X,
  FileText,
  Sparkles,
  HelpCircle,
  Megaphone,
  Truck,
  Clock,
  CreditCard,
  FileCheck,
  MessageSquare,
  Languages
} from "lucide-react";

export default function OthersStorefront() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [formData, setFormData] = useState({
    announcement: {
      enabled: false,
      text: "",
    },
    delivery: {
      enabled: false,
      estimatedTime: "",
      codEnabled: false,
    },
    checkout: {
      note: "",
    },
    returnPolicy: {
      enabled: false,
    },
    shopLanguages: ["EN"],
  });
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getOthersPage();
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

  // ✅ Validation Function
  const validateForm = () => {
    const errors = {};

    // Check if any toggle is ON
    const isAnnouncementOn = formData.announcement?.enabled;
    const isDeliveryOn = formData.delivery?.enabled;
    const isReturnPolicyOn = formData.returnPolicy?.enabled;

    // If NO toggle is ON
    if (!isAnnouncementOn && !isDeliveryOn && !isReturnPolicyOn) {
      errors.general = "Please enable at least one feature (Announcement, Delivery, or Return Policy)";
      setValidationErrors(errors);
      return false;
    }

    // If Announcement is ON but text is empty
    if (isAnnouncementOn && !formData.announcement?.text?.trim()) {
      errors.announcementText = "Announcement text is required when enabled";
    }

    // If Delivery is ON but estimated time is empty
    if (isDeliveryOn && !formData.delivery?.estimatedTime?.trim()) {
      errors.deliveryTime = "Estimated delivery time is required when enabled";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return false;
    }

    setValidationErrors({});
    return true;
  };

  const handleSave = async () => {
    // ✅ Run validation
    if (!validateForm()) {
      showToast("Please fill in all required fields ❌", true);
      return;
    }

    setIsSaving(true);
    try {
      await saveOthersPage(formData);
      setIsSaved(true);
      showToast("Others settings saved successfully! ✅");
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      showToast("Failed to save. Please try again. ❌", true);
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle Functions with validation clear
  const toggleAnnouncement = () => {
    setFormData({
      ...formData,
      announcement: { ...formData.announcement, enabled: !formData.announcement.enabled }
    });
    setValidationErrors({});
  };

  const toggleDelivery = () => {
    setFormData({
      ...formData,
      delivery: { ...formData.delivery, enabled: !formData.delivery.enabled }
    });
    setValidationErrors({});
  };

  const toggleCOD = () => {
    setFormData({
      ...formData,
      delivery: { ...formData.delivery, codEnabled: !formData.delivery.codEnabled }
    });
  };

  const toggleReturnPolicy = () => {
    setFormData({
      ...formData,
      returnPolicy: { ...formData.returnPolicy, enabled: !formData.returnPolicy.enabled }
    });
    setValidationErrors({});
  };

  const toggleLanguage = (lang) => {
    const current = formData.shopLanguages || [];
    let newLanguages;
    if (current.includes(lang)) {
      newLanguages = current.filter((l) => l !== lang);
    } else {
      newLanguages = [...current, lang];
    }
    setFormData({ ...formData, shopLanguages: newLanguages });
  };

  const languageOptions = [
    { value: "EN", label: "English" },
    { value: "ES", label: "Spanish" },
    { value: "AR", label: "Arabic" },
    { value: "UR", label: "Urdu" },
    { value: "FR", label: "French" },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
        <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm">Loading settings...</p>
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

      {/* Toast */}
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
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">Others</h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Announcement bar, delivery pricing, and checkout options for your store.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-1.5 sm:gap-2 border-2 border-transparent ${isSaving ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isSaving ? <><Loader2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 animate-spin" /> <span className="hidden xs:inline">Saving...</span></> : isSaved ? <><CheckCircle className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> <span className="hidden xs:inline">Saved!</span></> : <><Save className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> <span>Save Settings</span></>}
          </button>
        </div>
      </div>

      {/* ===== Shop Languages ===== */}
      <div className={`p-4 sm:p-5 rounded-xl border-2 transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 ${
        isDark ? "bg-gray-800/50 border-purple-700" : "bg-gray-50/80 border-purple-300"
      }`}>
        <div className="flex items-center gap-2 mb-3">
          <Languages className="w-5 h-5 text-purple-500" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Shop Languages</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {languageOptions.map((lang) => (
            <button
              key={lang.value}
              onClick={() => toggleLanguage(lang.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-all ${
                (formData.shopLanguages || []).includes(lang.value)
                  ? "bg-purple-600 text-white border-purple-600"
                  : isDark 
                    ? "bg-gray-800 border-gray-700 text-gray-300 hover:border-purple-500" 
                    : "bg-white border-gray-300 text-gray-700 hover:border-purple-400"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Select languages available in your store.
        </p>
      </div>

      {/* ===== Announcement ===== */}
      <div className={`p-4 sm:p-5 rounded-xl border-2 transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 ${
        isDark ? "bg-gray-800/50 border-purple-700" : "bg-gray-50/80 border-purple-300"
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <Megaphone className="w-5 h-5 text-purple-500" />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Show Announcement Bar</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formData.announcement?.enabled ? "Visible to customers" : "Hidden from customers"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleAnnouncement}
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                formData.announcement?.enabled ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                  formData.announcement?.enabled ? "translate-x-5 left-0.5" : "translate-x-0.5 left-0"
                }`}
              />
            </button>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              formData.announcement?.enabled 
                ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300" 
                : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            }`}>
              {formData.announcement?.enabled ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
        {formData.announcement?.enabled && (
          <div className="mt-3">
            <input
              type="text"
              value={formData.announcement?.text || ""}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  announcement: { ...formData.announcement, text: e.target.value }
                });
                setValidationErrors({ ...validationErrors, announcementText: false });
              }}
              placeholder="Enter announcement text..."
              className={`w-full px-3 py-2 rounded-xl text-sm border-2 ${
                validationErrors.announcementText
                  ? "border-red-500 focus:ring-red-500"
                  : isDark ? "bg-gray-800 border-purple-700 text-white" : "bg-white/80 border-gray-300 text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
            {validationErrors.announcementText && (
              <p className="text-xs text-red-500 mt-1.5 flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span className="break-words">{validationErrors.announcementText}</span>
              </p>
            )}
          </div>
        )}
      </div>

      {/* ===== Delivery Charges ===== */}
      <div className={`p-4 sm:p-5 rounded-xl border-2 transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 ${
        isDark ? "bg-gray-800/50 border-purple-700" : "bg-gray-50/80 border-purple-300"
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-purple-500" />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Enable Delivery Charges</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formData.delivery?.enabled ? "Delivery charges enabled" : "Delivery charges disabled"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleDelivery}
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                formData.delivery?.enabled ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                  formData.delivery?.enabled ? "translate-x-5 left-0.5" : "translate-x-0.5 left-0"
                }`}
              />
            </button>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              formData.delivery?.enabled 
                ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300" 
                : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            }`}>
              {formData.delivery?.enabled ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        {formData.delivery?.enabled && (
          <div className="mt-3 space-y-3">
            {/* Estimated Delivery Time */}
            <div>
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                Estimated Delivery Time <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.delivery?.estimatedTime || ""}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    delivery: { ...formData.delivery, estimatedTime: e.target.value }
                  });
                  setValidationErrors({ ...validationErrors, deliveryTime: false });
                }}
                placeholder="e.g. 1-2 days"
                className={`mt-1 w-full px-3 py-2 rounded-xl text-sm border-2 ${
                  validationErrors.deliveryTime
                    ? "border-red-500 focus:ring-red-500"
                    : isDark ? "bg-gray-800 border-purple-700 text-white" : "bg-white/80 border-gray-300 text-gray-900"
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
              {validationErrors.deliveryTime && (
                <p className="text-xs text-red-500 mt-1.5 flex items-start gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span className="break-words">{validationErrors.deliveryTime}</span>
                </p>
              )}
            </div>

            {/* Cash On Delivery */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Cash On Delivery</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formData.delivery?.codEnabled ? "COD is turned on" : "COD is turned off"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleCOD}
                className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                  formData.delivery?.codEnabled ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-600"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                    formData.delivery?.codEnabled ? "translate-x-5 left-0.5" : "translate-x-0.5 left-0"
                  }`}
                />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ===== Checkout ===== */}
      <div className={`p-4 sm:p-5 rounded-xl border-2 transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 ${
        isDark ? "bg-gray-800/50 border-purple-700" : "bg-gray-50/80 border-purple-300"
      }`}>
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="w-5 h-5 text-purple-500" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Checkout</h3>
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
            Checkout Note (Optional)
          </label>
          <textarea
            value={formData.checkout?.note || ""}
            onChange={(e) => setFormData({
              ...formData,
              checkout: { ...formData.checkout, note: e.target.value }
            })}
            rows={2}
            placeholder="e.g. Delivery charges may vary for remote areas."
            className={`mt-1 w-full px-3 py-2 rounded-xl text-sm resize-none border-2 ${
              isDark ? "bg-gray-800 border-purple-700 text-white" : "bg-white/80 border-gray-300 text-gray-900"
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
        </div>
      </div>

      {/* ===== Return and Exchange Policy ===== */}
      <div className={`p-4 sm:p-5 rounded-xl border-2 transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 ${
        isDark ? "bg-gray-800/50 border-purple-700" : "bg-gray-50/80 border-purple-300"
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <FileCheck className="w-5 h-5 text-purple-500" />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Show Return and Exchange Policy in store</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formData.returnPolicy?.enabled ? "Visible to customers" : "Hidden from customers"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleReturnPolicy}
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                formData.returnPolicy?.enabled ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                  formData.returnPolicy?.enabled ? "translate-x-5 left-0.5" : "translate-x-0.5 left-0"
                }`}
              />
            </button>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              formData.returnPolicy?.enabled 
                ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300" 
                : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            }`}>
              {formData.returnPolicy?.enabled ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </div>

      {/* ✅ General Validation Error */}
      {validationErrors.general && (
        <div className={`p-3 rounded-xl border-2 ${isDark ? "border-red-600 bg-red-900/20" : "border-red-400 bg-red-50"} flex items-start gap-2`}>
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600 dark:text-red-400">{validationErrors.general}</p>
        </div>
      )}

      {/* Tips */}
      <div className={`p-4 rounded-xl border-2 transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 ${
        isDark ? "border-purple-700/50 bg-purple-900/20" : "border-purple-300 bg-purple-50/40"
      }`}>
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">✨ Tips for store settings</p>
            <ul className="text-xs text-gray-600 dark:text-gray-400 mt-1 space-y-1">
              <li>• Use the announcement bar to share important updates with customers</li>
              <li>• Enable delivery charges if you offer shipping</li>
              <li>• Add a checkout note to inform customers about delivery policies</li>
              <li>• Return policy builds trust with your customers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}