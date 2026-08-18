import ContactHero from "../sections/contact/ContactHero";
import ContactInfo from "../sections/contact/ContactInfo";
import ContactCTA from "../sections/contact/ContactCTA";
import ContactForm from "../sections/contact/ContactForm";

export default function Contact() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0d071a]">
      <ContactHero />
      <ContactForm/>
      <ContactInfo />
      <ContactCTA />
    </main>
  );
}