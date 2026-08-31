// src/pages/sellerdashboard/storefront/Home.jsx

import { useState, useEffect } from "react";
import { useTheme } from "../../../context/ThemeContext";
import {
  Image,
  Shield,
  Star,
  Save,
  CheckCircle,
  Edit,
  Eye,
  Sparkles,
  ArrowRight,
  Loader2,
  AlertCircle,
  Clock,
  X,
  Plus,
  Trash2,
  Info,
  Truck,
  Headphones,
  Award,
  Heart,
  Zap,
  Gift,
} from "lucide-react";

// ===== Icon library =====
const BADGE_ICONS = {
  shield: { icon: Shield, label: "Shield" },
  truck: { icon: Truck, label: "Delivery" },
  headphones: { icon: Headphones, label: "Support" },
  award: { icon: Award, label: "Award" },
  heart: { icon: Heart, label: "Care" },
  zap: { icon: Zap, label: "Speed" },
  gift: { icon: Gift, label: "Gift" },
  sparkles: { icon: Sparkles, label: "Sparkle" },
};
const DEFAULT_BADGE_ICON = "sparkles";

const getBadgeIcon = (key) => BADGE_ICONS[key]?.icon || BADGE_ICONS[DEFAULT_BADGE_ICON].icon;

// ===== Mock API =====
const getMockHomeData = () => ({
  success: true,
  data: {
    hero: {
      title: "Welcome to Sweet Cravings Studio",
      subtitle: "Discover our delicious collection",
      ctaText: "Shop Now",
      active: true
    },
    trustBadges: {
      items: [
        { id: 1, icon: "shield", label: "Secure Payments", active: true },
        { id: 2, icon: "truck", label: "Fast Delivery", active: true },
        { id: 3, icon: "headphones", label: "24/7 Support", active: true },
        { id: 4, icon: "award", label: "Quality Guarantee", active: true }
      ],
      active: true
    },
    reviews: {
      items: [
        { id: 1, name: "Sarah Ahmed", rating: 5, comment: "Amazing products!", active: true },
        { id: 2, name: "Muhammad Ali", rating: 5, comment: "Excellent service!", active: true },
        { id: 3, name: "Fatima Khan", rating: 4, comment: "Great quality!", active: true }
      ],
      active: true,
      total: 128
    },
    status: "published",
    lastUpdated: "2 hours ago"
  }
});

const saveHomePageData = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Home page saved successfully!' });
    }, 1500);
  });
};

// ===== Toggle Switch =====
function ToggleSwitch({ checked, onChange, size = "md" }) {
  const dims = size === "sm" ? "w-9 h-5" : "w-11 h-6";
  const knob = size === "sm" ? "w-3.5 h-3.5" : "w-4.5 h-4.5";
  const translate = size === "sm" ? "translate-x-4" : "translate-x-5";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      className={`relative inline-flex ${dims} items-center rounded-full transition-colors duration-300 flex-shrink-0 cursor-pointer ${
        checked ? "bg-gradient-to-r from-purple-600 to-indigo-600" : "bg-gray-400 dark:bg-gray-600"
      }`}
    >
      <span
        className={`inline-block ${knob} transform rounded-full bg-white shadow-md transition-transform duration-300 ${
          checked ? translate : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

// ===== Icon Badge =====
function IconBadge({ Icon, color = "purple", size = "md" }) {
  const boxSize = size === "sm" ? "w-8 h-8" : "w-11 h-11";
  const iconSize = size === "sm" ? "w-4 h-4" : "w-5.5 h-5.5";
  
  const colorMap = {
    purple: "bg-purple-200 dark:bg-purple-800/60 text-purple-700 dark:text-purple-300",
    blue: "bg-blue-200 dark:bg-blue-800/60 text-blue-700 dark:text-blue-300",
    amber: "bg-amber-200 dark:bg-amber-800/60 text-amber-700 dark:text-amber-300",
    emerald: "bg-emerald-200 dark:bg-emerald-800/60 text-emerald-700 dark:text-emerald-300",
  };
  
  return (
    <div className={`${boxSize} rounded-xl flex items-center justify-center flex-shrink-0 ${colorMap[color]}`}>
      <Icon className={iconSize} />
    </div>
  );
}

// ===== Star Rating =====
function StarRating({ rating, size = "w-3.5 h-3.5" }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`${size} ${n <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-gray-600"}`}
        />
      ))}
    </div>
  );
}

// ===== Stats Card =====
function StatsCard({ label, value, icon: Icon, color }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const colorMap = {
    purple: {
      border: "border-purple-300 dark:border-purple-700",
      hover: "hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 hover:bg-purple-50/50 dark:hover:bg-purple-900/20",
      glow: "group-hover:bg-purple-500/10"
    },
    blue: {
      border: "border-blue-300 dark:border-blue-700",
      hover: "hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30 hover:bg-blue-50/50 dark:hover:bg-blue-900/20",
      glow: "group-hover:bg-blue-500/10"
    },
    amber: {
      border: "border-amber-300 dark:border-amber-700",
      hover: "hover:border-amber-500 dark:hover:border-amber-400 hover:shadow-amber-200/50 dark:hover:shadow-amber-900/30 hover:bg-amber-50/50 dark:hover:bg-amber-900/20",
      glow: "group-hover:bg-amber-500/10"
    },
    emerald: {
      border: "border-emerald-300 dark:border-emerald-700",
      hover: "hover:border-emerald-500 dark:hover:border-emerald-400 hover:shadow-emerald-200/50 dark:hover:shadow-emerald-900/30 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20",
      glow: "group-hover:bg-emerald-500/10"
    },
  };
  
  const colors = colorMap[color];
  
  return (
    <div
      className={`
        group relative overflow-hidden rounded-xl p-4 border-2 ${colors.border} ${colors.hover}
        ${isDark ? 'bg-gray-800/90' : 'bg-white'}
        transition-all duration-300 cursor-pointer
      `}
    >
      <div className={`absolute inset-0 opacity-0 ${colors.glow} transition-opacity duration-300`} />
      <div className="relative z-10 flex items-center gap-3">
        <IconBadge Icon={Icon} color={color} size="sm" />
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</p>
          <p className="text-sm font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

// ===== Section Card =====
function SectionCard({ section, toggleSectionActive, handleEdit, handlePreview, isDark }) {
  const Icon = section.icon;
  const active = section.active;
  
  const colorMap = {
    purple: {
      border: "border-purple-300 dark:border-purple-700",
      hover: "hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 hover:bg-purple-50/50 dark:hover:bg-purple-900/20",
      glow: "group-hover:bg-purple-500/10"
    },
    blue: {
      border: "border-blue-300 dark:border-blue-700",
      hover: "hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30 hover:bg-blue-50/50 dark:hover:bg-blue-900/20",
      glow: "group-hover:bg-blue-500/10"
    },
    amber: {
      border: "border-amber-300 dark:border-amber-700",
      hover: "hover:border-amber-500 dark:hover:border-amber-400 hover:shadow-amber-200/50 dark:hover:shadow-amber-900/30 hover:bg-amber-50/50 dark:hover:bg-amber-900/20",
      glow: "group-hover:bg-amber-500/10"
    },
  };
  
  const colors = colorMap[section.iconColor];
  
  return (
    <div
      className={`
        group relative overflow-hidden rounded-xl p-5 border-2 ${colors.border} ${colors.hover}
        ${isDark ? 'bg-gray-800/90' : 'bg-white'}
        transition-all duration-300 cursor-pointer
      `}
    >
      <div className={`absolute inset-0 opacity-0 ${colors.glow} transition-opacity duration-300`} />
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <IconBadge Icon={Icon} color={section.iconColor} />
          <div className="flex items-center gap-2">
            <span className={`
              px-2.5 py-0.5 text-xs font-bold rounded-full border-2
              ${active 
                ? 'bg-emerald-100 dark:bg-emerald-900/50 border-emerald-300 dark:border-emerald-600 text-emerald-700 dark:text-emerald-300' 
                : 'bg-amber-100 dark:bg-amber-900/50 border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-300'}
            `}>
              {active ? 'Active' : 'Draft'}
            </span>
            <ToggleSwitch checked={active} onChange={(next) => toggleSectionActive(section.id, next)} size="sm" />
          </div>
        </div>

        <h3 className="font-bold text-gray-900 dark:text-white text-base mt-3">{section.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{section.description}</p>

        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={() => handleEdit(section.id)}
            className="text-sm font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          >
            <Edit className="w-3.5 h-3.5" /> Edit
          </button>
          <button
            onClick={() => handlePreview(section.id)}
            className="text-sm font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> Preview
          </button>
        </div>
      </div>
      <div className="absolute bottom-3 right-3 opacity-10 group-hover:opacity-30 transition-opacity">
        <Icon className="w-8 h-8 text-gray-500 dark:text-gray-400" />
      </div>
    </div>
  );
}

// ===== Main Component =====
export default function HomeStorefront() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [homeData, setHomeData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = getMockHomeData();
        setHomeData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveHomePageData(homeData);
      setIsSaved(true);
      showToast('Home page saved successfully! ✅');
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      showToast('Failed to save. Please try again. ❌');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleSectionActive = (sectionId, nextValue) => {
    setHomeData((prev) => {
      if (!prev) return prev;
      const keyMap = { hero: 'hero', trust: 'trustBadges', reviews: 'reviews' };
      const key = keyMap[sectionId];
      return { ...prev, [key]: { ...prev[key], active: nextValue } };
    });
    const nameMap = { hero: 'Hero Section', trust: 'Trust Badges', reviews: 'Customer Reviews' };
    showToast(`${nameMap[sectionId]} ${nextValue ? 'enabled' : 'disabled'}`);
  };

  const handleEdit = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      setDraft({ ...homeData.hero });
    } else if (sectionId === 'trust') {
      setDraft({ ...homeData.trustBadges, items: homeData.trustBadges.items.map(i => ({ ...i })) });
    } else if (sectionId === 'reviews') {
      setDraft({ ...homeData.reviews, items: homeData.reviews.items.map(i => ({ ...i })) });
    }
    setIsEditModalOpen(true);
  };

  const handlePreview = (sectionId) => {
    setActiveSection(sectionId);
    setIsPreviewModalOpen(true);
  };

  const handleViewStore = () => {
    showToast('Store preview will be available once connected to the live store.');
  };

  const handleApplyEdit = () => {
    if (!activeSection || !draft) return;
    setHomeData((prev) => {
      const keyMap = { hero: 'hero', trust: 'trustBadges', reviews: 'reviews' };
      const key = keyMap[activeSection];
      return { ...prev, [key]: draft };
    });
    setIsEditModalOpen(false);
    showToast('Changes applied. Click "Save Changes" to publish.');
  };

  const updateDraftField = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const updateDraftItem = (index, field, value) => {
    setDraft((prev) => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, items };
    });
  };

  const addDraftItem = () => {
    setDraft((prev) => {
      const items = [...prev.items];
      if (activeSection === 'trust') {
        items.push({ id: Date.now(), icon: DEFAULT_BADGE_ICON, label: "New Badge", active: true });
      } else if (activeSection === 'reviews') {
        items.push({ id: Date.now(), name: "New Customer", rating: 5, comment: "", active: true });
      }
      return { ...prev, items };
    });
  };

  const removeDraftItem = (index) => {
    setDraft((prev) => {
      const items = prev.items.filter((_, i) => i !== index);
      return { ...prev, items };
    });
  };

  const getSectionData = (id) => {
    const sectionMap = {
      hero: { title: "Hero Section", data: homeData?.hero },
      trust: { title: "Trust Badges", data: homeData?.trustBadges },
      reviews: { title: "Customer Reviews", data: homeData?.reviews }
    };
    return sectionMap[id];
  };

  const stats = [
    { label: "Hero Banner", value: homeData?.hero?.active ? "Active" : "Inactive", icon: Image, color: "purple" },
    { label: "Trust Badges", value: `${homeData?.trustBadges?.items?.length || 0} Active`, icon: Shield, color: "blue" },
    { label: "Customer Reviews", value: `${homeData?.reviews?.total || 0} Total`, icon: Star, color: "amber" },
    { label: "Store Status", value: homeData?.status === 'published' ? "Published" : "Draft", icon: Eye, color: "emerald" },
  ];

  const sections = [
    {
      id: "hero",
      icon: Image,
      title: "Hero Section",
      description: "Manage hero banner and headline",
      active: !!homeData?.hero?.active,
      color: "from-purple-500 to-indigo-500",
      iconColor: "purple",
    },
    {
      id: "trust",
      icon: Shield,
      title: "Trust Badges",
      description: "Manage trust badges and reviews",
      active: !!homeData?.trustBadges?.active,
      color: "from-blue-500 to-cyan-500",
      iconColor: "blue",
    },
    {
      id: "reviews",
      icon: Star,
      title: "Customer Reviews",
      description: "Manage customer testimonials",
      active: !!homeData?.reviews?.active,
      color: "from-amber-500 to-orange-500",
      iconColor: "amber",
    }
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
        <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm">Loading home page data...</p>
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
    <div className="space-y-6">

      {/* Toast */}
      {toastMessage && (
        <div className={`fixed top-4 left-4 right-4 sm:left-auto sm:right-4 z-50 px-4 py-3 rounded-xl shadow-lg border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} flex items-center gap-2 max-w-sm mx-auto sm:mx-0`}>
          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200 flex-1">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Home</h1>
            <span className={`px-2 py-0.5 text-[10px] sm:text-xs font-bold rounded-full border-2 ${homeData?.status === 'published' ? 'bg-emerald-100 dark:bg-emerald-900/40 border-emerald-300 dark:border-emerald-600 text-emerald-700 dark:text-emerald-300' : 'bg-amber-100 dark:bg-amber-900/40 border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-300'}`}>
              ● {homeData?.status === 'published' ? 'Live' : 'Draft'}
            </span>
            <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Updated {homeData?.lastUpdated}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Hero, trust badges, and customer reviews on your shop home.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={handleViewStore}
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1.5 sm:gap-2"
          >
            <Eye className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            <span className="hidden xs:inline">Preview Store</span>
            <span className="xs:hidden">Preview</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-1.5 sm:gap-2 border-2 border-transparent ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSaving ? <><Loader2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 animate-spin" /> <span className="hidden xs:inline">Saving...</span></> : isSaved ? <><CheckCircle className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> <span className="hidden xs:inline">Saved!</span></> : <><Save className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> <span className="hidden xs:inline">Save Changes</span><span className="xs:hidden">Save</span></>}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="lg:col-span-3 grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {sections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              toggleSectionActive={toggleSectionActive}
              handleEdit={handleEdit}
              handlePreview={handlePreview}
              isDark={isDark}
            />
          ))}
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <div className={`rounded-xl p-5 border-2 ${isDark ? 'bg-gray-800/90 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Eye className="w-4.5 h-4.5 text-purple-500" />
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">Store Preview</h3>
              </div>
            </div>
            <div className="space-y-3">
              {sections.map((section) => {
                const colorMap = {
                  purple: "border-purple-300 dark:border-purple-700",
                  blue: "border-blue-300 dark:border-blue-700",
                  amber: "border-amber-300 dark:border-amber-700",
                };
                return (
                  <div key={section.id} className={`p-3 rounded-xl flex items-center justify-between border-2 ${colorMap[section.iconColor]} ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-2">
                      <IconBadge Icon={section.icon} color={section.iconColor} size="sm" />
                      <div>
                        <p className="text-xs font-bold text-gray-700 dark:text-gray-300">{section.title.replace(' Section', '')}</p>
                        <p className={`text-xs font-semibold ${section.active ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                          {section.active ? 'Active' : 'Draft'}
                        </p>
                      </div>
                    </div>
                    <ToggleSwitch checked={section.active} onChange={(next) => toggleSectionActive(section.id, next)} size="sm" />
                  </div>
                );
              })}
            </div>
            <button
              onClick={handleViewStore}
              className="w-full mt-4 py-2.5 text-sm font-bold text-purple-600 dark:text-purple-400 border-2 border-purple-200 dark:border-purple-700 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors flex items-center justify-center gap-1"
            >
              View Full Store <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className={`p-3 sm:p-4 rounded-xl border-2 ${isDark ? 'border-purple-700/50 bg-purple-900/20' : 'border-purple-200 bg-purple-50/60'}`}>
        <div className="flex items-start gap-2 sm:gap-3">
          <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-purple-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200">✨ Tips for a great storefront</p>
            <ul className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mt-1 space-y-0.5 sm:space-y-1">
              <li>• Use high-quality hero images to make a strong first impression</li>
              <li>• Add trust badges to build customer confidence</li>
              <li>• Encourage customers to leave reviews for social proof</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && draft && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <div className={`w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl p-4 sm:p-6 border-2 ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} shadow-2xl`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Edit {getSectionData(activeSection)?.title}</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {activeSection === 'hero' && (
                <>
                  <div>
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Title</label>
                    <input type="text" value={draft.title} onChange={(e) => updateDraftField('title', e.target.value)} className={`mt-1 w-full px-3 py-2 rounded-xl text-sm border-2 ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-500`} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Subtitle</label>
                    <input type="text" value={draft.subtitle} onChange={(e) => updateDraftField('subtitle', e.target.value)} className={`mt-1 w-full px-3 py-2 rounded-xl text-sm border-2 ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-500`} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Button Text</label>
                    <input type="text" value={draft.ctaText} onChange={(e) => updateDraftField('ctaText', e.target.value)} className={`mt-1 w-full px-3 py-2 rounded-xl text-sm border-2 ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-500`} />
                  </div>
                </>
              )}
              {activeSection === 'trust' && (
                <>
                  <div className="space-y-2">
                    {draft.items.map((item, idx) => {
                      const BadgeIcon = getBadgeIcon(item.icon);
                      return (
                        <div key={item.id} className={`flex items-center gap-2 p-2 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                          <IconBadge Icon={BadgeIcon} color="blue" size="sm" />
                          <select value={item.icon} onChange={(e) => updateDraftItem(idx, 'icon', e.target.value)} className={`w-28 sm:w-32 px-2 py-2 rounded-xl text-sm border-2 ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-500`}>
                            {Object.entries(BADGE_ICONS).map(([key, { label }]) => (<option key={key} value={key}>{label}</option>))}
                          </select>
                          <input type="text" value={item.label} onChange={(e) => updateDraftItem(idx, 'label', e.target.value)} className={`flex-1 px-3 py-2 rounded-xl text-sm border-2 ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-500`} />
                          <button onClick={() => removeDraftItem(idx)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <button onClick={addDraftItem} className="flex items-center gap-1 text-sm font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                    <Plus className="w-4 h-4" /> Add Badge
                  </button>
                </>
              )}
              {activeSection === 'reviews' && (
                <>
                  <div className="space-y-2">
                    {draft.items.map((item, idx) => (
                      <div key={item.id} className={`p-3 rounded-xl space-y-2 border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-center gap-2">
                          <input type="text" value={item.name} onChange={(e) => updateDraftItem(idx, 'name', e.target.value)} placeholder="Customer name" className={`flex-1 px-3 py-2 rounded-xl text-sm border-2 ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-500`} />
                          <select value={item.rating} onChange={(e) => updateDraftItem(idx, 'rating', Number(e.target.value))} className={`px-2 py-2 rounded-xl text-sm border-2 ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-500`}>
                            {[5, 4, 3, 2, 1].map((n) => (<option key={n} value={n}>{n} star{n > 1 ? 's' : ''}</option>))}
                          </select>
                          <button onClick={() => removeDraftItem(idx)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <textarea value={item.comment} onChange={(e) => updateDraftItem(idx, 'comment', e.target.value)} placeholder="Review comment" rows={2} className={`w-full px-3 py-2 rounded-xl text-sm resize-none border-2 ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-500`} />
                      </div>
                    ))}
                  </div>
                  <button onClick={addDraftItem} className="flex items-center gap-1 text-sm font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                    <Plus className="w-4 h-4" /> Add Review
                  </button>
                </>
              )}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                Cancel
              </button>
              <button onClick={handleApplyEdit} className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all">
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <div className={`w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl p-4 sm:p-6 border-2 ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} shadow-2xl`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Preview: {getSectionData(activeSection)?.title}</h3>
              <button onClick={() => setIsPreviewModalOpen(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            {activeSection === 'hero' && homeData?.hero && (
              <div className={`p-4 sm:p-6 rounded-xl text-center border-2 ${isDark ? 'bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-700' : 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200'}`}>
                <div className="flex justify-center"><IconBadge Icon={Image} color="purple" /></div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-3">{homeData.hero.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{homeData.hero.subtitle}</p>
                <button className="mt-4 px-4 sm:px-5 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600">{homeData.hero.ctaText}</button>
              </div>
            )}
            {activeSection === 'trust' && homeData?.trustBadges && (
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                {homeData.trustBadges.items.map((badge) => (
                  <div key={badge.id} className={`flex items-center gap-2 p-3 rounded-xl border-2 ${isDark ? 'bg-gray-800/60 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                    <IconBadge Icon={getBadgeIcon(badge.icon)} color="blue" size="sm" />
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{badge.label}</span>
                  </div>
                ))}
              </div>
            )}
            {activeSection === 'reviews' && homeData?.reviews && (
              <div className="space-y-3">
                {homeData.reviews.items.map((review) => (
                  <div key={review.id} className={`p-3 rounded-xl border-2 ${isDark ? 'bg-gray-800/60 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{review.name}</p>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-4 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 flex-shrink-0" /> This is how the section currently looks. Edits are only shown here after you apply them.
            </p>
            <div className="flex justify-end mt-6">
              <button onClick={() => setIsPreviewModalOpen(false)} className="px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}