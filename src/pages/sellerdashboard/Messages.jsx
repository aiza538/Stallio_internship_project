// src/pages/sellerdashboard/Messages.jsx

import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  MessageSquare,
  Search,
  Filter,
  Loader2,
  AlertCircle,
  X,
  User,
  Clock,
  Trash2,
  CheckCheck,
  Sparkles
} from "lucide-react";

const getMockMessages = () => ({
  success: true,
  data: [
    { id: 1, senderName: "John Doe", subject: "Order #1234 - Delivery Question", preview: "Hi, I was wondering when my order will be delivered?", read: false, createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
    { id: 2, senderName: "Sarah Ahmed", subject: "Custom Cake Inquiry", preview: "Hello! I'd like to order a custom cake for my daughter's birthday.", read: false, createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
    { id: 3, senderName: "Muhammad Ali", subject: "Order #1233 - Return Request", preview: "I received my order but the product was damaged during shipping.", read: true, createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
    { id: 4, senderName: "Fatima Khan", subject: "Bulk Order Discount", preview: "I'm interested in placing a bulk order for my event.", read: true, createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString() }
  ]
});

export default function Messages() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      const response = getMockMessages();
      setMessages(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleMarkAsRead = (id) => {
    setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, read: true } : msg));
    showToast("Marked as read ✅");
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this message?")) {
      setMessages(prev => prev.filter(msg => msg.id !== id));
      showToast("Deleted!");
    }
  };

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          msg.senderName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" ||
                         (selectedFilter === "unread" && !msg.read) ||
                         (selectedFilter === "read" && msg.read);
    return matchesSearch && matchesFilter;
  });

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const diff = Math.floor((Date.now() - date) / 1000 / 60);
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
        <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm">Loading messages...</p>
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

      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 px-3 py-2 rounded-xl shadow-lg border max-w-xs w-auto flex items-center gap-2 ${isDark ? "bg-gray-800 border-purple-700" : "bg-white border-gray-200"}`}>
          <CheckCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          <span className="text-xs font-medium flex-1">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div>
        <span className="flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase text-purple-500 dark:text-purple-400">
          <MessageSquare className="w-3.5 h-3.5" />
          From Buyers
        </span>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">Messages</h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          View and manage messages from your customers.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border-2 ${isDark ? 'bg-gray-800/50 border-purple-500/60 text-white placeholder-gray-400' : 'bg-white border-purple-300 text-gray-900 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
        </div>
        <div className="relative min-w-[130px]">
          <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className={`w-full pl-9 pr-7 py-2 text-xs sm:text-sm rounded-lg border-2 appearance-none ${isDark ? 'bg-gray-800/50 border-purple-500/60 text-white' : 'bg-white border-purple-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
          >
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>

      {filteredMessages.length === 0 ? (
        <div className={`py-12 text-center rounded-xl border-2 ${isDark ? "bg-gray-800/50 border-purple-500/60" : "bg-white border-purple-200"}`}>
          <MessageSquare className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">No Messages</h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">When customers message you, they'll appear here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredMessages.map((msg) => (
            <div key={msg.id} className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${!msg.read ? isDark ? "bg-purple-900/10 border-purple-700" : "bg-purple-50/50 border-purple-200" : isDark ? "bg-gray-800/30 border-gray-700" : "bg-white border-gray-100"}`}>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${!msg.read ? "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"}`}>
                  <User className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{msg.senderName}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5 line-clamp-2">{msg.subject}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{msg.preview}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {formatTime(msg.createdAt)}</span>
                      {!msg.read && <span className="w-2 h-2 rounded-full bg-purple-500" />}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    {!msg.read && <button onClick={() => handleMarkAsRead(msg.id)} className="text-xs font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 flex items-center gap-1"><CheckCheck className="w-3.5 h-3.5" /> Mark as read</button>}
                    <button onClick={() => handleDelete(msg.id)} className="text-xs font-medium text-red-500 hover:text-red-600 flex items-center gap-1"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={`p-4 rounded-xl border-2 transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 ${isDark ? "border-purple-700/50 bg-purple-900/20" : "border-purple-300 bg-purple-50/40"}`}>
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">💬 Message tips</p>
            <ul className="text-xs text-gray-600 dark:text-gray-400 mt-1 space-y-1">
              <li>• Respond to customer messages promptly for better satisfaction</li>
              <li>• Mark messages as read to keep track of what you've seen</li>
              <li>• Delete old messages to keep your inbox clean</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}