// src/pages/sellerdashboard/storefront/About.jsx

import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { getAboutPage, saveAboutPage } from "../../../api/storefrontApi";
import {
  Save,
  CheckCircle,
  Loader2,
  AlertCircle,
  X,
  Globe,
  Image as ImageIcon,
  Type,
  AlignLeft,
  Eye,
  Upload,
  Trash2,
  Sparkles,
  ChevronDown,
  FileText,
  HelpCircle
} from "lucide-react";

const LANGUAGE_OPTIONS = [
  { value: "EN", label: "English (EN)" },
  { value: "UR", label: "Urdu (UR)" },
  { value: "AR", label: "Arabic (AR)" },
];

// ===== Reusable custom dropdown =====
function CustomDropdown({ label, icon: Icon, value, options, onChange, isDark }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <label className="text-xs font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mb-1">
        <Icon className="w-4 h-4" />
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${
          isDark
            ? "bg-gray-800 border-purple-700 text-white hover:border-purple-500"
            : "bg-white/80 border-gray-300 text-gray-900 hover:border-purple-400"
        } ${open ? "ring-2 ring-purple-500 border-purple-500" : ""}`}
      >
        <span>{selected?.label ?? "Select..."}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className={`absolute z-20 mt-1.5 w-full rounded-xl border-2 shadow-xl overflow-hidden ${
            isDark ? "bg-gray-800 border-purple-700" : "bg-white border-gray-200"
          }`}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 text-sm font-medium flex items-center justify-between transition-colors ${
                opt.value === value
                  ? "bg-purple-600 text-white"
                  : isDark
                  ? "text-gray-200 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {opt.label}
              {opt.value === value && <CheckCircle className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AboutStorefront() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const fileInputRef = useRef(null);

  // ===== State =====
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // ===== Validation Errors =====
  const [validationErrors, setValidationErrors] = useState({
    headline: false,
    story: false
  });

  // ===== Form State — EMPTY by default =====
  const [formData, setFormData] = useState({
    enabled: true,
    language: "EN",
    headline: "",
    story: "",
    heroImage: "",
    heroTextColor: "#4A1A6B"
  });

  // ===== Fetch Data =====
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAboutPage();
        if (response.success) {
          setFormData({
            enabled: response.data.enabled ?? true,
            language: response.data.language ?? "EN",
            headline: response.data.headline ?? "",
            story: response.data.story ?? "",
            heroImage: response.data.heroImage ?? "",
            heroTextColor: response.data.heroTextColor ?? "#4A1A6B"
          });
        } else {
          setError("Failed to load about page data");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // NOTE: We intentionally do NOT revoke the hero image blob URL on unmount
  // (e.g. when the seller navigates to another tab and comes back). Doing so
  // previously caused the saved hero image to appear broken after
  // navigating away and back, since getAboutPage() (mock API) re-returns the
  // same blob URL which had already been revoked. Instead, we only revoke a
  // blob URL at the exact moment it's replaced or removed (see
  // handleFileChange / handleRemoveImage below), which is when it's actually
  // safe to free it.

  // ===== Toast =====
  const showToast = (message, isError = false) => {
    setToastMessage({ text: message, isError });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ===== Save with Validation =====
  const handleSave = async () => {
    // ✅ Validate Headline
    const isHeadlineEmpty = !formData.headline.trim();
    const isStoryEmpty = !formData.story.trim();

    setValidationErrors({
      headline: isHeadlineEmpty,
      story: isStoryEmpty
    });

    if (isHeadlineEmpty || isStoryEmpty) {
      showToast("Please fill in all required fields (Headline and Story) ❌", true);
      return;
    }

    setIsSaving(true);
    try {
      await saveAboutPage(formData);
      setIsSaved(true);
      setValidationErrors({ headline: false, story: false });
      showToast("About page saved successfully! ✅");
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      showToast("Failed to save. Please try again. ❌", true);
    } finally {
      setIsSaving(false);
    }
  };

  // ===== Clear validation on input =====
  const handleHeadlineChange = (e) => {
    setFormData({ ...formData, headline: e.target.value });
    if (validationErrors.headline && e.target.value.trim()) {
      setValidationErrors(prev => ({ ...prev, headline: false }));
    }
  };

  const handleStoryChange = (e) => {
    setFormData({ ...formData, story: e.target.value });
    if (validationErrors.story && e.target.value.trim()) {
      setValidationErrors(prev => ({ ...prev, story: false }));
    }
  };

  // ===== Toggle Enable =====
  const toggleEnabled = () => {
    setFormData((prev) => ({ ...prev, enabled: !prev.enabled }));
  };

  // ===== Image Upload =====
  const handleChooseImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please select a valid image file. ❌", true);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast("Image must be under 5MB. ❌", true);
      return;
    }

    // Revoke the previous blob URL (if any) right before replacing it —
    // this is the only safe moment to free it, since the old preview is
    // about to be thrown away for good.
    if (formData.heroImage?.startsWith("blob:")) {
      URL.revokeObjectURL(formData.heroImage);
    }

    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, heroImage: previewUrl }));
    e.target.value = "";
  };

  const handleRemoveImage = () => {
    if (formData.heroImage?.startsWith("blob:")) {
      URL.revokeObjectURL(formData.heroImage);
    }
    setFormData((prev) => ({ ...prev, heroImage: "" }));
  };

  // ===== Color Preview =====
  const colorOptions = [
    "#4A1A6B", "#8B1A4A", "#C41E3A", "#D97706", "#0B5E42",
    "#1A365D", "#6D28D9", "#BE185D", "#B45309", "#047857"
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
        <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm">Loading about page...</p>
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
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">About Page</h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Customize the About page buyers see with a headline, story, and hero image.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-1.5 sm:gap-2 border-2 border-transparent ${isSaving ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isSaving ? (
              <>
                <Loader2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 animate-spin" />
                <span className="hidden xs:inline">Saving...</span>
              </>
            ) : isSaved ? (
              <>
                <CheckCircle className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                <span className="hidden xs:inline">Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                <span>Save About Page</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ===== Enable Toggle Box ===== */}
      <div className={`p-4 sm:p-5 rounded-xl border-2 transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 ${
        isDark 
          ? "bg-gray-800/50 border-purple-700" 
          : "bg-gray-50/80 border-purple-300"
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleEnabled}
              aria-pressed={formData.enabled}
              className={`relative shrink-0 w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                formData.enabled ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                  formData.enabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <div className="flex items-center gap-1.5">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Show About page on your store
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formData.enabled ? "Visible to customers" : "Hidden from customers"}
                </p>
              </div>
              <HelpCircle className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            </div>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${formData.enabled ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"}`}>
            {formData.enabled ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      {/* ===== Form Fields Box ===== */}
      <div className={`p-4 sm:p-5 rounded-xl border-2 transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 ${
        isDark 
          ? "bg-gray-800/50 border-purple-700" 
          : "bg-gray-50/80 border-purple-300"
      }`}>
        <div className="space-y-4 sm:space-y-5">

          {/* Language */}
          <CustomDropdown
            label="Store Language"
            icon={Globe}
            value={formData.language}
            options={LANGUAGE_OPTIONS}
            onChange={(val) => setFormData((prev) => ({ ...prev, language: val }))}
            isDark={isDark}
          />

          {/* Headline — with validation */}
          <div>
            <label className="text-xs font-bold flex items-center gap-1.5">
              <Type className="w-4 h-4" />
              Headline <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.headline}
              onChange={handleHeadlineChange}
              placeholder="e.g., Our Story, About Us"
              className={`mt-1 w-full px-3 py-2 rounded-xl text-sm border-2 transition-colors ${
                validationErrors.headline
                  ? "border-red-500 focus:ring-red-500"
                  : isDark 
                    ? "bg-gray-800 border-purple-700 text-white hover:border-purple-500" 
                    : "bg-white/80 border-gray-300 text-gray-900 hover:border-purple-400"
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
            {validationErrors.headline && (
              <p className="text-xs text-red-500 mt-1.5 flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span className="break-words">Headline is required</span>
              </p>
            )}
          </div>

          {/* Story — with validation */}
          <div>
            <label className="text-xs font-bold flex items-center gap-1.5">
              <AlignLeft className="w-4 h-4" />
              Story / Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.story}
              onChange={handleStoryChange}
              rows={5}
              placeholder="Tell your customers your story..."
              className={`mt-1 w-full px-3 py-2 rounded-xl text-sm resize-none border-2 transition-colors ${
                validationErrors.story
                  ? "border-red-500 focus:ring-red-500"
                  : isDark 
                    ? "bg-gray-800 border-purple-700 text-white hover:border-purple-500" 
                    : "bg-white/80 border-gray-300 text-gray-900 hover:border-purple-400"
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
            {validationErrors.story && (
              <p className="text-xs text-red-500 mt-1.5 flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span className="break-words">Story is required</span>
              </p>
            )}
          </div>

          {/* Hero Image */}
          <div>
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4" />
              Hero Image
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className={`mt-1 border-2 border-dashed rounded-xl p-4 sm:p-6 text-center transition-colors ${
              isDark 
                ? "border-purple-700 hover:border-purple-500" 
                : "border-gray-300 hover:border-purple-400"
            }`}>
              {formData.heroImage ? (
                <div className="relative">
                  <div className="h-32 sm:h-48 rounded-lg overflow-hidden">
                    <img
                      src={formData.heroImage}
                      alt="Hero preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleChooseImageClick}
                    className="absolute bottom-2 right-2 px-3 py-1.5 bg-black/60 text-white text-xs font-medium rounded-lg hover:bg-black/75 transition-colors flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Replace
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload hero image</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">PNG, JPG, WEBP (Max 5MB)</p>
                  <button
                    onClick={handleChooseImageClick}
                    className="mt-3 px-4 py-1.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Choose Image
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Hero Text Color */}
          <div>
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <Type className="w-4 h-4" />
              Hero Text Color
            </label>
            <div className="flex flex-wrap gap-2 mt-1">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  onClick={() => setFormData({ ...formData, heroTextColor: color })}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    formData.heroTextColor === color ? "border-purple-600 scale-110" : "border-transparent hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.heroTextColor}
                  onChange={(e) => setFormData({ ...formData, heroTextColor: e.target.value })}
                  className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                />
                <span className="text-xs text-gray-500 dark:text-gray-400">Custom</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Live Preview ===== */}
      <div className={`p-4 rounded-xl border-2 transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 ${
        isDark 
          ? "bg-gray-800/30 border-purple-700" 
          : "bg-gray-100/50 border-purple-300"
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <Eye className="w-4 h-4 text-purple-500" />
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Live Preview</p>
        </div>
        <div
          className="h-24 rounded-lg flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundColor: isDark ? "#1a1a2e" : "#f3e8ff",
            backgroundImage: formData.heroImage ? `url(${formData.heroImage})` : "none",
          }}
        >
          <p
            className="text-lg font-bold px-3"
            style={{ color: formData.heroTextColor }}
          >
            {formData.headline || "Your Headline Here"}
          </p>
        </div>
      </div>

      {/* ===== Tips Box ===== */}
      <div className={`p-4 rounded-xl border-2 transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 ${
        isDark 
          ? "border-purple-700 bg-purple-900/20" 
          : "border-purple-300 bg-purple-50/40"
      }`}>
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">✨ Tips for a great About page</p>
            <ul className="text-xs text-gray-600 dark:text-gray-400 mt-1 space-y-1">
              <li>• Share your brand story to connect with customers</li>
              <li>• Use high-quality hero images that represent your brand</li>
              <li>• Keep your story authentic and engaging</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}