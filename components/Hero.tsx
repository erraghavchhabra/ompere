"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/img/hero-banner.jpg"
        alt="Industrial Machinery"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0  bg-black/30" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* LEFT CALCULATOR */}
          <div className="lg:w-[30%] w-full flex-shrink-0">
            <div className="bg-white rounded-3xl shadow-2xl p-6 border border-white/20 backdrop-blur-sm">
              <h3 className="font-heading text-2xl font-bold text-[#1a1a1a] mb-4">
                Price Calculator
              </h3>

              <p className="text-gray-600 text-sm mb-6">
                Get an instant estimated market value for your machinery.
              </p>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Machine Type"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-[#f07020] outline-none"
                />

                <input
                  type="text"
                  placeholder="Brand / Model"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-[#f07020] outline-none"
                />

                <input
                  type="text"
                  placeholder="Year of Purchase"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:border-[#f07020] outline-none"
                />

                <button className="w-full bg-[#f07020] text-white py-3 rounded-xl font-medium hover:bg-[#d85f14] transition">
                  Calculate Price
                </button>
              </div>

              <Link
                href="/how-it-works"
                className="block mt-4 text-center text-sm text-[#f07020] font-medium hover:underline"
              >
                Learn How It Works →
              </Link>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="lg:w-[70%] w-full relative">
            <span className="inline-block bg-[#f07020] text-white text-sm px-4 py-2 rounded-full mb-5">
              India’s Trusted Industrial Marketplace
            </span>

            <h1 className="font-heading text-4xl md:text-5xl text-white font-bold leading-tight max-w-3xl mb-6">
              Sell Your Used DG Sets & Industrial Machinery at the Best Market
              Price
            </h1>

            <p className="text-lg text-gray-200 max-w-2xl leading-relaxed mb-8">
              Get instant price estimates, verified offers, and GST-compliant
              payouts through India’s most trusted machinery resale platform.
            </p>

            <div className="grid sm:grid-cols-2 text-white gap-4 mb-8 text-sm max-w-2xl">
              {[
                "Best Market Rates",
                "Zero Brokerage",
                "Scientific Inspection",
                "Fast Pickup & Payout",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#f07020]" />
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/sell"
                className="bg-[#f07020] hover:bg-[#d85f14] text-white px-5 py-3 rounded-full font-medium transition"
              >
                Get Instant Quote
              </Link>

              <Link
                href="/how-it-works"
                className="border text-white border-white hover:bg-white hover:text-black px-5 py-3 rounded-full font-medium transition"
              >
                Learn More
              </Link>
            </div>
            
          </div>
        </div>
      </div>
      <Image src="/assets/img/dg.png" alt="Industrial Machinery" width="350" height="350" className="absolute bottom-1 right-1" />
    </section>
  );
}
