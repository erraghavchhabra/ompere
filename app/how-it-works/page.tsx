import Link from "next/link";
import type { Metadata } from "next";

import HowHeader from "@/components/HowComp/HowHeader";
import Steps from "@/components/HowComp/Steps";
import WhyProcess from "@/components/HowComp/WhyProcess";
import FAQ from "@/components/HowComp/FAQ";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Understand how our process works step by step",
};

export default function HowItWorksPage() {
  return (
    <main className="bg-white text-gray-900">
      <HowHeader />
      <Steps />
      <WhyProcess />
      <FAQ />


      <FinalCTA
       
      />
    </main>
  );
}