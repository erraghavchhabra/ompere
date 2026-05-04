"use client";

export default function MissionVisionStory() {
  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="grid md:grid-cols-2 gap-10 relative items-stretch">
          {/* MISSION */}
          <div className="h-full bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-3xl p-8 shadow-sm space-y-4">
          

            <div className="">
              <h3 className="text-3xl font-semibold mb-6 text-gray-900">
                Our Mission
              </h3>

              <p className="text-gray-700 leading-relaxed">
                Our mission is to make selling used machinery fair, transparent,
                and environmentally responsible.
              </p>

              <div className="space-y-2 text-gray-700">
                <p>• Providing realistic, market-based price estimates</p>
                <p>• Encouraging asset reuse over premature scrapping</p>
                <p>• Conducting honest and structured inspections</p>
                <p>• Ensuring secure and GST-compliant transactions</p>
                <p>• Delivering reliable and timely payments</p>
                <p>• Supporting sellers with clarity at every step</p>
              </div>

              <p className="text-gray-700 leading-relaxed pt-2 border-t border-gray-100">
                By extending the lifecycle of industrial equipment, we reduce
                waste, conserve resources, and promote a circular economy within
                the industrial sector.
              </p>
            </div>
          </div>

          {/* VISION */}
          <div className="h-full bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-3xl p-8 shadow-sm space-y-4">
           

            <div className="">
              <h3 className="text-3xl font-semibold text-gray-900 mb-6">
                Our Vision
              </h3>

              <p className="text-gray-700 leading-relaxed">
                We envision a future where industrial assets are not undervalued
                or discarded prematurely — but professionally evaluated,
                responsibly reused, and traded with confidence.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Our goal is to become India’s most trusted platform for used
                industrial machinery while contributing to a more sustainable,
                efficient, and environmentally conscious industrial ecosystem.
              </p>

              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-gray-900 font-medium space-y-1">
                <p>A marketplace built on trust.</p>
                <p>Driven by transparency.</p>
                <p>Aligned with sustainability.</p>
              </div>
            </div>
          </div>
        </div>
        {/* STORY CARD (CTA STYLE LIKE YOUR REFERENCE) */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#f07020] via-[#e85f10] to-[#c84d08] text-white shadow-2xl">
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-black/10 rounded-full blur-3xl" />

          {/* CENTERED CONTENT */}
          <div className="relative z-10 px-6 py-12 md:py-16 max-w-5xl mx-auto text-center space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold">Our Story</h3>

            <p className="text-white/90 text-lg md:text-xl leading-relaxed">
              After 20+ years in the industrial machinery ecosystem, we observed
              a consistent challenge — the process of selling used equipment was
              unclear, undervalued, and often unfair.
            </p>

            {/* KEY PAIN POINTS AS PILLS */}
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 text-sm rounded-full bg-white/10 border border-white/20">
                Assets priced like scrap
              </span>
              <span className="px-3 py-1 text-sm rounded-full bg-white/10 border border-white/20">
                Lack of transparency
              </span>
              <span className="px-3 py-1 text-sm rounded-full bg-white/10 border border-white/20">
                Uncertain payments
              </span>
            </div>

            <p className="text-white/90 text-base md:text-lg leading-relaxed">
              We built this platform to change that. By combining deep industry
              expertise with technology-driven price discovery and structured
              inspections, we created a professional and transparent system for
              selling used machinery — ensuring fair valuation, compliant
              transactions, and secure payments.
            </p>

            <p className="mt-6 text-white font-semibold text-lg md:text-xl">
              We’re not just facilitating transactions — we’re building trust
              and enabling responsible reuse in India’s industrial ecosystem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
