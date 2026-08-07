import { AlertCircle, Check, Zap, ShoppingBag, MessageSquare, FileText, Package, Link as LinkIcon } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useState, useRef } from "react";

function RedMouseFollower({ children, className = "" }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setPosition({ x, y });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-500 ${
        isHovering ? 'border-red-500/70 dark:border-red-400/60' : 'border-red-200/40 dark:border-red-700/20'
      } ${className}`}
    >
      {isHovering && (
        <div
          className={`pointer-events-none absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-red-500/40 via-red-400/20 to-transparent blur-2xl transition-all duration-200`}
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
          }}
        />
      )}
      {children}
    </div>
  );
}

function GreenMouseFollower({ children, className = "" }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setPosition({ x, y });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-500 ${
        isHovering ? 'border-green-500/70 dark:border-green-400/60' : 'border-green-200/40 dark:border-green-700/20'
      } ${className}`}
    >
      {isHovering && (
        <div
          className={`pointer-events-none absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-green-500/40 via-green-400/20 to-transparent blur-2xl transition-all duration-200`}
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
          }}
        />
      )}
      {children}
    </div>
  );
}

export default function WhyWeExist() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">

      <div className="pointer-events-none absolute -top-20 right-0 h-[30rem] w-[30rem] rounded-full bg-indigo-400/8 blur-3xl dark:bg-indigo-400/12" />
      <div className="pointer-events-none absolute -bottom-20 left-0 h-[30rem] w-[30rem] rounded-full bg-purple-400/8 blur-3xl dark:bg-purple-400/12" />
      

      <div className={`relative mx-auto max-w-content scroll-reveal ${isVisible ? 'visible' : ''}`}>

        <div className="mb-8 text-center">
          <span className="mb-3 inline-block font-mono text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Why We Exist
          </span>
          <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
            Selling on social should <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
                    not feel improvised.
                </span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600 dark:text-slate-300">
            Most small sellers juggle screenshots, voice notes, and scattered chats. Stallio gives you a single shelf: catalog, checkout cues, and orders in one dashboard.
          </p>
        </div>

        <div className="relative mb-8 flex items-center justify-center">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
          <div className="relative rounded-full border border-indigo-200/30 bg-white/80 px-8 py-2.5 text-sm font-bold text-indigo-600 backdrop-blur-sm dark:border-indigo-800/30 dark:bg-slate-900/80 dark:text-indigo-400">
            VS
          </div>
        </div>


        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          <RedMouseFollower className="bg-gradient-to-br from-red-100/60 to-red-200/30 p-6 shadow-xl shadow-red-500/5 hover:shadow-2xl hover:shadow-red-500/20 dark:from-red-950/50 dark:to-red-900/30 dark:shadow-red-500/10">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-red-200/80 p-2.5 shadow-md shadow-red-500/20 transition-all duration-300 group-hover:scale-110 dark:bg-red-900/60">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-red-700 dark:text-red-400">The Friction</h3>
            </div>
            <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
              Relying only on messages and posts often means:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                <div>
                  <span className="font-semibold text-slate-800 dark:text-white">Products are hard to showcase properly</span>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Screenshots and voice notes don't do justice to your products.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                <MessageSquare className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                <div>
                  <span className="font-semibold text-slate-800 dark:text-white">Orders get lost in messages</span>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Tracking orders across DMs and chats is chaotic and unreliable.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                <div>
                  <span className="font-semibold text-slate-800 dark:text-white">Customers feel confused</span>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Without a clear storefront, customers don't know how to order.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                <div>
                  <span className="font-semibold text-slate-800 dark:text-white">The business does not look professional</span>
                  <p className="text-sm text-slate-600 dark:text-slate-300">A scattered presence undermines trust and credibility.</p>
                </div>
              </li>
            </ul>
          </RedMouseFollower>

          <GreenMouseFollower className="bg-gradient-to-br from-green-100/60 to-green-200/30 p-6 shadow-xl shadow-green-500/5 hover:shadow-2xl hover:shadow-green-500/20 dark:from-green-950/50 dark:to-green-900/30 dark:shadow-green-500/10">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-green-200/80 p-2.5 shadow-md shadow-green-500/20 transition-all duration-300 group-hover:scale-110 dark:bg-green-900/60">
                <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-green-700 dark:text-green-400">What Stallio Does</h3>
            </div>
            <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
              You get:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                <LinkIcon className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                <div>
                  <span className="font-semibold text-slate-800 dark:text-white">A hosted mini store at stallio.shop/yourname</span>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Get your own professional storefront link instantly.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                <Package className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                <div>
                  <span className="font-semibold text-slate-800 dark:text-white">Unlimited catalog, checkout, and order inbox</span>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Everything you need to manage your business in one place.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                <FileText className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                <div>
                  <span className="font-semibold text-slate-800 dark:text-white">PDF invoices, coupons, and delivery rules included</span>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Professional tools built in — no extra setup required.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                <Zap className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                <div>
                  <span className="font-semibold text-slate-800 dark:text-white">Sign up, add products, share one link tonight</span>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Get started in minutes — no technical skills needed.</p>
                </div>
              </li>
            </ul>
          </GreenMouseFollower>
        </div>
      </div>
    </section>
  );
}