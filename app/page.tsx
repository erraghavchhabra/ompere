import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import ValueSection from "@/components/ValueSection";
import ComparisonSection from "@/components/ComparisonSection";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import MessagingHighlights from "@/components/MessagingHighlights";
export default function Home() {
  return (
    <>
      <Hero />
      <WhyUs />
      <ValueSection />
      <ComparisonSection />
      <HowItWorks />
      <Testimonials />
      <MessagingHighlights />
      <FinalCTA />

    </>
  );
}