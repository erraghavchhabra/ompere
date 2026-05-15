"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { API } from "@/lib/api";

const heroSlides = [
  {
    image: "/assets/img/hero-banner1.png",
    badge: "India's Trusted Industrial Marketplace",
    title:
      "Sell Your Used DG Sets & Industrial Machinery at the Best Market Price",
    desc:
      "Get instant price estimates, verified offers, and GST-compliant payouts through India's most trusted machinery resale platform.",
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
    title:
      "Upgrade or Sell Heavy Equipment Quickly With Transparent Valuation",
    desc:
      "Connect with serious industrial buyers, get accurate inspections, and secure the best possible resale value without delays.",
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
    title:
      "Turn Idle Machinery Into Instant Capital With Hassle-Free Selling",
    desc:
      "From generators to industrial machines, unlock working capital with seamless pickup, secure payment, and end-to-end support.",
    points: [
      "Secure Transactions",
      "Easy Documentation",
      "Quick Pickup",
      "Trusted Platform",
    ],
  },
];

export default function Hero() {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  // MACHINE TYPE ALWAYS FIXED
  const selectedMachineType = "1";

  const [brands, setBrands] = useState<any[]>([]);
  const [canopyOptions, setCanopyOptions] = useState<any[]>([]);
  const [capacityOptions, setCapacityOptions] = useState<any[]>([]);

  const [loadingCanopy, setLoadingCanopy] = useState(false);
  const [loadingCapacity, setLoadingCapacity] = useState(false);

  // SHOW ALL DROPDOWNS INITIALLY
  const [showCanopy] = useState(true);
  const [showCapacity] = useState(true);

  const abortRef = useRef<AbortController | null>(null);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCanopy, setSelectedCanopy] = useState("");
  const [selectedCapacity, setSelectedCapacity] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetch(API.brands)
      .then((r) => r.json())
      .then(setBrands)
      .catch(console.error);
  }, []);

  // Cancel previous requests
  const cancelPreviousRequests = () => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  };

  // =========================================================
  // BRAND CHANGE
  // =========================================================
  const handleBrandChange = async (brandId: string) => {
    cancelPreviousRequests();

    setSelectedBrand(brandId);

    // RESET
    setSelectedCanopy("");
    setSelectedCapacity("");

    // Empty old data
    setCanopyOptions([]);
    setCapacityOptions([]);

    if (!brandId) return;

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setLoadingCanopy(true);

    try {
      const res = await fetch(
        `${API.priceMappingCanopies}?brand_id=${brandId}`,
        {
          signal: ctrl.signal,
        }
      );

      const canopies: any[] = await res.json();

      if (ctrl.signal.aborted) return;

      setLoadingCanopy(false);

      // Fill canopy dropdown
      setCanopyOptions(canopies || []);

      // Reset capacity again
      setCapacityOptions([]);
      setSelectedCapacity("");
    } catch (err: any) {
      if (err.name === "AbortError") return;

      console.error(err);

      setLoadingCanopy(false);

      setCanopyOptions([]);
      setCapacityOptions([]);
    }
  };

  // =========================================================
  // CANOPY CHANGE
  // =========================================================
  const handleCanopyChange = async (canopyId: string) => {
    cancelPreviousRequests();

    setSelectedCanopy(canopyId);

    // Reset capacity
    setSelectedCapacity("");
    setCapacityOptions([]);

    if (!canopyId) return;

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    await loadCapacities(selectedBrand, canopyId, ctrl);
  };

  // =========================================================
  // LOAD CAPACITIES
  // =========================================================
  const loadCapacities = async (
    brandId: string,
    canopyId: string,
    ctrl: AbortController
  ) => {
    setLoadingCapacity(true);

    try {
      let url = `${API.priceMappingCapacities}?brand_id=${brandId}`;

      if (canopyId) {
        url += `&canopy_id=${canopyId}`;
      }

      const res = await fetch(url, {
        signal: ctrl.signal,
      });

      const data: any[] = await res.json();

      if (ctrl.signal.aborted) return;

      setLoadingCapacity(false);

      // Fill capacity dropdown
      setCapacityOptions(data || []);
    } catch (err: any) {
      if (err.name === "AbortError") return;

      console.error(err);

      setLoadingCapacity(false);

      setCapacityOptions([]);
    }
  };

  const handleCalculateClick = () => {
    setShowModal(true);
  };

  const handleProceed = () => {
    const params = new URLSearchParams();

    // ALWAYS SEND MACHINE TYPE = 1
    params.set("machine_type_id", selectedMachineType);

    if (selectedBrand) {
      params.set("brand_id", selectedBrand);
    }

    if (selectedCanopy) {
      params.set("canopy_id", selectedCanopy);
    }

    if (selectedCapacity) {
      params.set("capacity_kva", selectedCapacity);
    }

    if (name) {
      params.set("name", name);
    }

    if (phone) {
      params.set("phone", phone);
    }

    router.push(`/machinery-valuation?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">

      {/* BACKGROUND */}
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

      <div className="absolute inset-0 bg-black/60 z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* CALCULATOR */}
          <div className="lg:w-[30%] w-full flex-shrink-0">

            <div className="bg-white rounded-3xl shadow-2xl p-6 border border-white/20 backdrop-blur-sm">

              <h3 className="font-heading text-2xl font-bold text-[#1a1a1a] mb-2">
                Price Calculator
              </h3>

              <p className="text-gray-600 text-sm mb-6">
                Get an instant estimated market value for your machinery.
              </p>

              <div className="space-y-4">

                {/* BRAND */}
                <select
                  value={selectedBrand}
                  onChange={(e) => handleBrandChange(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#f07020] outline-none bg-white"
                >
                  <option value="">Brand</option>

                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>

                {/* LOADING CANOPY */}
                {loadingCanopy && (
                  <p className="text-xs text-gray-400 text-center animate-pulse">
                    Checking options…
                  </p>
                )}

                {/* CANOPY */}
                {showCanopy && (
                  <select
                    value={selectedCanopy}
                    onChange={(e) => handleCanopyChange(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#f07020] outline-none bg-white"
                  >
                    <option value="">Select Canopy Type</option>

                    {canopyOptions.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                )}

                {/* LOADING CAPACITY */}
                {loadingCapacity && (
                  <p className="text-xs text-gray-400 text-center animate-pulse">
                    Loading capacities…
                  </p>
                )}

                {/* CAPACITY */}
                {showCapacity && (
                  <select
                    value={selectedCapacity}
                    onChange={(e) => setSelectedCapacity(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#f07020] outline-none bg-white"
                  >
                    <option value="">Select Capacity (KVA)</option>

                    {capacityOptions.map((cap) => (
                      <option key={cap.kva} value={cap.kva}>
                        {cap.kva} KVA
                      </option>
                    ))}
                  </select>
                )}

                {/* BUTTON */}
                <button
                  onClick={handleCalculateClick}
                  disabled={
                    !selectedBrand ||
                    !selectedCanopy ||
                    !selectedCapacity
                  }
                  className="w-full bg-[#f07020] text-white py-3 rounded-xl font-medium hover:bg-[#d85f14] transition disabled:opacity-40 disabled:cursor-not-allowed"
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

          {/* HERO CONTENT */}
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

      {/* MODAL */}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#f07020] outline-none"
              />

             <input
  type="tel"
  placeholder="Phone Number"
  value={phone}
  onChange={(e) => {
    // Allow only numbers
    const value = e.target.value.replace(/\D/g, "");

    // Optional: limit to 10 digits
    if (value.length <= 10) {
      setPhone(value);
    }
  }}
  inputMode="numeric"
  pattern="[0-9]*"
  maxLength={10}
  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#f07020] outline-none"
/>

              <button
                onClick={handleProceed}
                className="w-full bg-[#f07020] text-white py-3 rounded-xl font-medium hover:bg-[#d85f14] transition"
              >
                Proceed
              </button>

            </div>
          </div>
        </div>
      )}

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