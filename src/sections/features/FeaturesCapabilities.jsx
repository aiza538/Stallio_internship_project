import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function FeaturesCapabilities() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute -bottom-20 right-0 h-[30rem] w-[30rem] rounded-full bg-purple-400/8 blur-3xl dark:bg-purple-400/12" />
      
      <div className={`relative mx-auto max-w-content scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="text-center">
          <span className="mb-3 inline-block font-mono text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            What You Get
          </span>
          <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
            Capabilities that <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-purple-400">stay out of your way</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Built for sellers who already have buyers, not for teams managing DNS, plugins, and payment gateways.
          </p>
        </div>
      </div>
    </section>
  );
}