// src/sections/contact/ContactForm.jsx
import { useState, useRef, useEffect } from "react";
import { Send, User, Mail, MessageSquare, Instagram, Facebook, Linkedin, X, MapPin, Phone, Globe, Clock } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function ContactForm() {
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
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/70 via-white to-white block dark:hidden" />
      
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2d1045] via-[#150b2e] to-[#0d071a] hidden dark:block" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl dark:bg-purple-500/10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        
        {/* LEFT BOX - Contact Info */}
        <div
          className={`group relative rounded-3xl border-2 border-purple-500/50 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-800/40 dark:to-purple-900/40 p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-purple-500/10 dark:shadow-purple-900/20 transition-all duration-300 overflow-hidden w-full h-fit ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/30`}
          style={{ transitionDelay: "100ms" }}
          onMouseMove={handleMouseMoveLeft}
          onMouseEnter={() => setIsHoveredLeft(true)}
          onMouseLeave={() => setIsHoveredLeft(false)}
          ref={containerRefLeft}
        >
          {null}

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 dark:bg-purple-950/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-300 mb-4">
              <Clock className="h-3.5 w-3.5" /> Typical reply: 2-3 business days
            </div>

            <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-2">
              Contact info
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-8">
              Prefer email or phone? Use either below.
            </p>

            <div className="space-y-4">
              <a href="mailto:contact@stallio.shop" className="group/contact flex items-center gap-4 rounded-2xl bg-gradient-to-r from-purple-50/80 to-purple-100/50 dark:from-purple-800/40 dark:to-purple-900/40 p-4 border border-purple-200/40 dark:border-purple-800/40 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white shadow-lg shadow-purple-500/30">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">Email</p>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">contact@stallio.shop</p>
                </div>
              </a>

              <a href="tel:+1234567890" className="group/contact flex items-center gap-4 rounded-2xl bg-gradient-to-r from-purple-50/80 to-purple-100/50 dark:from-purple-800/40 dark:to-purple-900/40 p-4 border border-purple-200/40 dark:border-purple-800/40 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white shadow-lg shadow-purple-500/30">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">Phone</p>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">(XXX) XXX-XXXX</p>
                </div>
              </a>

              <div className="group/location flex items-center gap-4 rounded-2xl bg-gradient-to-r from-purple-50/80 to-purple-100/50 dark:from-purple-800/40 dark:to-purple-900/40 p-4 border border-purple-200/40 dark:border-purple-800/40 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white shadow-lg shadow-purple-500/30">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">Location</p>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">Remote-first, worldwide</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-purple-200/50 dark:border-purple-800/40">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">SOCIAL</p>
              <div className="flex items-center gap-4">
                <a href="#" className="p-3 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/70 transition-all duration-300">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="p-3 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/70 transition-all duration-300">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="p-3 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/70 transition-all duration-300">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="p-3 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/70 transition-all duration-300">
                  <X className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT BOX - Send a message */}
        <div
          className={`group relative rounded-3xl border-2 border-blue-500/50 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-800/40 dark:to-blue-900/40 p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-blue-500/10 dark:shadow-blue-900/20 transition-all duration-300 overflow-hidden w-full ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/30`}
          style={{ transitionDelay: "200ms" }}
          onMouseMove={handleMouseMoveRight}
          onMouseEnter={() => setIsHoveredRight(true)}
          onMouseLeave={() => setIsHoveredRight(false)}
          ref={containerRefRight}
        >
          {null}

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">
                  Send a message
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  All fields required. We respond with context.
                </p>
              </div>
              <div className="hidden md:flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/50">
                <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg shadow-green-500/30">
                  <Send className="h-8 w-8 text-white" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-800 dark:text-white">Message sent!</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">We'll get back to you within a few business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="block w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 dark:border-blue-800/30 rounded-xl bg-white/60 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-600"
                        placeholder="Your name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="block w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 dark:border-blue-800/30 rounded-xl bg-white/60 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-600"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="block w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 dark:border-blue-800/30 rounded-xl bg-white/60 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-600"
                      placeholder="What is this about?"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="block w-full px-3 py-2.5 text-sm border border-slate-300 dark:border-blue-800/30 rounded-xl bg-white/60 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-600 resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>Send Message <Send className="h-4 w-4" /></>
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