import { Mail, MessageCircle, Clock, Globe } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useRef, useState } from "react";

export default function ContactInfo() {
  const { ref, isVisible } = useScrollReveal();

  const themes = [
    {
      // Light = White with subtle border, Dark = Glass effect (Transparent)
      baseBg: "bg-white/80 dark:bg-white/5",
      border: "border-purple-200 dark:border-purple-500/30 hover:border-purple-500",
      iconBg: "bg-purple-100 dark:bg-purple-500/20",
      iconColor: "text-purple-600 dark:text-purple-300",
      glowColor: "rgba(168, 85, 247, 0.3)",
    },
    {
      baseBg: "bg-white/80 dark:bg-white/5",
      border: "border-blue-200 dark:border-blue-500/30 hover:border-blue-500",
      iconBg: "bg-blue-100 dark:bg-blue-500/20",
      iconColor: "text-blue-600 dark:text-blue-300",
      glowColor: "rgba(59, 130, 246, 0.3)",
    },
    {
      baseBg: "bg-white/80 dark:bg-white/5",
      border: "border-emerald-200 dark:border-emerald-500/30 hover:border-emerald-500",
      iconBg: "bg-emerald-100 dark:bg-emerald-500/20",
      iconColor: "text-emerald-600 dark:text-emerald-300",
      glowColor: "rgba(16, 185, 129, 0.3)",
    },
    {
      baseBg: "bg-white/80 dark:bg-white/5",
      border: "border-amber-200 dark:border-amber-500/30 hover:border-amber-500",
      iconBg: "bg-amber-100 dark:bg-amber-500/20",
      iconColor: "text-amber-600 dark:text-amber-300",
      glowColor: "rgba(245, 158, 11, 0.3)",
    },
  ];

  const infoItems = [
    {
      icon: Mail,
      title: "Email",
      details: ["contact@stallio.shop"],
    },
    {
      icon: MessageCircle,
      title: "Social",
      details: ["@stallio.shop on Instagram", "@Stallio on Facebook"],
    },
    {
      icon: Clock,
      title: "Response Time",
      details: ["Mon–Fri: 5pm-10pm EST", "Avg. 24h response"],
    },
    {
      icon: Globe,
      title: "Help Center",
      details: ["FAQs and guides", "Getting started"],
    },
  ];

  const [hoverIndex, setHoverIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <section
      ref={ref}
      className={`relative px-4 py-16 sm:px-6 lg:px-8 lg:py-20 bg-white scroll-reveal ${
        isVisible ? "visible" : ""
      }`}
    >
      {/* ======================================================== */}
      {/* LIGHT MODE PURPLISH BACKGROUND SHADE     */}
      {/* ======================================================== */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/80 via-white to-white block dark:hidden" />
      
      {/* DARK MODE BACKGROUND GLOW */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2d1045] via-[#150b2e] to-[#0d071a] hidden dark:block" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl dark:bg-purple-500/10" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Other ways to <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
              reach us
            </span>
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            We're here to help you succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {infoItems.map((item, index) => {
            const theme = themes[index % themes.length];

            return (
              <div
                key={index}
                ref={index === hoverIndex ? cardRef : null}
                onMouseMove={index === hoverIndex ? handleMouseMove : undefined}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                className={`relative rounded-xl border ${theme.border} ${theme.baseBg} p-6 backdrop-blur-md transition-all duration-300 overflow-hidden hover:shadow-xl`}
              >
                {/* Mouse Follower Glow Effect (Light aur Dark dono mein chalega) */}
                {hoverIndex === index && (
                  <div
                    className="pointer-events-none absolute rounded-full blur-[50px] transition-all duration-100"
                    style={{
                      width: "200px",
                      height: "200px",
                      left: mousePos.x - 100,
                      top: mousePos.y - 100,
                      backgroundColor: theme.glowColor,
                    }}
                  />
                )}

                <div className="relative z-10">
                  {/* Icon Circle */}
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${theme.iconBg} mb-4`}
                  >
                    <item.icon className={`h-6 w-6 ${theme.iconColor}`} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-base font-semibold text-slate-800 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  {item.details.map((detail, i) => (
                    <p key={i} className="text-sm text-slate-600 dark:text-slate-300">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}