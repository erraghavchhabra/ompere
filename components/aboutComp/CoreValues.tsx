"use client";

import {
  Users,
  BadgeDollarSign,
  ShieldCheck,
  Eye,
} from "lucide-react";

export default function CoreValues() {
  const values = [
    {
      title: "Customer First",
      icon: Users,
      desc: `Every decision we make starts with one question — is this fair and clear for the customer?
We design our process to be simple, structured, and supportive. From the first price estimate to final payment, we ensure you feel informed, respected, and confident at every step.
Your asset.
Your decision.
Your comfort comes first.`,
      pills: ["Fair process", "Customer trust"],
    },
    {
      title: "Fair Pricing",
      icon: BadgeDollarSign,
      desc: `Machinery is an asset — not just scrap.
Our valuation is based on real market demand, technical condition, performance, and utility — not arbitrary negotiation tactics. We provide realistic, market-aligned price ranges so you understand what your equipment is truly worth.
No low-ball offers.
No random deductions.`,
      pills: ["Market-based value", "No hidden cuts"],
    },
    {
      title: "Compliance",
      icon: ShieldCheck,
      desc: `Professional transactions protect everyone.
We follow structured documentation, GST-compliant processes, and secure payment methods. Every transaction is handled responsibly, ensuring legal clarity and financial safety.
Clear paperwork.
Secure transfers.
Accountable execution.`,
      pills: ["GST compliant", "Secure payments"],
    },
    {
      title: "Transparency",
      icon: Eye,
      desc: `Clarity builds trust.
We explain how pricing is calculated, how inspections are conducted, and what happens next. There are no hidden charges, no last-minute surprises, and no confusing terms.
What we offer is what we stand by.`,
      pills: ["No hidden charges", "Clear process"],
    },
  ];

  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Our Core Values
          </h2>
          <p className="text-gray-500 mt-2">
            Principles that guide every decision we make
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-6">

          {values.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition space-y-4"
              >

                {/* ICON + TITLE */}
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-orange-50 border border-orange-100">
                    <Icon className="w-5 h-5 text-orange-600" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                </div>

                {/* DESCRIPTION */}
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {item.desc}
                </p>

                {/* PILLS */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.pills.map((pill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs rounded-full bg-orange-50 border border-orange-200 text-gray-700"
                    >
                      {pill}
                    </span>
                  ))}
                </div>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}