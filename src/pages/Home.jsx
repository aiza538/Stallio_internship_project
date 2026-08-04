export default function Home() {
  return (
    <section className="relative overflow-hidden bg-hero-glow-light dark:bg-hero-glow-dark">
      <div className="mx-auto flex max-w-content flex-col items-start gap-4 px-6 py-24 lg:px-10">
        <span className="font-mono text-xs uppercase tracking-widest text-brand-600 dark:text-brand-400">
          Week 1 · Foundation
        </span>
        <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-ink dark:text-white sm:text-5xl">
          Home page content lands here later this week.
        </h1>
        <p className="max-w-xl text-base text-slate-muted dark:text-slate-light">
          The navigation bar and footer above and below are wired up, responsive,
          theme-aware, and reusable across every route. Page content comes next.
        </p>
      </div>
    </section>
  );
}
