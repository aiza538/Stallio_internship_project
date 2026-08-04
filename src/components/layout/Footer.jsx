import { ArrowRight, Mail } from "lucide-react";
import Logo from "../ui/Logo";

const SOCIALS = [
  { label: "X", short: "X", href: "#" },
  { label: "LinkedIn", short: "in", href: "#" },
  { label: "GitHub", short: "gh", href: "#" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Refund Policy", href: "#" },
];

function FooterLink({ href, children }) {
  return (
    <a
      href={href}
      className="group/link relative inline-flex w-fit items-center text-sm text-slate-600 transition-colors duration-300 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand-500 transition-all duration-300 group-hover/link:w-full" />
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-ink/10 bg-gradient-to-b from-white via-slate-50/50 to-white transition-colors duration-300 dark:border-white/10 dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900">
      {/* Background glow - same as content area */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-500/5 via-transparent to-transparent dark:from-brand-400/5" />
      
      {/* Secondary subtle glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-500/5 blur-3xl dark:bg-brand-400/5" />
      
      {/* Third glow for depth */}
      <div className="pointer-events-none absolute -bottom-40 right-1/2 h-64 w-64 translate-x-1/2 rounded-full bg-violet-500/5 blur-3xl dark:bg-violet-400/5" />

      <div className="relative mx-auto max-w-content px-6 py-14 lg:px-8">
        {/* Two column layout */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left Column - Brand */}
          <div className="space-y-4">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              One link for your catalog and orders, so customers know where to buy and you stay organized.
            </p>
            <a
              href="#start-free"
              className="group mt-2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-600 to-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-brand-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-500/40"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
            </a>
          </div>

          {/* Right Column - Contact & Social */}
          <div className="flex flex-col items-start justify-center md:items-end">
            <div className="w-full max-w-sm rounded-2xl border border-ink/10 bg-white/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-brand-500/30 hover:shadow-lg hover:shadow-brand-500/5 dark:border-white/10 dark:bg-white/5 dark:hover:border-brand-400/30">
              <h3 className="font-mono text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
                CONTACT
              </h3>
              <a
                href="mailto:contact@stallio.shop"
                className="group mt-3 flex items-center gap-2 text-sm text-slate-600 transition-colors duration-300 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
              >
                <Mail className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={2} />
                <span className="break-all">contact@stallio.shop</span>
              </a>

              <div className="mt-4 flex items-center gap-3">
                {SOCIALS.map(({ label, short, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-xs font-semibold text-slate-600 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-gradient-to-r hover:from-brand-600 hover:to-violet-600 hover:text-white hover:shadow-md hover:shadow-brand-500/30 dark:border-white/10 dark:text-slate-300"
                  >
                    {short}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Centered */}
        <div className="relative mt-12 flex flex-col items-center justify-center gap-4 border-t border-ink/10 pt-6 dark:border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {LEGAL_LINKS.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                <span className="text-xs">{link.label}</span>
              </FooterLink>
            ))}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            © {year} Stallio, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}