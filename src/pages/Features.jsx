// src/pages/Features.jsx
import FeaturesHero from "../sections/features/FeaturesHero";
import FeaturesGrid from "../sections/features/FeaturesGrid";
import FeaturesCapabilities from "../sections/features/FeaturesCapabilities";
import FeaturesCTA from "../sections/features/FeaturesCTA";

export default function Features() {
  return (
    <main>
      <FeaturesHero />
      <FeaturesGrid />
      <FeaturesCapabilities />
      <FeaturesCTA />
    </main>
  );
}