// src/pages/sellerdashboard/Notifications.jsx

import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  Bell,
  CheckCircle,
  Loader2,
  AlertCircle,
  X,
  FileText,
  Sparkles,
  CheckCheck,
  Trash2,
  ShoppingBag,
  MessageSquare,
  Star,
  Truck,
  Clock,
  MessageCircle
} from "lucide-react";

export default function Notifications() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // ✅ Mock Notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setNotifications([]);
      } catch (err) {
        showToast("Failed to load notifications ❌", true);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const showToast = (message, isError = false) => {
    setToastMessage({ text: message, isError });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ✅ Mark All As Read
  const markAllAsRead = () => {
    if (notifications.length === 0) return;
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    showToast("All notifications marked as read ✅");
  };

  // ✅ Delete All
  const deleteAll = () => {
    if (notifications.length === 0) return;
    if (window.confirm("Are you sure you want to delete all notifications?")) {
      setNotifications([]);
      showToast("All notifications deleted ✅");
    }
  };

  // ✅ Mark Single as Read
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // ✅ Delete Single
  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    showToast("Notification deleted ✅");
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const hasNotifications = notifications.length > 0;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
        <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm">Loading notifications...</p>
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
            From Buyers
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">Notifications</h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {unreadCount > 0 
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
              : hasNotifications ? "All caught up! No unread notifications" : "No notifications yet"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* ✅ Mark All As Read — Enabled only when notifications exist */}
          <button
            onClick={markAllAsRead}
            disabled={!hasNotifications}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium border-2 transition-all duration-300 flex items-center gap-1.5 sm:gap-2 ${
              hasNotifications
                ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-950/50 hover:shadow-lg hover:shadow-purple-200/50"
                : "text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 cursor-not-allowed opacity-60"
            }`}
          >
            <CheckCheck className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            <span>Mark All As Read</span>
            {hasNotifications && unreadCount > 0 && (
              <span className="ml-1 text-[10px] font-bold bg-purple-600 text-white px-1.5 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

          {/* ✅ Delete All — Enabled only when notifications exist */}
          <button
            onClick={deleteAll}
            disabled={!hasNotifications}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium border-2 transition-all duration-300 flex items-center gap-1.5 sm:gap-2 ${
              hasNotifications
                ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-700 hover:bg-red-100 dark:hover:bg-red-950/50 hover:shadow-lg hover:shadow-red-200/50"
                : "text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 cursor-not-allowed opacity-60"
            }`}
          >
            <Trash2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            <span>Delete All</span>
            {hasNotifications && (
              <span className="ml-1 text-[10px] font-bold text-red-500 dark:text-red-400">
                ({notifications.length})
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <div className={`py-16 text-center rounded-xl border-2 ${isDark ? "bg-gray-800/50 border-purple-500/60" : "bg-white border-purple-200"}`}>
          <div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
            <Bell className="w-10 h-10 text-purple-400 dark:text-purple-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No Notifications</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">
            You're all caught up! We'll notify you when something arrives.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notif) => {
            const Icon = notif.icon;
            return (
              <div
                key={notif.id}
                className={`group relative rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                  notif.read
                    ? isDark 
                      ? "bg-gray-800/30 border-gray-700 hover:border-purple-500/50" 
                      : "bg-white border-gray-100 hover:border-purple-300"
                    : isDark
                      ? "bg-purple-950/20 border-purple-700 hover:border-purple-500"
                      : "bg-purple-50/50 border-purple-200 hover:border-purple-400"
                }`}
              >
                <div className="flex items-start gap-3 p-3 sm:p-4">
                  {/* Icon */}
                  <div className={`p-2 rounded-xl flex-shrink-0 ${notif.bgColor}`}>
                    <Icon className={`w-4.5 h-4.5 ${notif.color}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={`text-sm font-semibold ${
                          notif.read 
                            ? "text-gray-600 dark:text-gray-300" 
                            : "text-gray-900 dark:text-white"
                        }`}>
                          {notif.title}
                        </p>
                        <p className={`text-xs ${
                          notif.read 
                            ? "text-gray-500 dark:text-gray-400" 
                            : "text-gray-600 dark:text-gray-300"
                        } mt-0.5`}>
                          {notif.message}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-400">{notif.time}</span>
                          {!notif.read && (
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    {!notif.read && (
                      <button
                        onClick={() => markAsRead(notif.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                        title="Mark as read"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notif.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      title="Delete"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tips */}
      <div className={`p-4 rounded-xl border-2 transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 ${
        isDark ? "border-purple-700/50 bg-purple-900/20" : "border-purple-300 bg-purple-50/40"
      }`}>
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">🔔 Tips for notifications</p>
            <ul className="text-xs text-gray-600 dark:text-gray-400 mt-1 space-y-1">
              <li>• Stay updated with all your store activities in one place</li>
              <li>• Mark notifications as read to keep track of what's new</li>
              <li>• Delete notifications you no longer need</li>
              <li>• You'll receive real-time updates for orders, messages, and reviews</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}