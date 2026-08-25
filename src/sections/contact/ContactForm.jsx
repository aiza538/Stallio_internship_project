// src/sections/contact/ContactForm.jsx
import { useState, useRef, useEffect } from "react";
import { Send, User, Mail, MessageSquare, Instagram, Facebook, Linkedin, X, MapPin, Phone, Globe, Clock } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

export default function ContactForm() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { ref, isVisible } = useScrollReveal();
  
  const [mousePositionLeft, setMousePositionLeft] = useState({ x: 0, y: 0 });
  const [isHoveredLeft, setIsHoveredLeft] = useState(false);
  const containerRefLeft = useRef(null);

  const [mousePositionRight, setMousePositionRight] = useState({ x: 0, y: 0 });
  const [isHoveredRight, setIsHoveredRight] = useState(false);
  const containerRefRight = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const handleMouseMoveLeft = (e) => {
    if (containerRefLeft.current) {
      const rect = containerRefLeft.current.getBoundingClientRect();
      setMousePositionLeft({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMoveRight = (e) => {
    if (containerRefRight.current) {
      const rect = containerRefRight.current.getBoundingClientRect();
      setMousePositionRight({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div
      ref={ref}
      className={`relative w-full max-w-6xl mx-auto px-4 mt-16 md:mt-20 scroll-reveal ${isVisible ? 'visible' : ''}`}
    >
      {/* ========== LIGHT MODE: Halka purplish shade ========== */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-100/40 via-transparent to-transparent block dark:hidden" />
      
      {/* ========== DARK MODE: Center Radial Purplish Glow ========== */}
      <div 
        className="pointer-events-none absolute inset-0 -z-10 hidden dark:block"
        style={{
          background: "radial-gradient(circle at center, rgba(129, 140, 248, 0.3) 0%, rgba(139, 92, 246, 0.15) 45%, rgba(15, 11, 30, 0) 75%)"
        }}
      />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[45rem] w-[45rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/15 blur-3xl dark:bg-purple-500/20" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        
        {/* LEFT BOX - Contact Info (PINK) - RTL align */}
        <div
          className={`group relative rounded-3xl border-2 border-pink-500/50 bg-gradient-to-br from-pink-100 to-pink-50 dark:from-pink-900/30 dark:to-pink-950/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-pink-500/10 dark:shadow-pink-900/20 transition-all duration-300 overflow-hidden w-full h-fit ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} hover:border-pink-500 dark:hover:border-pink-400 hover:shadow-2xl hover:shadow-pink-500/30`}
          style={{ transitionDelay: "100ms" }}
          onMouseMove={handleMouseMoveLeft}
          onMouseEnter={() => setIsHoveredLeft(true)}
          onMouseLeave={() => setIsHoveredLeft(false)}
          ref={containerRefLeft}
        >
          {null}

          <div className="relative z-10">
            <div className={`inline-flex items-center gap-2 rounded-full bg-pink-100 dark:bg-pink-950/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-pink-700 dark:text-pink-300 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Clock className="h-3.5 w-3.5" /> {t("contactForm.replyTime")}
            </div>

            <h2 className={`text-2xl font-bold text-pink-700 dark:text-pink-400 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              {t("contactForm.contactInfoTitle")}
            </h2>
            <p className={`text-sm text-slate-600 dark:text-slate-300 mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
              {t("contactForm.contactInfoDesc")}
            </p>

            <div className="space-y-4">
              <a href="mailto:contact@stallio.shop" className={`group/contact flex items-center gap-4 rounded-2xl bg-gradient-to-r from-pink-50/80 to-pink-100/50 dark:from-pink-800/30 dark:to-pink-900/30 p-4 border border-pink-200/40 dark:border-pink-800/30 hover:border-pink-400 dark:hover:border-pink-500 transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-600 text-white shadow-lg shadow-pink-500/30">
                  <Mail className="h-5 w-5" />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-pink-600 dark:text-pink-400">{t("contactForm.emailLabel")}</p>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">contact@stallio.shop</p>
                </div>
              </a>

              <a href="tel:+1234567890" className={`group/contact flex items-center gap-4 rounded-2xl bg-gradient-to-r from-pink-50/80 to-pink-100/50 dark:from-pink-800/30 dark:to-pink-900/30 p-4 border border-pink-200/40 dark:border-pink-800/30 hover:border-pink-400 dark:hover:border-pink-500 transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-600 text-white shadow-lg shadow-pink-500/30">
                  <Phone className="h-5 w-5" />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-pink-600 dark:text-pink-400">{t("contactForm.phoneLabel")}</p>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">(XXX) XXX-XXXX</p>
                </div>
              </a>

              <div className={`group/location flex items-center gap-4 rounded-2xl bg-gradient-to-r from-pink-50/80 to-pink-100/50 dark:from-pink-800/30 dark:to-pink-900/30 p-4 border border-pink-200/40 dark:border-pink-800/30 hover:border-pink-400 dark:hover:border-pink-500 transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-600 text-white shadow-lg shadow-pink-500/30">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-pink-600 dark:text-pink-400">{t("contactForm.locationLabel")}</p>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">{t("contactForm.locationValue")}</p>
                </div>
              </div>
            </div>

            <div className={`mt-8 pt-6 border-t border-pink-200/50 dark:border-pink-800/30 ${isRTL ? 'text-right' : 'text-left'}`}>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">{t("contactForm.socialLabel")}</p>
              <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <a href="#" className="p-3 rounded-xl bg-pink-100 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400 hover:bg-pink-200 dark:hover:bg-pink-900/50 transition-all duration-300">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="p-3 rounded-xl bg-pink-100 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400 hover:bg-pink-200 dark:hover:bg-pink-900/50 transition-all duration-300">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="p-3 rounded-xl bg-pink-100 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400 hover:bg-pink-200 dark:hover:bg-pink-900/50 transition-all duration-300">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="p-3 rounded-xl bg-pink-100 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400 hover:bg-pink-200 dark:hover:bg-pink-900/50 transition-all duration-300">
                  <X className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT BOX - Send a message (BLUE) - RTL align */}
        <div
          className={`group relative rounded-3xl border-2 border-blue-500/50 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-950/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-blue-500/10 dark:shadow-blue-900/20 transition-all duration-300 overflow-hidden w-full ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/30`}
          style={{ transitionDelay: "200ms" }}
          onMouseMove={handleMouseMoveRight}
          onMouseEnter={() => setIsHoveredRight(true)}
          onMouseLeave={() => setIsHoveredRight(false)}
          ref={containerRefRight}
        >
          {null}

          <div className="relative z-10">
            <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
                  {t("contactForm.formTitle")}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t("contactForm.formDesc")}
                </p>
              </div>
              <div className="hidden md:flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/30">
                <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg shadow-green-500/30">
                  <Send className="h-8 w-8 text-white" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-800 dark:text-white">{t("contactForm.successTitle")}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t("contactForm.successDesc")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t("contactForm.nameLabel")} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className={`absolute top-2.5 h-4 w-4 text-slate-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`block w-full py-2.5 text-sm border border-slate-300 dark:border-blue-800/30 rounded-xl bg-white/60 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-600 ${isRTL ? 'pr-9 pl-3 text-right' : 'pl-9 pr-3 text-left'}`}
                        placeholder={t("contactForm.namePlaceholder")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t("contactForm.emailLabel")} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className={`absolute top-2.5 h-4 w-4 text-slate-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`block w-full py-2.5 text-sm border border-slate-300 dark:border-blue-800/30 rounded-xl bg-white/60 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-600 ${isRTL ? 'pr-9 pl-3 text-right' : 'pl-9 pr-3 text-left'}`}
                        placeholder={t("contactForm.emailPlaceholder")}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t("contactForm.subjectLabel")} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className={`absolute top-2.5 h-4 w-4 text-slate-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={`block w-full py-2.5 text-sm border border-slate-300 dark:border-blue-800/30 rounded-xl bg-white/60 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-600 ${isRTL ? 'pr-9 pl-3 text-right' : 'pl-9 pr-3 text-left'}`}
                      placeholder={t("contactForm.subjectPlaceholder")}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t("contactForm.messageLabel")} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className={`block w-full py-2.5 text-sm border border-slate-300 dark:border-blue-800/30 rounded-xl bg-white/60 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-600 resize-none ${isRTL ? 'pr-3 pl-3 text-right' : 'pl-3 pr-3 text-left'}`}
                    placeholder={t("contactForm.messagePlaceholder")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  {isSubmitting ? (
                    <>{t("contactForm.sending")}</>
                  ) : (
                    <>{t("contactForm.sendButton")} <Send className="h-4 w-4" /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}