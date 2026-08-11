// src/pages/HowItWorks.jsx
import HowItWorksHero from "../sections/howitworks/HowItWorksHero";
import HowItWorksSteps from "../sections/howitworks/HowItWorksSteps";
import WhenYouAreLive from "../sections/howitworks/WhenYouAreLive"; 
import ShipTheLink from "../sections/howitworks/ShipTheLink";

export default function HowItWorks() {
  return (
    <main>
      <HowItWorksHero />
      <HowItWorksSteps />
      <WhenYouAreLive /> 
      <ShipTheLink />  
    </main>
  );
}