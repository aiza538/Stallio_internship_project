// src/pages/sellerdashboard/storefront/Contact.jsx

import { useState, useEffect } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { getContactPage, saveContactPage } from "../../../api/storefrontApi";
import {
  Save,
  CheckCircle,
  Loader2,
  AlertCircle,
  X,
  Phone,
  Mail,
  MapPin,
  Globe,
  FileText,
  Sparkles,
  Plus,
  Trash2
} from "lucide-react";

export default function ContactStorefront() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    address: "",
    socialLinks: []
  });
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getContactPage();
        if (response.success) {
          setFormData({
            phone: response.data.phone || "",
            email: response.data.email || "",
            address: response.data.address || "",
            socialLinks: response.data.socialLinks || []
          });
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

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const handleSave = async () => {
    const errors = {};

    if (!formData.phone?.trim()) {
      errors.phone = "Phone number is required";
    }

    if (!formData.email?.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Enter a valid email address";
    }

    if (!formData.address?.trim()) {
      errors.address = "Address is required";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      showToast("Please fill in all required fields correctly ❌", true);
      return;
    }

    setValidationErrors({});
    setIsSaving(true);
    try {
      await saveContactPage(formData);
      setIsSaved(true);
      showToast("Contact page saved successfully! ✅");
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      showToast("Failed to save. Please try again. ❌", true);
    } finally {
      setIsSaving(false);
    }
  };

  const updateSocialLink = (index, field, value) => {
    const newLinks = [...formData.socialLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setFormData({ ...formData, socialLinks: newLinks });
  };

  const addSocialLink = () => {
    setFormData({
      ...formData,
      socialLinks: [...formData.socialLinks, { platform: "", url: "" }]
    });
  };

  const removeSocialLink = (index) => {
    const newLinks = formData.socialLinks.filter((_, i) => i !== index);
    setFormData({ ...formData, socialLinks: newLinks });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
        <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm">Loading contact page...</p>
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
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">Contact Page</h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Manage your store's contact information.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-1.5 sm:gap-2 border-2 border-transparent ${isSaving ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isSaving ? <><Loader2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 animate-spin" /> <span className="hidden xs:inline">Saving...</span></> : isSaved ? <><CheckCircle className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> <span className="hidden xs:inline">Saved!</span></> : <><Save className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> <span>Save Contact</span></>}
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className={`p-4 sm:p-5 rounded-xl border-2 transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 ${
        isDark ? "bg-gray-800/50 border-purple-700" : "bg-gray-50/80 border-purple-300"
      }`}>
        <div className="space-y-4 sm:space-y-5">

          {/* Phone */}
          <div>
            <label className="text-xs font-bold flex items-center gap-1.5">
              <Phone className="w-4 h-4" />
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.phone || ""}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                setValidationErrors({ ...validationErrors, phone: false });
              }}
              placeholder="+1 (555) 123-4567"
              className={`mt-1 w-full px-3 py-2 rounded-xl text-sm border-2 transition-colors ${
                validationErrors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : isDark 
                    ? "bg-gray-800 border-purple-700 text-white hover:border-purple-500" 
                    : "bg-white/80 border-gray-300 text-gray-900 hover:border-purple-400"
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
            {validationErrors.phone && (
              <p className="text-xs text-red-500 mt-1.5 flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span className="break-words">{validationErrors.phone}</span>
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-bold flex items-center gap-1.5">
              <Mail className="w-4 h-4" />
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email || ""}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setValidationErrors({ ...validationErrors, email: false });
              }}
              placeholder="hello@yourshop.com"
              className={`mt-1 w-full px-3 py-2 rounded-xl text-sm border-2 transition-colors ${
                validationErrors.email
                  ? "border-red-500 focus:ring-red-500"
                  : isDark 
                    ? "bg-gray-800 border-purple-700 text-white hover:border-purple-500" 
                    : "bg-white/80 border-gray-300 text-gray-900 hover:border-purple-400"
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
            {validationErrors.email && (
              <p className="text-xs text-red-500 mt-1.5 flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span className="break-words">{validationErrors.email}</span>
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="text-xs font-bold flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.address || ""}
              onChange={(e) => {
                setFormData({ ...formData, address: e.target.value });
                setValidationErrors({ ...validationErrors, address: false });
              }}
              rows={2}
              placeholder="Street, Area, City"
              className={`mt-1 w-full px-3 py-2 rounded-xl text-sm resize-none border-2 transition-colors ${
                validationErrors.address
                  ? "border-red-500 focus:ring-red-500"
                  : isDark 
                    ? "bg-gray-800 border-purple-700 text-white hover:border-purple-500" 
                    : "bg-white/80 border-gray-300 text-gray-900 hover:border-purple-400"
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
            {validationErrors.address && (
              <p className="text-xs text-red-500 mt-1.5 flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span className="break-words">{validationErrors.address}</span>
              </p>
            )}
          </div>

          {/* ✅ Social Links — No empty message, just "Add Social Link" button */}
          <div>
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              Social Links
            </label>
            <div className="mt-2 space-y-2">
              {formData.socialLinks.map((link, index) => (
                <div key={index} className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                  <input
                    type="text"
                    value={link.platform || ""}
                    onChange={(e) => updateSocialLink(index, "platform", e.target.value)}
                    placeholder="Platform"
                    className={`w-24 sm:w-32 px-3 py-2 rounded-xl text-sm border-2 ${isDark ? "bg-gray-800 border-purple-700 text-white" : "bg-white/80 border-gray-300 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                  <input
                    type="url"
                    value={link.url || ""}
                    onChange={(e) => updateSocialLink(index, "url", e.target.value)}
                    placeholder="https://..."
                    className={`flex-1 min-w-[120px] px-3 py-2 rounded-xl text-sm border-2 ${isDark ? "bg-gray-800 border-purple-700 text-white" : "bg-white/80 border-gray-300 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                  <button
                    onClick={() => removeSocialLink(index)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={addSocialLink}
                className="flex items-center gap-1 text-sm font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Social Link
              </button>
            </div>
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
            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">✨ Tips for contact page</p>
            <ul className="text-xs text-gray-600 dark:text-gray-400 mt-1 space-y-1">
              <li>• Make sure your phone number and email are up to date</li>
              <li>• Add social media links to connect with customers</li>
              <li>• Provide a clear address for physical stores</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}