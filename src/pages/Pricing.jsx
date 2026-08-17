// src/pages/Pricing.jsx
import { useScrollReveal } from "../hooks/useScrollReveal";
import PricingHero from "../sections/pricing/PricingHero";
import PricingCards from "../sections/pricing/PricingCards";
import PricingCTA from "../sections/pricing/PricingCTA";
import PricingFaq from "../sections/pricing/PricingFaq";

export default function Pricing() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div ref={ref} className="min-h-screen bg-white dark:bg-[#0d071a]">
      <PricingHero />
      <PricingCards />
      <PricingFaq />
      <PricingCTA />
    </div>
  );
}