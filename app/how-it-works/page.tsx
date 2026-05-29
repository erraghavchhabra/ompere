import type { Metadata } from "next";
import { API } from "@/lib/api";

import HowHeader from "@/components/HowComp/HowHeader";
import Steps from "@/components/HowComp/Steps";
import WhyProcess from "@/components/HowComp/WhyProcess";
import FAQ from "@/components/HowComp/FAQ";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Understand how our process works step by step",
};

async function getPage() {
  const response = await fetch(API.page("how-it-work"), {
    cache: "no-store",
  });

  const result = await response.json();

  return result.data;
}

export default async function HowItWorksPage() {
  const page = await getPage();

  return (
    <main className="bg-white text-gray-900">
  <HowHeader/>
      {page.sections?.map((section: any) => {
        switch (section.section_type) {

          case "steps":
            return (
              <Steps
                key={section.id}
                data={section.section_data}
              />
            );

          case "why_process":
            return (
              <WhyProcess
                key={section.id}
                data={section.section_data}
              />
            );

          case "faq":
            return (
              <FAQ
                key={section.id}
                data={section.section_data}
              />
            );

          case "final_cta":
            return (
              <FinalCTA
                key={section.id}
                data={section.section_data}
              />
            );

          default:
            return null;
        }
      })}

    </main>
  );
}