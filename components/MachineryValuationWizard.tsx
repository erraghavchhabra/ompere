"use client";

import { useState } from "react";
import { CheckCircle, ChevronDown, Upload, X } from "lucide-react";

export default function MachineryValuationWizard() {
  const [step, setStep] = useState(1);
  const [selectedModel, setSelectedModel] = useState("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const nextStep = () => step < 3 && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  const machineTypes = [
    "Diesel Generator",
    "Industrial Generator",
    "Construction Equipment",
    "CNC Machine",
    "Boiler",
  ];

  const brands = [
    "Cummins",
    "Caterpillar",
    "Kirloskar",
    "Mahindra Powerol",
    "Ashok Leyland",
  ];

  const models = [
    "125 KVA",
    "250 KVA",
    "500 KVA",
    "Silent DG Set",
    "Industrial Pro X",
  ];

  const valuationData: Record<string, { min: string; max: string }> = {
    "125 KVA": { min: "₹2,50,000", max: "₹3,20,000" },
    "250 KVA": { min: "₹4,27,585", max: "₹4,53,764" },
    "500 KVA": { min: "₹7,80,000", max: "₹9,10,000" },
    "Silent DG Set": { min: "₹5,40,000", max: "₹6,25,000" },
    "Industrial Pro X": { min: "₹8,75,000", max: "₹10,20,000" },
  };
  const canopyTypes = ["Silent Canopy", "Open Type", "Acoustic Enclosure"];

  const capacities = [
    "15 KVA",
    "25 KVA",
    "62.5 KVA",
    "125 KVA",
    "250 KVA",
    "500 KVA",
    "1000 KVA",
  ];
  const years = Array.from(
    { length: new Date().getFullYear() - 1999 },
    (_, i) => `${2000 + i}`,
  ).reverse();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remainingSlots = 3 - uploadedImages.length;

    const newImages = Array.from(files)
      .slice(0, remainingSlots)
      .map((file) => URL.createObjectURL(file));

    setUploadedImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="min-h-screen py-14 bg-gradient-to-b from-white to-orange-50/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* LEFT FORM */}
          <div className="flex flex-col">
            {/* Stepper */}
            <div className="flex items-center flex-wrap gap-4 mb-6">
              {["Machine Type", "Condition", "Images"].map((label, index) => {
                const current = index + 1;

                return (
                  <div key={label} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition ${
                        step === current
                          ? "bg-[#f07020] text-white shadow-lg"
                          : "bg-white border border-orange-100 text-gray-600"
                      }`}
                    >
                      {current}
                    </div>

                    <span className="ml-3 text-sm font-medium text-gray-700">
                      {label}
                    </span>

                    {current < 3 && (
                      <div className="w-10 h-[2px] bg-orange-200 mx-4" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Main Card */}
            <div className="bg-white rounded-3xl p-8 border border-orange-100 shadow-sm flex-1">
              {/* STEP 1 */}
              {step === 1 && (
                <>
                  <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">
                    Price Calculator
                  </h2>

                  <div className="space-y-5">
                    {/* Machine Type */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Machine Type
                      </label>

                      <div className="relative">
                        <select className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#f07020] appearance-none bg-white">
                          <option>Select Machine Type</option>
                          {machineTypes.map((item) => (
                            <option key={item}>{item}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Brand */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          Brand
                        </label>

                        <div className="relative">
                          <select className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#f07020] appearance-none bg-white">
                            <option>Select Brand</option>
                            {brands.map((brand) => (
                              <option key={brand}>{brand}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        </div>
                      </div>

                      {/* Canopy / Model */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          Canopy / Model
                        </label>

                        <div className="relative">
                          <select
                            value={selectedModel}
                            onChange={(e) => setSelectedModel(e.target.value)}
                            className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#f07020] appearance-none bg-white"
                          >
                            <option value="">Select Option</option>

                            <optgroup label="Canopy Type">
                              {canopyTypes.map((type) => (
                                <option key={type}>{type}</option>
                              ))}
                            </optgroup>

                            <optgroup label="Models">
                              {models.map((model) => (
                                <option key={model}>{model}</option>
                              ))}
                            </optgroup>
                          </select>

                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        </div>
                      </div>
                    </div>
                    {/* Capacity */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Capacity
                      </label>

                      <div className="relative">
                        <select className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#f07020] appearance-none bg-white">
                          <option>Select Capacity</option>
                          {capacities.map((cap) => (
                            <option key={cap}>{cap}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      </div>
                    </div>

                    <button
                      onClick={nextStep}
                      className="w-full h-12 bg-[#f07020] text-white rounded-xl font-semibold hover:bg-[#d85f14] transition"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <>
                  <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">
                    What is the machinery condition?
                  </h2>

                  <div className="space-y-5">
                    {[
                      {
                        label: "Year of Purchase",
                        options: years,
                      },
                      {
                        label: "Running Hours",
                        options: [
                          "0 - 1,000 Hours",
                          "1,000 - 5,000 Hours",
                          "5,000 - 10,000 Hours",
                          "10,000+ Hours",
                        ],
                      },
                      {
                        label: "Engine Condition",
                        options: [
                          "0-25% (Poor)",
                          "26-50% (Average)",
                          "51-75% (Good)",
                          "76-100% (Very Good)",
                        ],
                      },
                    ].map((field) => (
                      <div key={field.label}>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          {field.label}
                        </label>

                        <div className="relative">
                          <select className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#f07020] appearance-none bg-white">
                            <option>Select {field.label}</option>
                            {field.options.map((option) => (
                              <option key={option}>{option}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={prevStep}
                        className="w-full h-12 border border-orange-200 text-gray-700 rounded-xl font-medium hover:bg-orange-50 transition"
                      >
                        Back
                      </button>

                      <button
                        onClick={nextStep}
                        className="w-full h-12 bg-[#f07020] text-white rounded-xl font-semibold hover:bg-[#d85f14] transition"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <>
                  <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">
                    Upload Machinery Images
                  </h2>

                  <div className="border-2 border-dashed border-orange-200 rounded-3xl p-8 text-center bg-orange-50/30">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="machinery-upload"
                    />

                    <label
                      htmlFor="machinery-upload"
                      className="cursor-pointer block"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f07020] to-[#ff9b5e] flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Upload className="w-6 h-6 text-white" />
                      </div>

                      <p className="text-gray-700 font-medium mb-2">
                        Upload up to 3 machinery images
                      </p>

                      <p className="text-sm text-gray-500 mb-4">
                        Clear images improve valuation accuracy
                      </p>

                      <span className="inline-flex h-11 px-6 items-center justify-center bg-[#f07020] text-white rounded-xl font-medium hover:bg-[#d85f14] transition">
                        Choose Images
                      </span>
                    </label>
                  </div>

                  {/* Preview Grid */}
                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                      {uploadedImages.map((image, index) => (
                        <div
                          key={index}
                          className="relative rounded-2xl overflow-hidden border border-orange-100"
                        >
                          <img
                            src={image}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-28 object-cover"
                          />

                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow"
                          >
                            <X className="w-4 h-4 text-gray-700" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3 pt-6">
                    <button
                      onClick={prevStep}
                      className="w-full h-12 border border-orange-200 text-gray-700 rounded-xl font-medium hover:bg-orange-50 transition"
                    >
                      Back
                    </button>

                    <button className="w-full h-12 bg-[#f07020] text-white rounded-xl font-semibold hover:bg-[#d85f14] transition">
                      Get Price Estimate
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white rounded-3xl p-8 border border-orange-100 shadow-sm h-full flex flex-col">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">
              Why Choose Us?
            </h2>

            <div className="space-y-5 mb-10">
              {[
                "Hassle-Free Machinery Selling Experience",
                "No Commission, No Brokerage",
                "Free On-Site Inspection",
                "Real-Time Market Linked Pricing",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#f07020] mt-0.5" />
                  <span className="text-gray-700 text-base leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-auto bg-gradient-to-b from-white to-orange-50/40 rounded-3xl p-6 border border-orange-100">
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-6">
                Estimated Market Range
              </h3>

              <div className="flex justify-between text-lg font-semibold text-gray-900 mb-3">
                <span>{valuationData[selectedModel]?.min || "₹0"}</span>
                <span>{valuationData[selectedModel]?.max || "₹0"}</span>
              </div>

              <div className="h-2 rounded-full bg-gradient-to-r from-yellow-400 via-green-500 to-[#f07020]" />

              <p className="text-sm text-gray-500 mt-4">
                Final price depends on condition, usage, and inspection.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#f07020]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
