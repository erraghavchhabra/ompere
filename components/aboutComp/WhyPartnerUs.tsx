"use client";

import {
  Briefcase,
  ClipboardCheck,
  Users,
  FileCheck2,
  Zap,
} from "lucide-react";

export default function WhyPartnerUs() {
  const data = [
    {
      icon: Briefcase,
      content: `\tIndustry Expertise
With over 15 years of hands-on experience in the industrial and power equipment ecosystem, we understand how machinery is valued, operated, and traded.
We don’t rely on guesswork.
We rely on market insight, technical understanding, and real transaction data.`,
    },
    {
      icon: ClipboardCheck,
      content: `\tCertified Technical Evaluation
Every inspection is conducted using a structured, professional approach.
Our team evaluates equipment based on condition, performance, demand, and compliance ensuring fair and realistic price discovery.
No surface-level checks.
No random valuation.`,
    },
    {
      icon: Users,
      content: `\tStrong Buyer Network
Our growing network of verified industrial buyers helps ensure competitive and market-aligned offers.
We focus on connecting serious demand with genuine assets — leading to faster closures and better value realization.`,
    },
    {
      icon: FileCheck2,
      content: `\tTransparent & Compliant Process
From price estimation to final payment, everything is structured and documented.
GST-compliant transactions.
Secure bank transfers.
Clear paperwork.
No hidden surprises.`,
    },
    {
      icon: Zap,
      content: `\tFaster Payment Cycle
We understand that capital efficiency matters.
Once the offer is accepted and documentation is complete, payments are processed promptly — ensuring smooth and reliable closure.`,
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-orange-100/30 to-white py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight">
            Why Partner With Us
          </h2>

          <div className="mt-3 mx-auto w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>

          <p className="text-gray-500 mt-5 max-w-2xl mx-auto text-base md:text-lg">
            Built on experience, precision, and transparent industrial practices
          </p>
        </div>

        {/* TIMELINE */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-orange-200 via-gray-200 to-gray-100"></div>

          <div className="space-y-12">
            {data.map((item, i) => {
              const Icon = item.icon;

              // split heading + body safely
              const lines = item.content.split("\n");
              const title = lines[0].replace("\t", "");
              const body = lines.slice(1).join("\n");

              return (
                <div key={i} className="flex gap-6 group">

                  {/* ICON */}
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center group-hover:border-orange-300 transition">
                      <Icon className="w-5 h-5 text-orange-600" />
                    </div>
                  </div>

                  {/* CARD */}
                  <div className="w-full bg-white border border-gray-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition duration-300">

                    {/* HEADING (FIXED PROPERLY) */}
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                      {title}
                    </h3>

                    {/* BODY */}
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line text-[15px] md:text-base">
                      {body}
                    </p>

                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}