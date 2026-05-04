"use client";
import Image from "next/image";
export default function AboutInfo() {
  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            About Us
          </h2>
          <div className="mt-3 w-16 h-1 bg-orange-500 rounded-full" />
        </div>
        <div className="space-y-4 leading-relaxed text-gray-700 mb-10">
          <p>
            Selling used industrial machinery shouldn’t feel confusing, risky,
            or unfair — but for years, that has been the reality of the market.
          </p>

          <p>
            Unclear pricing structures, scrap-based valuations, last-minute
            deductions, delayed payments, and missing documentation are common
            challenges across the industry.
          </p>

          <p>
            With over 25+ years of experience in the industrial and machinery
            ecosystem, we have worked closely with plant owners, manufacturers,
            and infrastructure businesses across India. This exposure led to one
            clear insight: the industry needs a more transparent and structured
            way to sell equipment.
          </p>

          <p>
            That is why we built a solution focused on fairness, clarity, and
            professionalism.
          </p>

          <p>
            Our platform enables the sale of used gensets and industrial
            machinery through a structured evaluation process based on
            performance, condition, demand, and real market value — not just
            scrap weight.
          </p>
        </div>
        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* LEFT CONTENT */}
          <div className="space-y-6 text-gray-700 leading-relaxed">
            {/* PREMIUM HIGHLIGHT BLOCK */}
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 space-y-2 text-gray-900 font-medium">
              <p className="text-orange-700 font-semibold mb-2">
                Our Commitment
              </p>
              <p>No confusion.</p>
              <p>No hidden surprises.</p>
              <p>No unnecessary stress.</p>
            </div>

            <p>
              Just a structured, transparent process that ensures industrial
              assets continue to deliver value efficiently and responsibly.
            </p>

            <p className="font-medium text-gray-900">
              We are not just building a platform.
            </p>

            <p className="font-semibold text-gray-900 text-lg">
              We are building trust.
            </p>

            <p>
              And contributing to a more sustainable future for industrial
              assets.
            </p>
            {/* Small Info Card */}
            <div className="mt-6 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <p className="text-sm text-gray-600">
                Responsible reuse of industrial machinery reduces waste and
                increases asset value recovery across industries.
              </p>
            </div>
          </div>

          {/* RIGHT IMAGE SECTION */}
          <div className="relative">
            <div className="sticky top-24">
              {/* Image Card */}
              <div className="relative overflow-hidden">
                <Image
                  src="/assets/img/dg-3.png"
                  alt="Used Genset Valuation"
                  width={700}
                  height={700}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
