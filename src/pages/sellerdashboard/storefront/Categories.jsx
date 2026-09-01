// src/pages/sellerdashboard/storefront/Categories.jsx

import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { getCategoriesPage, saveCategoriesPage } from "../../../api/storefrontApi";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  CheckCircle,
  Loader2,
  AlertCircle,
  X,
  Search,
  Globe,
  Image,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Package,
  Sparkles
} from "lucide-react";

// ===== LANGUAGE OPTIONS =====
const LANGUAGE_OPTIONS = [
  { value: "EN", label: "English (EN)" },
  { value: "UR", label: "Urdu (UR)" },
  { value: "AR", label: "Arabic (AR)" },
];

const FILTER_LANGUAGES = [
  { value: "All", label: "All Languages" },
  { value: "EN", label: "EN" },
  { value: "UR", label: "UR" },
  { value: "AR", label: "AR" },
];

// ===== Reusable Custom Dropdown (Same as About page) =====
function CustomDropdown({ label, icon: Icon, value, options, onChange, isDark, placeholder = "Select..." }) {
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
      {label && (
        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mb-1">
          {Icon && <Icon className="w-4 h-4" />}
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${
          isDark
            ? "bg-gray-800 border-purple-700 text-white hover:border-purple-500"
            : "bg-white/80 border-gray-300 text-gray-900 hover:border-purple-400"
        } ${open ? "ring-2 ring-purple-500 border-purple-500" : ""}`}
      >
        <span>{selected?.label ?? placeholder}</span>
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

export default function CategoriesStorefront() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // ===== State =====
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // ===== Filter State =====
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  // ===== Pagination =====
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // ===== Modal State =====
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    language: "EN"
  });
  
  // ===== Validation Errors =====
  const [nameError, setNameError] = useState(false);

  // ===== Fetch Categories =====
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getCategoriesPage();
        if (response.success) {
          setCategories(response.data);
        } else {
          setError("Failed to load categories");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ===== Toast =====
  const showToast = (message, isError = false) => {
    setToastMessage({ text: message, isError });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ===== Save =====
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveCategoriesPage(categories);
      setIsSaved(true);
      showToast("Categories saved successfully! ✅");
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      showToast("Failed to save. Please try again. ❌", true);
    } finally {
      setIsSaving(false);
    }
  };

  // ===== Open Modal =====
  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        image: category.image,
        language: category.language
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", image: "🎂", language: "EN" });
    }
    setNameError(false);
    setIsModalOpen(true);
  };

  // ===== Save Category =====
  const handleSaveCategory = () => {
    if (!formData.name.trim()) {
      setNameError(true);
      showToast("Please enter a category name ❌", true);
      return;
    }

    if (editingCategory) {
      setCategories(prev =>
        prev.map(c =>
          c.id === editingCategory.id
            ? { ...c, ...formData }
            : c
        )
      );
      showToast(`${formData.name} updated successfully! ✅`);
    } else {
      const newCategory = {
        id: Date.now(),
        ...formData,
        productCount: 0
      };
      setCategories(prev => [...prev, newCategory]);
      showToast(`${formData.name} added successfully! ✅`);
    }
    setIsModalOpen(false);
  };

  // ===== Delete Category =====
  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      setCategories(prev => prev.filter(c => c.id !== id));
      showToast(`${name} deleted successfully!`);
    }
  };

  // ===== Filter Categories =====
  const filteredCategories = categories.filter(cat => {
    const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = selectedLanguage === 'All' || cat.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

  // ===== Pagination =====
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 whenever the search term or language filter changes,
  // otherwise the seller can be left staring at an empty page (e.g. was on
  // page 2, filter now only has 1 page of results).
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedLanguage]);

  // If the currently selected page no longer exists — e.g. the seller
  // deleted the last category on the last page, or a delete/filter shrank
  // the result set — clamp back to the last valid page instead of getting
  // stuck on an empty page.
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(totalPages, 1));
    }
  }, [totalPages, currentPage]);

  // ===== Image Options =====
  const imageOptions = ['🎂', '🧁', '🍪', '🍫', '🍩', '🥐', '🍰', '🧇', '🥧', '🍮'];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
        <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm">Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-6 rounded-xl text-center border-2 ${isDark ? 'bg-red-900/30 border-red-800/40' : 'bg-red-50 border-red-200'}`}>
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
            <Package className="w-3.5 h-3.5" />
            Your Storefront
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">Categories</h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Group your products with categories. When enabled, buyers can filter by category.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenModal()}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs sm:text-sm font-bold rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all flex items-center gap-1.5 sm:gap-2"
          >
            <Plus className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            <span>Add Category</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-1.5 sm:gap-2 border-2 border-transparent ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSaving ? <><Loader2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 animate-spin" /> <span className="hidden xs:inline">Saving...</span></> : isSaved ? <><CheckCircle className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> <span className="hidden xs:inline">Saved!</span></> : <><Save className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> <span>Save</span></>}
          </button>
        </div>
      </div>

      {/* Filters — Custom Dropdown for Language */}
      <div className="flex flex-col xs:flex-row flex-wrap gap-2 sm:gap-3">
        <div className="relative flex-1 min-w-[140px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`
              w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border-2
              ${isDark ? 'bg-gray-800/50 border-purple-500/60 text-white placeholder-gray-400 hover:border-purple-500' : 'bg-white border-purple-300 text-gray-900 placeholder-gray-400 hover:border-purple-500'}
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
              transition-colors duration-200
            `}
          />
        </div>

        {/* ✅ Custom Dropdown for Language Filter */}
        <div className="min-w-[140px]">
          <CustomDropdown
            icon={Filter}
            value={selectedLanguage}
            options={FILTER_LANGUAGES}
            onChange={(val) => setSelectedLanguage(val)}
            isDark={isDark}
            placeholder="All Languages"
          />
        </div>
      </div>

      {/* Categories Grid */}
      {filteredCategories.length === 0 ? (
        <div className={`py-8 sm:py-12 text-center rounded-xl border-2 ${isDark ? 'bg-gray-800/50 border-purple-500/60' : 'bg-white border-purple-200'}`}>
          <Package className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">No Categories Yet</h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">Create categories to organize your products.</p>
          <button onClick={() => handleOpenModal()} className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-1.5 sm:gap-2 mx-auto">
            <Plus className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            Add Category
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
            {paginatedCategories.map((category) => (
              <div
                key={category.id}
                className={`
                  rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl
                  ${isDark ? 'bg-gray-800/50 border-2 border-purple-600/50 hover:border-purple-500 hover:bg-purple-500/5' : 'bg-white border-2 border-purple-200 hover:border-purple-500 hover:bg-purple-50/50'}
                `}
              >
                <div className="p-3 sm:p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl sm:text-4xl">{category.image}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                          {category.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                            {category.productCount || 0} products
                          </span>
                          <span className="px-1.5 py-0.5 text-[9px] sm:text-xs font-medium bg-gray-100 dark:bg-gray-700 rounded-full flex items-center gap-0.5">
                            <Globe className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                            {category.language}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenModal(category)}
                        className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id, category.name)}
                        className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col xs:flex-row items-center justify-between gap-3 mt-3 sm:mt-4">
              <p className="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400 text-center xs:text-left">
                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> -{' '}
                <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredCategories.length)}</span> of{' '}
                <span className="font-medium">{filteredCategories.length}</span> categories
              </p>
              <div className="flex items-center gap-0.5 sm:gap-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`p-1.5 sm:p-2 rounded-lg transition-all ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-800'} ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  <ChevronLeft className="w-4 sm:w-4.5 h-4 sm:h-4.5" />
                </button>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-6 sm:w-8 h-6 sm:h-8 rounded-lg text-[10px] sm:text-sm font-medium transition-all ${currentPage === index + 1 ? 'bg-purple-600 text-white' : isDark ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`p-1.5 sm:p-2 rounded-lg transition-all ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-800'} ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  <ChevronRight className="w-4 sm:w-4.5 h-4 sm:h-4.5" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* ===== Add/Edit Modal — With Custom Dropdown ===== */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <div className={`w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl p-4 sm:p-6 border-2 ${isDark ? 'bg-gray-900 border-purple-500/60' : 'bg-white border-purple-300'} shadow-2xl`}>
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Category Name */}
              <div>
                <label className="text-xs font-bold flex items-center gap-1.5">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    setNameError(false);
                  }}
                  placeholder="e.g., Cakes, Cookies"
                  className={`mt-1 w-full px-3 py-2 rounded-xl text-sm border-2 transition-colors ${
                    nameError
                      ? "border-red-500 focus:ring-red-500"
                      : isDark 
                        ? "bg-gray-800 border-purple-500/60 text-white hover:border-purple-500" 
                        : "bg-gray-50 border-purple-300 text-gray-900 hover:border-purple-500"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                />
                {nameError && (
                  <p className="text-xs text-red-500 mt-1">Category name is required</p>
                )}
              </div>

              {/* Category Image (Emoji) */}
              <div>
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                  <Image className="w-4 h-4" />
                  Category Image (Emoji)
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {imageOptions.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setFormData({ ...formData, image: emoji })}
                      className={`text-2xl p-2 rounded-lg border-2 transition-all ${
                        formData.image === emoji ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* ✅ Language — Custom Dropdown */}
              <CustomDropdown
                label="Language"
                icon={Globe}
                value={formData.language}
                options={LANGUAGE_OPTIONS}
                onChange={(val) => setFormData({ ...formData, language: val })}
                isDark={isDark}
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                Cancel
              </button>
              <button onClick={handleSaveCategory} className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all flex items-center gap-2">
                <Save className="w-4 h-4" />
                {editingCategory ? 'Update' : 'Add'} Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className={`p-4 rounded-xl border-2 transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 ${
        isDark 
          ? "border-purple-700/50 bg-purple-900/20" 
          : "border-purple-300 bg-purple-50/40"
      }`}>
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">✨ Tips for organizing categories</p>
            <ul className="text-xs text-gray-600 dark:text-gray-400 mt-1 space-y-1">
              <li>• Create clear categories that make it easy for customers to find products</li>
              <li>• Use language indicators to manage multi-language stores</li>
              <li>• Assign each product to the most relevant category</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}