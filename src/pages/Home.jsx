// src/pages/Home.jsx
import Hero from "../sections/Hero";
import WhoItFits from "../sections/WhoItFits";
import BeforeAfter from "../sections/BeforeAfter";
import HowItWorks from "../sections/HowItWorks";
import InsideTheBox from "../sections/InsideTheBox";
import WhatsIncluded from "../sections/WhatsIncluded";
import WhyItLands from "../sections/WhyItLands";  // ✅ New
import FinalCTA from "../sections/FinalCTA";      // ✅ New

export default function Home() {
  return (
    <main>
      <Hero />
      <WhoItFits />
      <BeforeAfter />
      <HowItWorks />
      <InsideTheBox />
      <WhatsIncluded />
      <WhyItLands />      {/* ✅ New Section */}
      <FinalCTA />        {/* ✅ New Section */}
    </main>
  );
}