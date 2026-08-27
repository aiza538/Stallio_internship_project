// src/pages/Privacy.jsx
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Mail, 
  ShoppingBag, 
  MessageCircle, 
  Database, 
  Clock, 
  FileText, 
  Home, 
  Lock, 
  Server,
  CheckCircle,
  Globe,
  RefreshCw,
  User,
  Store,
  Package,
  MessagesSquare,
  Settings
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Privacy() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const sectionsRef = useRef([]);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Scroll Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { 
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px'
      }
    );

    sectionsRef.current.forEach((el) => {
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          el.classList.add('animate-fade-up');
        } else {
          el.style.opacity = '0';
          el.style.transform = 'translateY(40px)';
          el.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
          observer.observe(el);
        }
      }
    });

    return () => observer.disconnect();
  }, []);

  const sections = [
    {
      id: 1,
      icon: Shield,
      color: 'from-indigo-500 to-purple-600',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      borderColor: 'border-indigo-300 dark:border-indigo-600',
      hoverBorderColor: 'rgba(99, 102, 241, 0.6)',
      glowColor: 'rgba(99, 102, 241, 0.15)',
      bgColor: 'bg-indigo-50/80 dark:bg-indigo-950/40',
      hoverBgColor: 'bg-indigo-100/80 dark:bg-indigo-900/50',
      title: t('privacy.section1.title'),
      content: t('privacy.section1.content'),
      type: 'text'
    },
    {
      id: 2,
      icon: Database,
      color: 'from-blue-500 to-cyan-600',
      iconColor: 'text-blue-600 dark:text-blue-400',
      borderColor: 'border-blue-300 dark:border-blue-600',
      hoverBorderColor: 'rgba(59, 130, 246, 0.6)',
      glowColor: 'rgba(59, 130, 246, 0.15)',
      bgColor: 'bg-blue-50/80 dark:bg-blue-950/40',
      hoverBgColor: 'bg-blue-100/80 dark:bg-blue-900/50',
      title: t('privacy.section2.title'),
      content: [
        { 
          icon: User, 
          label: t('privacy.section2.accountDetails'), 
          desc: t('privacy.section2.accountDetailsDesc') 
        },
        { 
          icon: Store, 
          label: t('privacy.section2.shopContent'), 
          desc: t('privacy.section2.shopContentDesc') 
        },
        { 
          icon: Package, 
          label: t('privacy.section2.orders'), 
          desc: t('privacy.section2.ordersDesc') 
        },
        { 
          icon: MessagesSquare, 
          label: t('privacy.section2.messages'), 
          desc: t('privacy.section2.messagesDesc') 
        },
        { 
          icon: Settings, 
          label: t('privacy.section2.technical'), 
          desc: t('privacy.section2.technicalDesc') 
        },
      ],
      type: 'list'
    },
    {
      id: 3,
      icon: Lock,
      color: 'from-emerald-500 to-teal-600',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      borderColor: 'border-emerald-300 dark:border-emerald-600',
      hoverBorderColor: 'rgba(16, 185, 129, 0.6)',
      glowColor: 'rgba(16, 185, 129, 0.15)',
      bgColor: 'bg-emerald-50/80 dark:bg-emerald-950/40',
      hoverBgColor: 'bg-emerald-100/80 dark:bg-emerald-900/50',
      title: t('privacy.section3.title'),
      content: t('privacy.section3.content'),
      note: t('privacy.section3.note'),
      type: 'text'
    },
    {
      id: 4,
      icon: Globe,
      color: 'from-amber-500 to-orange-600',
      iconColor: 'text-amber-600 dark:text-amber-400',
      borderColor: 'border-amber-300 dark:border-amber-600',
      hoverBorderColor: 'rgba(245, 158, 11, 0.6)',
      glowColor: 'rgba(245, 158, 11, 0.15)',
      bgColor: 'bg-amber-50/80 dark:bg-amber-950/40',
      hoverBgColor: 'bg-amber-100/80 dark:bg-amber-900/50',
      title: t('privacy.section4.title'),
      content: t('privacy.section4.content'),
      list: [
        t('privacy.section4.providers'),
        t('privacy.section4.legal'),
        t('privacy.section4.storage')
      ],
      type: 'list-simple'
    },
    {
      id: 5,
      icon: Clock,
      color: 'from-rose-500 to-pink-600',
      iconColor: 'text-rose-600 dark:text-rose-400',
      borderColor: 'border-rose-300 dark:border-rose-600',
      hoverBorderColor: 'rgba(244, 63, 94, 0.6)',
      glowColor: 'rgba(244, 63, 94, 0.15)',
      bgColor: 'bg-rose-50/80 dark:bg-rose-950/40',
      hoverBgColor: 'bg-rose-100/80 dark:bg-rose-900/50',
      title: t('privacy.section5.title'),
      content: t('privacy.section5.content'),
      note: t('privacy.section5.deleteNote'),
      type: 'text'
    },
    {
      id: 6,
      icon: RefreshCw,
      color: 'from-violet-500 to-purple-600',
      iconColor: 'text-violet-600 dark:text-violet-400',
      borderColor: 'border-violet-300 dark:border-violet-600',
      hoverBorderColor: 'rgba(139, 92, 246, 0.6)',
      glowColor: 'rgba(139, 92, 246, 0.15)',
      bgColor: 'bg-violet-50/80 dark:bg-violet-950/40',
      hoverBgColor: 'bg-violet-100/80 dark:bg-violet-900/50',
      title: t('privacy.section6.title'),
      content: t('privacy.section6.content'),
      note: t('privacy.section6.updateNote'),
      type: 'text'
    }
  ];

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setHoveredSection(index);
  };

  const handleMouseLeave = () => {
    setHoveredSection(null);
  };

  return (
    <div className="min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50/60 via-purple-50/40 to-white/80 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-slate-900/80">
      <div className="max-w-4xl mx-auto">
        
        {/* Back to Home Button - Right aligned in Arabic */}
        <div className={`mb-10 ${isRTL ? 'text-right' : 'text-left'}`}>
          <Link 
            to="/" 
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/40 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <Home className="w-5 h-5" />
            {t('privacy.backToHome')}
          </Link>
        </div>

        {/* Header with Icon - Center */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl shadow-indigo-500/30">
            <Shield className="w-10 h-10 text-white" />
          </div>
          
          {/* ✅ Dynamic Heading - "Privacy" black + "Policy" purple for EN, ES, AR */}
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-center">
            <span className="text-slate-900 dark:text-white">
              {t('privacy.titlePart1')}
            </span>
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300">
              {t('privacy.titlePart2')}
            </span>
          </h1>
        </div>

        {/* Sections - Mouse Following Glow */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div
              key={section.id}
              ref={(el) => (sectionsRef.current[index] = el)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
              className={`relative rounded-2xl border-2 ${section.borderColor} ${section.bgColor} p-6 sm:p-8 shadow-lg overflow-hidden transition-all duration-300 ${
                hoveredSection === index ? `${section.hoverBgColor} shadow-xl` : ''
              }`}
              style={{
                borderColor: hoveredSection === index 
                  ? section.hoverBorderColor
                  : undefined,
                boxShadow: hoveredSection === index
                  ? `0 0 30px ${section.hoverBorderColor}`
                  : undefined,
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease'
              }}
            >
              {/* Mouse Following Glow Effect */}
              {hoveredSection === index && (
                <div 
                  className="absolute pointer-events-none rounded-full"
                  style={{
                    width: '300px',
                    height: '300px',
                    background: `radial-gradient(circle, ${section.glowColor}, transparent 70%)`,
                    left: mousePosition.x - 150,
                    top: mousePosition.y - 150,
                    transition: 'left 0.05s ease, top 0.05s ease'
                  }}
                />
              )}

              {/* Section Header - Right aligned in RTL */}
              <div className={`flex items-start gap-4 mb-4 relative z-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r ${section.color} flex items-center justify-center shadow-lg`}>
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className={`text-xl sm:text-2xl font-bold text-slate-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}>
                  {section.title}
                </h2>
              </div>

              {/* Section Content */}
              {section.type === 'text' && (
                <div className={`${isRTL ? 'text-right' : 'text-left'} relative z-10`}>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
                    {section.content}
                  </p>
                  {section.note && (
                    <div className={`mt-4 flex items-start gap-3 p-4 rounded-xl bg-white/70 dark:bg-white/10 border-2 ${section.borderColor} ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <CheckCircle className={`w-5 h-5 ${section.iconColor} flex-shrink-0 mt-0.5`} />
                      <p className="text-slate-800 dark:text-slate-200 font-medium text-sm sm:text-base">
                        {section.note}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {section.type === 'list' && (
                <div className="space-y-4 relative z-10">
                  {section.content.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-4 p-4 rounded-xl bg-white/70 dark:bg-white/10 border-2 ${section.borderColor} ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center`}>
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        <p className="text-slate-800 dark:text-white font-semibold text-base">
                          {item.label}
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {section.type === 'list-simple' && (
                <div className={`${isRTL ? 'text-right' : 'text-left'} relative z-10`}>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg mb-4">
                    {section.content}
                  </p>
                  <ul className="space-y-3">
                    {section.list.map((item, idx) => (
                      <li key={idx} className={`flex items-center gap-3 text-slate-700 dark:text-slate-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <CheckCircle className={`w-5 h-5 ${section.iconColor} flex-shrink-0`} />
                        <span className="text-sm sm:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fadeUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}