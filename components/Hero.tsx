"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const heroSlides = [
  {
    image: "/assets/img/hero-banner1.png",
    badge: "India’s Trusted Industrial Marketplace",
    title:
      "Sell Your Used DG Sets & Industrial Machinery at the Best Market Price",
    desc: "Get instant price estimates, verified offers, and GST-compliant payouts through India’s most trusted machinery resale platform.",
    points: [
      "Best Market Rates",
      "Zero Brokerage",
      "Scientific Inspection",
      "Fast Pickup & Payout",
    ],
  },
  {
    image: "/assets/img/hero-banner2.jpg",
    badge: "Verified Machinery Buyers Across India",
    title: "Upgrade or Sell Heavy Equipment Quickly With Transparent Valuation",
    desc: "Connect with serious industrial buyers, get accurate inspections, and secure the best possible resale value without delays.",
    points: [
      "Verified Buyers",
      "Pan India Reach",
      "Quick Inspection",
      "Instant Offers",
    ],
  },
  {
    image: "/assets/img/hero-banner3.png",
    badge: "Fast, Secure & Reliable",
    title: "Turn Idle Machinery Into Instant Capital With Hassle-Free Selling",
    desc: "From generators to industrial machines, unlock working capital with seamless pickup, secure payment, and end-to-end support.",
    points: [
      "Secure Transactions",
      "Easy Documentation",
      "Quick Pickup",
      "Trusted Platform",
    ],
  },
];

const machineTypes = [
  "Diesel Generator",
  "Industrial Generator",
  "Silent DG Set",
  "Gas Generator",
  "Heavy Machinery",
];

const brands = [
  "Caterpillar",
  "Cummins",
  "Kirloskar",
  "Mahindra Powerol",
  "Ashok Leyland",
];

const models = [
  "CAT DG 125 KVA",
  "Cummins C250D5",
  "Kirloskar KG1-62.5",
  "Mahindra MPower 160",
  "AL DG 250",
];
const capacities = [
  "15 KVA",
  "25 KVA",
  "62.5 KVA",
  "125 KVA",
  "250 KVA",
  "500 KVA",
  "1000 KVA",
];

const canopyTypes = [
  "Silent Canopy",
  "Open Type",
  "Acoustic Enclosure",
];

export default function Hero() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        <div className="hero-slider">
          {heroSlides.map((slide, index) => (
            <div key={index} className="slide">
              <Image
                src={slide.image}
                alt={`Industrial Machinery ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* LEFT CALCULATOR (STATIC) */}
          <div className="lg:w-[30%] w-full flex-shrink-0">
            <div className="bg-white rounded-3xl shadow-2xl p-6 border border-white/20 backdrop-blur-sm">
              <h3 className="font-heading text-2xl font-bold text-[#1a1a1a] mb-4">
                Price Calculator
              </h3>

              <p className="text-gray-600 text-sm mb-6">
                Get an instant estimated market value for your machinery.
              </p>

              <div className="space-y-4">
                {/* Machine Type */}
                <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#f07020] outline-none bg-white">
                  <option value="">Machine Type</option>
                  {machineTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                {/* Brand */}
                <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#f07020] outline-none bg-white">
                  <option value="">Brand</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>

                {/* Canopy / Model */}
                <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#f07020] outline-none bg-white">
                  <option value="">Canopy / Model</option>

                  <optgroup label="Canopy Type">
                    {canopyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </optgroup>

                  <optgroup label="Models">
                    {models.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </optgroup>
                </select>

                {/* Capacity */}
                <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#f07020] outline-none bg-white">
                  <option value="">Capacity</option>
                  {capacities.map((cap) => (
                    <option key={cap} value={cap}>
                      {cap}
                    </option>
                  ))}
                </select>

             
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full bg-[#f07020] text-white py-3 rounded-xl font-medium hover:bg-[#d85f14] transition"
                >
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

          {/* RIGHT CONTENT (CHANGING) */}
          <div className="lg:w-[70%] w-full relative min-h-[420px]">
            <div className="content-slider">
              {heroSlides.map((slide, index) => (
                <div key={index} className="content-slide">
                  <span className="inline-block bg-[#f07020] text-white text-sm px-4 py-2 rounded-full mb-5">
                    {slide.badge}
                  </span>

                  <h1 className="font-heading text-4xl md:text-5xl text-white font-bold leading-tight max-w-3xl mb-6">
                    {slide.title}
                  </h1>

                  <p className="text-lg text-gray-200 max-w-2xl leading-relaxed mb-8">
                    {slide.desc}
                  </p>

                  <div className="grid sm:grid-cols-2 text-white gap-4 mb-8 text-sm max-w-2xl">
                    {slide.points.map((item) => (
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
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 relative shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
            >
              ×
            </button>

            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3">
              Complete Your Request
            </h3>

            <p className="text-gray-600 text-sm mb-6">
              Enter your details to proceed with your instant price estimate.
            </p>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#f07020] outline-none"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#f07020] outline-none"
              />

              <Link href="/machinery-valuation">
                <button className="w-full bg-[#f07020] text-white py-3 rounded-xl font-medium hover:bg-[#d85f14] transition">
                  Proceed
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Slider Styles */}
      <style jsx>{`
        .hero-slider,
        .content-slider {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .slide,
        .content-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          animation: fadeSlider 12s infinite;
        }

        .slide:nth-child(1),
        .content-slide:nth-child(1) {
          animation-delay: 0s;
        }

        .slide:nth-child(2),
        .content-slide:nth-child(2) {
          animation-delay: 4s;
        }

        .slide:nth-child(3),
        .content-slide:nth-child(3) {
          animation-delay: 8s;
        }

        @keyframes fadeSlider {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }

          8% {
            opacity: 1;
            transform: translateY(0);
          }

          30% {
            opacity: 1;
            transform: translateY(0);
          }

          38% {
            opacity: 0;
            transform: translateY(-20px);
          }

          100% {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
      `}</style>
    </section>
  );
}
