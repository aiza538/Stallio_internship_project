// src/pages/sellerdashboard/DashboardLayout.jsx

import { useState, useRef, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { Bell, CheckCheck, Trash2, ArrowRight } from "lucide-react";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // ✅ Notification Dropdown State
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`
      flex min-h-screen relative
      ${isDark 
        ? 'bg-[#0d071a]' 
        : 'bg-white/90 backdrop-blur-lg'
      }
    `}>
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {!isDark && (
          <>
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-purple-200/30 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-indigo-200/20 blur-3xl" />
          </>
        )}
        {isDark && (
          <>
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
          </>
        )}
      </div>

      <Sidebar />
      
      {/* ===== Main Content ===== */}
      <main className="relative z-10 flex-1 ml-64">
        {/* ✅ Top Navbar with Bell Icon */}
        <div className={`
          sticky top-0 z-40 px-6 py-4 border-b
          ${isDark ? 'border-purple-900/30 bg-[#0d071a]/80 backdrop-blur-sm' : 'border-purple-100/50 bg-white/80 backdrop-blur-sm'}
        `}>
          <div className="flex items-center justify-end">
            {/* Bell Icon with Dropdown */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className={`
                  relative p-2 rounded-lg transition-all duration-200
                  ${isNotificationOpen 
                    ? 'bg-purple-100/80 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-300'
                  }
                `}
              >
                <Bell className="w-5 h-5" />
              </button>

              {/* ✅ Notification Dropdown - Static Content Removed */}
              {isNotificationOpen && (
                <div className={`
                  absolute right-0 mt-2 w-80 rounded-xl shadow-2xl overflow-hidden
                  ${isDark 
                    ? 'bg-[#1a0f2e] border border-purple-900/30' 
                    : 'bg-white border border-purple-100/50'
                  }
                `}>
                  {/* Header */}
                  <div className={`
                    flex items-center justify-between px-4 py-3 border-b
                    ${isDark ? 'border-purple-900/30' : 'border-purple-100/50'}
                  `}>
                    <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Notifications</h3>
                    <div className="flex items-center gap-2">
                      <button
                        className="text-xs text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300 transition-colors flex items-center gap-1 opacity-50 cursor-not-allowed"
                        disabled
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        Mark All As Read
                      </button>
                      <button
                        className="text-xs text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors flex items-center gap-1 opacity-50 cursor-not-allowed"
                        disabled
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete All
                      </button>
                    </div>
                  </div>

                  {/* ✅ No Notifications - Static Content */}
                  <div className="py-8 px-4">
                    <div className={`
                      flex flex-col items-center justify-center
                      ${isDark ? 'text-gray-400' : 'text-gray-500'}
                    `}>
                      <Bell className="w-10 h-10 mb-2 opacity-30" />
                      <p className="text-sm font-medium">No notifications yet</p>
                      <p className="text-xs opacity-60 mt-1">We'll notify you when something arrives</p>
                    </div>
                  </div>

                  {/* Footer - View All (Disabled) */}
                  <div className={`
                    px-4 py-2.5 border-t text-center
                    ${isDark ? 'border-purple-900/30' : 'border-purple-100/50'}
                  `}>
                    <span className="text-sm text-gray-400 dark:text-gray-500 flex items-center justify-center gap-1 opacity-50 cursor-not-allowed">
                      View All
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}