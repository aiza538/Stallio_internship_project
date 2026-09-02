// src/pages/sellerdashboard/storefront/Coupons.jsx

import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { getCouponsPage, saveCouponsPage } from "../../../api/storefrontApi";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  CheckCircle,
  Loader2,
  AlertCircle,
  X,
  Ticket,
  Percent,
  DollarSign,
  Calendar,
  Sparkles,
  FileText
} from "lucide-react";

export default function CouponsStorefront() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    type: "percentage",
    expires: ""
  });
  const [validationErrors, setValidationErrors] = useState({});
  const dateInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getCouponsPage();
        if (response.success) {
          setCoupons(response.data);
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

  // Fix: block the page-level Save when there are no coupons to save yet,
  // instead of silently calling the API with an empty list.
  const handleSave = async () => {
    if (coupons.length === 0) {
      showToast("Please add at least one coupon before saving ❌", true);
      return;
    }

    setIsSaving(true);
    try {
      await saveCouponsPage(coupons);
      setIsSaved(true);
      showToast("Coupons saved successfully! ✅");
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      showToast("Failed to save. Please try again. ❌", true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenModal = (coupon = null) => {
    if (coupon) {
      setEditingCoupon(coupon);
      setFormData({
        code: coupon.code,
        discount: coupon.discount,
        type: coupon.type,
        expires: coupon.expires || ""
      });
    } else {
      setEditingCoupon(null);
      setFormData({ code: "", discount: "", type: "percentage", expires: "" });
    }
    setValidationErrors({});
    setIsModalOpen(true);
  };

  const handleSaveCoupon = () => {
    const errors = {};
    if (!formData.code.trim()) errors.code = "Coupon code is required";
    if (!formData.discount) errors.discount = "Discount is required";
    if (formData.discount && (isNaN(formData.discount) || Number(formData.discount) <= 0)) {
      errors.discount = "Discount must be a positive number";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      showToast("Please fill in all required fields ❌", true);
      return;
    }

    const couponData = {
      id: editingCoupon?.id || Date.now(),
      code: formData.code.toUpperCase().trim(),
      discount: Number(formData.discount),
      type: formData.type,
      expires: formData.expires || null
    };

    if (editingCoupon) {
      setCoupons(prev => prev.map(c => c.id === editingCoupon.id ? couponData : c));
      showToast(`${couponData.code} updated successfully! ✅`);
    } else {
      setCoupons(prev => [...prev, couponData]);
      showToast(`${couponData.code} added successfully! ✅`);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id, code) => {
    if (window.confirm(`Are you sure you want to delete "${code}"?`)) {
      setCoupons(prev => prev.filter(c => c.id !== id));
      showToast(`${code} deleted successfully!`);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
        <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm">Loading coupons...</p>
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
        <div className={`fixed top-4 left-4 right-4 sm:left-auto sm:right-4 z-50 px-4 py-3 rounded-xl shadow-lg border-2 max-w-sm mx-auto sm:mx-0 flex items-center gap-2 ${
          toastMessage.isError 
            ? isDark ? "bg-red-900/80 border-red-600 text-white" : "bg-red-50 border-red-400 text-red-700"
            : isDark ? "bg-gray-800 border-purple-700" : "bg-white border-gray-200"
        }`}>
          {toastMessage.isError ? (
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          ) : (
            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          )}
          <span className="text-sm font-medium flex-1">{toastMessage.text}</span>
          <button onClick={() => setToastMessage(null)} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
            <X className="w-4 h-4" />
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
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">Coupon Codes</h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Create codes like SAVE10 with percent or fixed discount and optional expiry.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenModal()}
            className="px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-1.5 sm:gap-2 border-2 border-transparent"
          >
            <Plus className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            <span>Add Coupon</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-1.5 sm:gap-2 border-2 border-transparent ${isSaving ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isSaving ? <><Loader2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 animate-spin" /> <span className="hidden xs:inline">Saving...</span></> : isSaved ? <><CheckCircle className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> <span className="hidden xs:inline">Saved!</span></> : <><Save className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> <span>Save</span></>}
          </button>
        </div>
      </div>

      {/* Coupons Grid */}
      {coupons.length === 0 ? (
        <div className={`py-12 text-center rounded-xl border-2 ${isDark ? "bg-gray-800/50 border-purple-500/60" : "bg-white border-purple-200"}`}>
          <Ticket className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">No Coupons Yet</h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Create one for your customers to use at checkout.
          </p>
          <button onClick={() => handleOpenModal()} className="mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-1.5 sm:gap-2 mx-auto">
            <Plus className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            Add Coupon
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-xl ${
                isDark ? "bg-gray-800/50 border-purple-600/50 hover:border-purple-500" : "bg-white border-purple-200 hover:border-purple-500 hover:bg-purple-50/50"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-purple-500" />
                    <span className="font-bold text-gray-900 dark:text-white text-lg">{coupon.code}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {coupon.type === "percentage" ? (
                        <span className="flex items-center gap-0.5"><Percent className="w-3.5 h-3.5" /> {coupon.discount}%</span>
                      ) : (
                        <span className="flex items-center gap-0.5"><DollarSign className="w-3.5 h-3.5" /> PKR {coupon.discount}</span>
                      )}
                    </span>
                    {coupon.expires && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-0.5">
                        <Calendar className="w-3.5 h-3.5" /> Expires: {coupon.expires}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenModal(coupon)}
                    className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(coupon.id, coupon.code)}
                    className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tips */}
      <div className={`p-4 rounded-xl border-2 transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 ${
        isDark ? "border-purple-700/50 bg-purple-900/20" : "border-purple-300 bg-purple-50/40"
      }`}>
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">✨ Tips for coupons</p>
            <ul className="text-xs text-gray-600 dark:text-gray-400 mt-1 space-y-1">
              <li>• Use clear and memorable coupon codes like SAVE10 or WELCOME</li>
              <li>• Set expiry dates to create urgency</li>
              <li>• Use percentage discounts for lower-priced items</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===== Add/Edit Modal ===== */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <div className={`w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl p-4 sm:p-6 border-2 ${isDark ? "bg-gray-900 border-purple-500/60" : "bg-white border-purple-300"} shadow-2xl`}>
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                {editingCoupon ? "Edit Coupon" : "Add Coupon"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Coupon Code */}
              <div>
                <label className="text-xs font-bold flex items-center gap-1.5">
                  Coupon Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => {
                    setFormData({ ...formData, code: e.target.value.toUpperCase() });
                    setValidationErrors({ ...validationErrors, code: false });
                  }}
                  placeholder="e.g., SAVE10"
                  className={`mt-1 w-full px-3 py-2 rounded-xl text-sm border-2 transition-colors ${
                    validationErrors.code
                      ? "border-red-500 focus:ring-red-500"
                      : isDark 
                        ? "bg-gray-800 border-purple-500/60 text-white hover:border-purple-500" 
                        : "bg-gray-50 border-purple-300 text-gray-900 hover:border-purple-500"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                {validationErrors.code && (
                  <p className="text-xs text-red-500 mt-1">Coupon code is required</p>
                )}
              </div>

              {/* Discount & Type */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold flex items-center gap-1.5">
                    Discount <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.discount}
                    onChange={(e) => {
                      setFormData({ ...formData, discount: e.target.value });
                      setValidationErrors({ ...validationErrors, discount: false });
                    }}
                    placeholder="10"
                    className={`mt-1 w-full px-3 py-2 rounded-xl text-sm border-2 transition-colors ${
                      validationErrors.discount
                        ? "border-red-500 focus:ring-red-500"
                        : isDark 
                          ? "bg-gray-800 border-purple-500/60 text-white hover:border-purple-500" 
                          : "bg-gray-50 border-purple-300 text-gray-900 hover:border-purple-500"
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                  {validationErrors.discount && (
                    <p className="text-xs text-red-500 mt-1">{validationErrors.discount}</p>
                  )}
                </div>
                <div>
                  <label className="text-xs font-bold flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className={`mt-1 w-full px-3 py-2 rounded-xl text-sm border-2 ${
                      isDark ? "bg-gray-800 border-purple-500/60 text-white" : "bg-gray-50 border-purple-300 text-gray-900"
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed (PKR)</option>
                  </select>
                </div>
              </div>

              {/* Expiry */}
              <div>
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Expiry Date (Optional)
                </label>
                <div className="relative mt-1">
                  <input
                    ref={dateInputRef}
                    type="date"
                    value={formData.expires || ""}
                    onChange={(e) => setFormData({ ...formData, expires: e.target.value })}
                    className={`w-full pl-3 pr-10 py-2 rounded-xl text-sm border-2 [color-scheme:light] dark:[color-scheme:dark] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-10 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer ${
                      isDark ? "bg-gray-800 border-purple-500/60 text-white" : "bg-gray-50 border-purple-300 text-gray-900"
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                  {/* Custom calendar icon: the native icon is made invisible but
                      still clickable (see [&::-webkit-calendar-picker-indicator]
                      rules above) so this icon and the real hit target line up.
                      We also call showPicker() directly as a reliable fallback
                      for browsers where clicking the native indicator alone
                      doesn't open the picker. */}
                  <button
                    type="button"
                    onClick={() => dateInputRef.current?.showPicker?.()}
                    className="absolute right-0 top-0 h-full w-10 flex items-center justify-center text-gray-400 hover:text-purple-500 transition-colors"
                    tabIndex={-1}
                  >
                    <Calendar className="w-4 h-4 pointer-events-none" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                Cancel
              </button>
              <button onClick={handleSaveCoupon} className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all flex items-center gap-2">
                <Save className="w-4 h-4" />
                {editingCoupon ? "Update" : "Add"} Coupon
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}