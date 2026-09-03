// src/pages/sellerdashboard/Chat.jsx

import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  Send,
  MessageCircle,
  RefreshCw,
  Eye,
  Loader2,
  CheckCircle,
  AlertCircle,
  X,
  Sparkles,
  FileText,
  Mail,
  Phone,
  HelpCircle
} from "lucide-react";

export default function ChatWithAdmin() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  
  // ✅ Chat Container Ref
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  // ✅ Mock Messages
  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setMessages([]);
      } catch (err) {
        showToast("Failed to load messages ❌", true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, []);

  // ✅ Scroll to TOP on load
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  }, [isLoading]);

  const showToast = (message, isError = false) => {
    setToastMessage({ text: message, isError });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ✅ Scroll to bottom only when new message arrives
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // ✅ Send Message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      showToast("Please enter a message ❌", true);
      return;
    }

    const messageData = {
      id: Date.now(),
      text: newMessage.trim(),
      sender: "seller",
      timestamp: new Date().toLocaleString(),
      read: false,
    };

    setIsSending(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setMessages((prev) => [...prev, messageData]);
      setNewMessage("");
      
      setTimeout(() => {
        const adminReply = {
          id: Date.now() + 1,
          text: "Thank you for your message. Our team will get back to you shortly.",
          sender: "admin",
          timestamp: new Date().toLocaleString(),
          read: true,
        };
        setMessages((prev) => [...prev, adminReply]);
        showToast("Admin replied! ✅");
      }, 2000);
      
    } catch (err) {
      showToast("Failed to send message. Please try again. ❌", true);
    } finally {
      setIsSending(false);
    }
  };

  // ✅ Refresh Messages
  const handleRefresh = () => {
    showToast("Messages refreshed! 🔄");
  };

  // ✅ View Store
  const handleViewStore = () => {
    showToast("Store preview will be available once connected to the live store.");
  };

  // ✅ Quick Actions
  const quickActions = [
    { icon: Mail, label: "Email Support", value: "contact@stallio.shop" },
    { icon: Phone, label: "Phone Support", value: "+1 (555) 123-4567" },
    { icon: HelpCircle, label: "Help Center", value: "Visit Help Center" },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
        <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm">Loading messages...</p>
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
            Settings
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">Chat With Admin</h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Message the Stallio team for help with your shop or account.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1.5 sm:gap-2"
          >
            <RefreshCw className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleViewStore}
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1.5 sm:gap-2"
          >
            <Eye className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            <span>View Store</span>
          </button>
        </div>
      </div>

      {/* ===== Chat Container ===== */}
      <div className={`rounded-xl border-2 overflow-hidden transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 ${
        isDark ? "bg-gray-800/50 border-purple-700" : "bg-gray-50/80 border-purple-300"
      }`}>
        
        {/* Chat Header */}
        <div className={`flex items-center justify-between px-4 sm:px-5 py-3 border-b-2 ${
          isDark ? "border-purple-700" : "border-purple-200"
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/25">
              <MessageCircle className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">Stallio Support</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Usually replies within 24 hours</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-gray-500 dark:text-gray-400">Online</span>
          </div>
        </div>

        {/* Messages Area — Scroll Top on Load */}
        <div
          ref={chatContainerRef}
          className="h-[400px] overflow-y-auto p-4 sm:p-5 space-y-3"
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-3">
                <MessageCircle className="w-8 h-8 text-purple-500" />
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">No messages yet</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xs">
                Send a message to reach the Stallio team.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "seller" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-2.5 ${
                    msg.sender === "seller"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                      : isDark
                        ? "bg-gray-700 border border-gray-600 text-white"
                        : "bg-white border border-gray-200 text-gray-900"
                  }`}
                >
                  <p className="text-sm break-words">{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${
                    msg.sender === "seller" ? "text-purple-200" : "text-gray-400 dark:text-gray-500"
                  }`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className={`p-4 border-t-2 ${
          isDark ? "border-purple-700" : "border-purple-200"
        }`}>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
              placeholder="Message to admin..."
              className={`flex-1 px-4 py-2.5 rounded-xl text-sm border-2 ${
                isDark ? "bg-gray-800 border-purple-700 text-white placeholder-gray-400" : "bg-white/80 border-gray-300 text-gray-900 placeholder-gray-400"
              } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors`}
            />
            <button
              onClick={handleSendMessage}
              disabled={isSending}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-2 ${
                isSending ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ===== Quick Actions ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <div
              key={action.label}
              className={`p-4 rounded-xl border-2 transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 ${
                isDark ? "bg-gray-800/50 border-purple-700" : "bg-gray-50/80 border-purple-300"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${isDark ? "bg-gray-700" : "bg-purple-50"}`}>
                  <Icon className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{action.label}</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{action.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tips */}
      <div className={`p-4 rounded-xl border-2 transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 ${
        isDark ? "border-purple-700/50 bg-purple-900/20" : "border-purple-300 bg-purple-50/40"
      }`}>
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">💬 Tips for chatting with support</p>
            <ul className="text-xs text-gray-600 dark:text-gray-400 mt-1 space-y-1">
              <li>• Be clear and specific about your issue</li>
              <li>• Provide your store URL and account details if needed</li>
              <li>• Allow 24-48 hours for a response</li>
              <li>• Check your spam folder if you don't receive a reply</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}