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
      className="relative inline-flex w-fit items-center text-xs text-slate-600 transition-colors duration-300 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
    >
      {children}

    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-indigo-200/30 bg-gradient-to-br from-indigo-50/60 via-purple-50/40 to-white/80 transition-colors duration-300 dark:border-indigo-800/20 dark:bg-gradient-to-br dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-slate-900/80">
      {/* Glow Effects */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-purple-500/6 to-transparent dark:from-indigo-400/15 dark:via-purple-400/8" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-400/15" />

      <div className="relative mx-auto max-w-content px-6 py-4 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center md:items-end md:pr-4">
            <div className="w-full max-w-lg">
              <Logo />
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300 text-center md:text-left">
                One link for your catalog and orders, so customers know where to buy and you stay organized.
              </p>
              <a
                href="#start-free"
                className="group mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-600 to-violet-600 px-4 py-1.5 text-xs font-medium text-white shadow-md shadow-brand-500/25 transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/40 hover:brightness-110"
              >
                Get Started Free
                <ArrowRight className="h-3.5 w-3.5 transition-none" strokeWidth={2} />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center md:items-start md:pl-4">
            <div className="w-full max-w-lg rounded-2xl border border-slate-200/60 bg-white/50 p-3.5 backdrop-blur-sm transition-all duration-300 hover:border-brand-500/30 hover:shadow-lg hover:shadow-brand-500/5 dark:border-white/10 dark:bg-white/5 dark:hover:border-brand-400/30">
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                CONTACT
              </h3>
              <a
                href="mailto:contact@stallio.shop"
                className="group mt-1 inline-flex items-center gap-1.5 text-sm text-slate-600 transition-colors duration-300 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
              >
                <Mail className="h-3.5 w-3.5 shrink-0 transition-none" strokeWidth={2} />
                <span className="break-all">contact@stallio.shop</span>
              </a>

              <div className="mt-1.5 flex items-center gap-2">
                {SOCIALS.map(({ label, short, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200/60 text-[10px] font-semibold text-slate-600 transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-brand-600 hover:to-violet-600 hover:text-white hover:shadow-md hover:shadow-brand-500/30 dark:border-white/10 dark:text-slate-300"
                  >
                    {short}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-4 flex flex-col items-center justify-center gap-1.5 border-t border-indigo-200/30 pt-3 dark:border-indigo-800/20">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {LEGAL_LINKS.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                <span className="text-[10px]">{link.label}</span>
              </FooterLink>
            ))}
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">
            © {year} Stallio, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}