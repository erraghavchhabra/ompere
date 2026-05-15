// SellRight.tsx

"use client";

import { ChevronDown } from "lucide-react";

export default function SellRight() {
  return (
    <div className="bg-white rounded-3xl border border-orange-100 shadow-sm p-8 md:p-10">

      {/* Heading */}
      <h2 className="text-4xl font-bold text-[#1a1a1a] mb-10">
        Genset Information Form
      </h2>

      {/* Your Information */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-[#1a1a1a] mb-6">
          Your Information
        </h3>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Full Name *
            </label>

            <input
              type="text"
              placeholder="John Doe"
              className="w-full h-14 px-5 rounded-2xl border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#f07020]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Email *
            </label>

            <input
              type="email"
              placeholder="john@example.com"
              className="w-full h-14 px-5 rounded-2xl border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#f07020]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Phone Number *
            </label>

            <input
              type="text"
              placeholder="+91 98765 43210"
              className="w-full h-14 px-5 rounded-2xl border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#f07020]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Company Name
            </label>

            <input
              type="text"
              placeholder="Your Company"
              className="w-full h-14 px-5 rounded-2xl border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#f07020]"
            />
          </div>

        </div>
      </div>

      {/* Genset Details */}
      <div>

        <h3 className="text-2xl font-bold text-[#1a1a1a] mb-6">
          Genset Details
        </h3>

        <div className="grid md:grid-cols-2 gap-6">

          {[
            "Brand *",
            "Capacity Range *",
            "Manufacturing Year *",
            "Running Hours *",
          ].map((label) => (
            <div key={label}>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                {label}
              </label>

              <div className="relative">
                <select className="w-full h-14 px-5 rounded-2xl border border-gray-200 text-gray-500 appearance-none focus:outline-none focus:ring-1 focus:ring-[#f07020] bg-white">
                  <option>Select option</option>
                </select>

                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Condition *
            </label>

            <div className="relative">
              <select className="w-full h-14 px-5 rounded-2xl border border-gray-200 text-gray-500 appearance-none focus:outline-none focus:ring-1 focus:ring-[#f07020] bg-white">
                <option>Select condition</option>
              </select>

              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

        </div>

        {/* CTA */}
        <button className="w-full h-14 mt-8 rounded-2xl bg-[#f07020] hover:bg-[#d85f14] text-white text-lg font-semibold transition shadow-lg hover:shadow-xl">
          Submit Information
        </button>
      </div>
    </div>
  );
}