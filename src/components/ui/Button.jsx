const VARIANTS = {
  primary:
    "bg-brand-gradient text-white shadow-md shadow-brand-500/25 hover:shadow-lg hover:shadow-brand-500/40 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
  outline:
    "border border-ink/15 text-ink hover:border-brand-400 hover:bg-brand-50 hover:text-brand-600 hover:-translate-y-0.5 active:translate-y-0 dark:border-white/15 dark:text-white dark:hover:border-brand-400 dark:hover:bg-white/5 dark:hover:text-brand-400 focus-visible:ring-2 focus-visible:ring-brand-500",
  ghost:
    "bg-transparent text-ink hover:bg-ink/5 dark:text-white dark:hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-brand-500",
};

export default function Button({
  as = "button",
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const Comp = as;
  return (
    <Comp
      className={`inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-snappy focus-visible:outline-none ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
}