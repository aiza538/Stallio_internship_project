// src/pages/About.jsx
import AboutHero from "../sections/about/AboutHero";
import WhyWeExist from "../sections/about/WhyWeExist";
import WhatYouGet from "../sections/about/WhatYouGet";
import HowWeThink from "../sections/about/HowWeThink";
import SimpleFastCredible from "../sections/about/SimpleFastCredible";
import AboutValues from "../sections/about/AboutValues";
import AboutCTA from "../sections/about/AboutCTA";

export default function About() {
  return (
    <main>
      <AboutHero />
      <WhyWeExist />
      <WhatYouGet />
      <HowWeThink />
      <SimpleFastCredible />
      <AboutValues />
      <AboutCTA />
    </main>
  );
}