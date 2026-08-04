export default function About() {
  return (
    <section className="relative overflow-hidden bg-hero-glow-light dark:bg-hero-glow-dark">
      <div className="mx-auto flex max-w-content flex-col items-start gap-4 px-6 py-24 lg:px-10">
        <span className="font-mono text-xs uppercase tracking-widest text-brand-600 dark:text-brand-400">
          Week 1 · Foundation
        </span>
        <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-ink dark:text-white sm:text-5xl">
          About page content lands here later this week.
        </h1>
        <p className="max-w-xl text-base text-slate-muted dark:text-slate-light">
          Same shared Navbar and Footer, same design tokens — only the page body changes.
        </p>
      </div>
    </section>
  );
}
