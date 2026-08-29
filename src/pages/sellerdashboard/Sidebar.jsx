// src/pages/sellerdashboard/Sidebar.jsx

import { useState } from "react";
import { 
  LayoutDashboard, 
  MessageSquare, 
  ShoppingBag, 
  Bell, 
  Home, 
  Package, 
  Info, 
  Grid, 
  Phone, 
  FileText, 
  LogOut, 
  Eye,
  Moon,
  Sun,
  Gift,
  Users,
  Settings,
  MessageCircle,
  Store
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

export default function Sidebar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const navLinkClass = (path) => `
    relative flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
    ${isActive(path) 
      ? 'bg-purple-100/80 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' 
      : 'text-slate-600 dark:text-slate-300 hover:bg-purple-50/50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-300'
    }
  `;

  const activeDot = (path) => (
    isActive(path) && (
      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full bg-purple-600 dark:bg-purple-400"></span>
    )
  );

  return (
    <aside className={`
      w-64 h-screen flex flex-col fixed left-0 top-0 z-50
      ${isDark 
        ? 'bg-[#0d071a] border-r border-purple-900/30' 
        : 'bg-white/90 backdrop-blur-lg border-r border-purple-100/50'
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

      {/* Store Brand */}
      <div className={`
        relative z-10 px-5 py-4 border-b
        ${isDark ? 'border-purple-900/30' : 'border-purple-100/50'}
      `}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <h1 className={`font-semibold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>Dashboard</h1>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Sweet Cravings Studio</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex-1 overflow-y-auto px-3 py-4 space-y-1">
        
        <Link to="/dashboard" className={navLinkClass("/dashboard")}>
          {activeDot("/dashboard")}
          <LayoutDashboard className="w-4.5 h-4.5 text-purple-500 dark:text-purple-400" />
          <span>Overview</span>
        </Link>

        {/* FROM BUYERS */}
        <div className="mt-4">
          <div className="px-3 py-2 text-xs font-semibold text-purple-500 dark:text-purple-400 uppercase tracking-wider">
            From Buyers
          </div>
          
          <div className="mt-1 space-y-0.5">
            <Link to="/dashboard/messages" className={navLinkClass("/dashboard/messages")}>
              {activeDot("/dashboard/messages")}
              <MessageSquare className="w-4.5 h-4.5 text-purple-500 dark:text-purple-400" />
              <span>Messages</span>
              {/* ✅ Badge removed */}
            </Link>
            <Link to="/dashboard/orders" className={navLinkClass("/dashboard/orders")}>
              {activeDot("/dashboard/orders")}
              <ShoppingBag className="w-4.5 h-4.5 text-purple-500 dark:text-purple-400" />
              <span>Orders</span>
              {/* ✅ Badge removed */}
            </Link>
            <Link to="/dashboard/notifications" className={navLinkClass("/dashboard/notifications")}>
              {activeDot("/dashboard/notifications")}
              <Bell className="w-4.5 h-4.5 text-purple-500 dark:text-purple-400" />
              <span>Notifications</span>
              {/* ✅ Badge removed */}
            </Link>
          </div>
        </div>

        {/* YOUR STOREFRONT */}
        <div className="mt-4">
          <div className="px-3 py-2 text-xs font-semibold text-purple-500 dark:text-purple-400 uppercase tracking-wider">
            Your Storefront
          </div>
          
          <div className="mt-1 space-y-0.5">
            <Link to="/dashboard/home" className={navLinkClass("/dashboard/home")}>
              {activeDot("/dashboard/home")}
              <Home className="w-4.5 h-4.5 text-purple-500 dark:text-purple-400" />
              <span>Home</span>
            </Link>
            <Link to="/dashboard/products" className={navLinkClass("/dashboard/products")}>
              {activeDot("/dashboard/products")}
              <Package className="w-4.5 h-4.5 text-purple-500 dark:text-purple-400" />
              <span>Products</span>
            </Link>
            <Link to="/dashboard/about" className={navLinkClass("/dashboard/about")}>
              {activeDot("/dashboard/about")}
              <Info className="w-4.5 h-4.5 text-purple-500 dark:text-purple-400" />
              <span>About</span>
            </Link>
            <Link to="/dashboard/categories" className={navLinkClass("/dashboard/categories")}>
              {activeDot("/dashboard/categories")}
              <Grid className="w-4.5 h-4.5 text-purple-500 dark:text-purple-400" />
              <span>Categories</span>
            </Link>
            <Link to="/dashboard/contact" className={navLinkClass("/dashboard/contact")}>
              {activeDot("/dashboard/contact")}
              <Phone className="w-4.5 h-4.5 text-purple-500 dark:text-purple-400" />
              <span>Contact</span>
            </Link>
            <Link to="/dashboard/footer" className={navLinkClass("/dashboard/footer")}>
              {activeDot("/dashboard/footer")}
              <FileText className="w-4.5 h-4.5 text-purple-500 dark:text-purple-400" />
              <span>Footer</span>
            </Link>
            <Link to="/dashboard/coupons" className={navLinkClass("/dashboard/coupons")}>
              {activeDot("/dashboard/coupons")}
              <Gift className="w-4.5 h-4.5 text-purple-500 dark:text-purple-400" />
              <span>Coupons</span>
            </Link>
            <Link to="/dashboard/others" className={navLinkClass("/dashboard/others")}>
              {activeDot("/dashboard/others")}
              <Users className="w-4.5 h-4.5 text-purple-500 dark:text-purple-400" />
              <span>Others</span>
            </Link>
          </div>
        </div>

        {/* SETTINGS */}
        <div className="mt-4">
          <div className="px-3 py-2 text-xs font-semibold text-purple-500 dark:text-purple-400 uppercase tracking-wider">
            Settings
          </div>
          
          <div className="mt-1 space-y-0.5">
            <Link to="/dashboard/chat" className={navLinkClass("/dashboard/chat")}>
              {activeDot("/dashboard/chat")}
              <MessageCircle className="w-4.5 h-4.5 text-purple-500 dark:text-purple-400" />
              <span>Chat With Admin</span>
            </Link>
            <Link to="/dashboard/settings" className={navLinkClass("/dashboard/settings")}>
              {activeDot("/dashboard/settings")}
              <Settings className="w-4.5 h-4.5 text-purple-500 dark:text-purple-400" />
              <span>Settings</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className={`
        relative z-10 px-3 py-4 border-t space-y-1
        ${isDark ? 'border-purple-900/30' : 'border-purple-100/50'}
      `}>
        
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-slate-600 dark:text-slate-300 hover:bg-purple-50/50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-300"
        >
          {isDark ? (
            <>
              <Sun className="w-4.5 h-4.5 text-yellow-500" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4.5 h-4.5 text-purple-500" />
              <span>Dark Mode</span>
            </>
          )}
        </button>

        {/* View Store */}
        <button 
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-slate-600 dark:text-slate-300 hover:bg-purple-50/50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-300 cursor-default"
          onClick={(e) => e.preventDefault()}
        >
          <Eye className="w-4.5 h-4.5 text-purple-500 dark:text-purple-400" />
          <span>View Store</span>
        </button>

        {/* Logout */}
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-red-500 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/20">
          <LogOut className="w-4.5 h-4.5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}