import Link from "next/link";
import type { Metadata } from "next";
import AboutHeader from "@/components/aboutComp/aboutHeader";
import AboutInfo from "@/components/aboutComp/aboutInfo";
import StatsBar from "@/components/aboutComp/StatsBar";
import MissionVisionStory from "@/components/aboutComp/MissionVisionStory";
import CoreValues from "@/components/aboutComp/CoreValues";
import WhyPartnerUs from "@/components/aboutComp/WhyPartnerUs";
WhyPartnerUs
export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about our company",
};

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-900">
      <AboutHeader />
      <AboutInfo />
      <StatsBar />
      <MissionVisionStory />
      <CoreValues />
      <WhyPartnerUs />
    </main>
  );
}
