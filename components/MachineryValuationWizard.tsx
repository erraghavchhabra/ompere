"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, ChevronDown, Upload, X, Loader2 } from "lucide-react";
import { API } from "@/lib/api";

interface MachineType {
  id: number | string;
  name: string;
}

interface Brand {
  id: number | string;
  name: string;
}

interface Canopy {
  id: number | string;
  name: string;
}

interface Capacity {
  id: number | string;
  kva: number | string;
}

interface PriceResult {
  status: boolean;
  price_new?: number | string | null;
  day2_price?: number | string | null;
  year?: number | string | null;
  year_factor?: number | null;
  hours_factor?: number | null;
  engine_factor?: number | null;
  estimated_price?: number | string | null;
  message?: string;
}

// ─── Inner component (uses useSearchParams) ───────────────────────────────────
function MachineryValuationWizardInner() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [uploadedPreviews, setUploadedPreviews] = useState<string[]>([]);

  // Name & phone from Hero modal query params
  const nameFromUrl = searchParams.get("name") ?? "";
  const phoneFromUrl = searchParams.get("phone") ?? "";

  // Step 1 form state — pre-filled from query params if present
  const [selectedMachineType, setSelectedMachineType] = useState(
    searchParams.get("machine_type_id") ?? ""
  );
  const [selectedBrand, setSelectedBrand] = useState(
    searchParams.get("brand_id") ?? ""
  );
  const [selectedCanopy, setSelectedCanopy] = useState(
    searchParams.get("canopy_id") ?? ""
  );
  const [selectedCapacity, setSelectedCapacity] = useState(
    searchParams.get("capacity_kva") ?? ""
  );

  // Step 2 state
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedHours, setSelectedHours] = useState("");
  const [selectedEngineCondition, setSelectedEngineCondition] = useState("");

  // Dynamic API data
  const [machineTypes, setMachineTypes] = useState<MachineType[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [capacities, setCapacities] = useState<Capacity[]>([]);
  const [canopies, setCanopies] = useState<Canopy[]>([]);
  const [loading, setLoading] = useState(true);

  // Calculate API state
  const [calculating, setCalculating] = useState(false);
  const [priceResult, setPriceResult] = useState<PriceResult | null>(null);
  const [calcError, setCalcError] = useState<string | null>(null);

  // Submit state
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        await Promise.all([
          fetch(API.machineTypes)
            .then((res) => res.json())
            .then(setMachineTypes)
            .catch((err) => console.error("machineTypes error:", err)),

          fetch(API.brands)
            .then((res) => res.json())
            .then(setBrands)
            .catch((err) => console.error("brands error:", err)),

          fetch(API.capacities)
            .then((res) => res.json())
            .then(setCapacities)
            .catch((err) => console.error("capacities error:", err)),

          fetch(API.canopies)
            .then((res) => res.json())
            .then(setCanopies)
            .catch((err) => console.error("canopies error:", err)),
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // Auto-trigger calculate when all required params came from the URL
  useEffect(() => {
    const brandFromUrl = searchParams.get("brand_id");
    const canopyFromUrl = searchParams.get("canopy_id");
    const capacityFromUrl = searchParams.get("capacity_kva");

    if (!loading && brandFromUrl && canopyFromUrl && capacityFromUrl) {
      autoCalculate(brandFromUrl, canopyFromUrl, capacityFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const autoCalculate = async (
    brand_id: string,
    canopy_id: string,
    capacity_kva: string
  ) => {
    setCalculating(true);
    try {
      const response = await fetch(API.calculate, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand_id, canopy_id, capacity_kva }),
      });
      const data: PriceResult = await response.json();
      setPriceResult(data);
    } catch (err) {
      console.error("Auto-calculate error:", err);
    } finally {
      setCalculating(false);
    }
  };

  // Format currency helper
  const formatCurrency = (value: number | string | null | undefined) => {
    if (value === null || value === undefined) return "₹0";
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "₹0";
    return `₹${num.toLocaleString("en-IN")}`;
  };

  // Step 1 → validate & get base price, advance to step 2
  const handleStep1Next = async () => {
    if (!selectedBrand || !selectedCanopy || !selectedCapacity) {
      setCalcError("Please select Brand, Canopy/Model, and Capacity.");
      return;
    }

    setCalcError(null);
    setCalculating(true);

    try {
      const response = await fetch(API.calculate, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand_id: selectedBrand,
          canopy_id: selectedCanopy,
          capacity_kva: selectedCapacity,
        }),
      });

      const data: PriceResult = await response.json();
      setPriceResult(data);

      if (!data.status) {
        setCalcError(data.message || "Price not found for selected options.");
      }
    } catch (err) {
      console.error("Calculate error:", err);
      setCalcError("Failed to fetch price. Please try again.");
    } finally {
      setCalculating(false);
    }

    setStep(2);
  };

  // Step 2 → re-call with year + hours + engine condition to get estimated_price
  const handleStep2Next = async () => {
    setCalcError(null);
    setCalculating(true);

    try {
      const body: Record<string, string> = {
        brand_id: selectedBrand,
        canopy_id: selectedCanopy,
        capacity_kva: selectedCapacity,
      };
      if (selectedYear) body.make_year = selectedYear;
      if (selectedHours) body.running_hours = selectedHours;
      if (selectedEngineCondition)
        body.engine_condition = selectedEngineCondition;

      const response = await fetch(API.calculate, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data: PriceResult = await response.json();
      setPriceResult(data);
    } catch (err) {
      console.error("Step 2 calculate error:", err);
    } finally {
      setCalculating(false);
    }

    setStep(3);
  };

  const prevStep = () => step > 1 && setStep(step - 1);

  const years = Array.from(
    { length: new Date().getFullYear() - 1999 },
    (_, i) => `${2000 + i}`
  ).reverse();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const remainingSlots = 3 - uploadedImages.length;
    const newFiles = Array.from(files).slice(0, remainingSlots);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setUploadedImages((prev) => [...prev, ...newFiles]);
    setUploadedPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    setUploadedPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Step 3 — submit all data to backend
  const handleSubmit = async () => {
    setSubmitError(null);
    setSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("name", nameFromUrl);
      formData.append("phone", phoneFromUrl);

      if (selectedMachineType)
        formData.append("machine_type_id", selectedMachineType);
      formData.append("brand_id", selectedBrand);
      formData.append("canopy_id", selectedCanopy);
      formData.append("capacity_kva", selectedCapacity);

      if (selectedYear) formData.append("make_year", selectedYear);
      if (selectedHours) formData.append("running_hours", selectedHours);
      if (selectedEngineCondition)
        formData.append("engine_condition", selectedEngineCondition);

      if (priceResult?.price_new != null)
        formData.append("price_new", String(priceResult.price_new));
      if (priceResult?.day2_price != null)
        formData.append("day2_price", String(priceResult.day2_price));
      if (priceResult?.estimated_price != null)
        formData.append(
          "estimated_price",
          String(priceResult.estimated_price)
        );
      if (priceResult?.year_factor != null)
        formData.append("year_factor", String(priceResult.year_factor));
      if (priceResult?.hours_factor != null)
        formData.append("hours_factor", String(priceResult.hours_factor));
      if (priceResult?.engine_factor != null)
        formData.append("engine_factor", String(priceResult.engine_factor));

      uploadedImages.forEach((file) => {
        formData.append("images[]", file);
      });

      const response = await fetch(API.valuationSubmit, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status) {
        setSubmitSuccess(true);
      } else {
        setSubmitError(data.message || "Submission failed. Please try again.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const SelectSkeleton = () => (
    <div className="w-full h-12 rounded-xl bg-gray-100 animate-pulse" />
  );

  // Success screen
  if (submitSuccess) {
    return (
      <section className="min-h-screen py-14 bg-gradient-to-b from-white to-orange-50/40 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-12 border border-orange-100 shadow-sm text-center max-w-md w-full mx-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">
            Request Submitted!
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Thank you, {nameFromUrl || "there"}! Our team will reach out to you
            at {phoneFromUrl || "your number"} shortly with your valuation
            report.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center h-12 px-8 bg-[#f07020] text-white rounded-xl font-semibold hover:bg-[#d85f14] transition"
          >
            Back to Home
          </a>
        </div>
      </section>
    );
  }

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
                      {loading ? (
                        <SelectSkeleton />
                      ) : (
                        <div className="relative">
                          <select
                            value={selectedMachineType}
                            onChange={(e) =>
                              setSelectedMachineType(e.target.value)
                            }
                            className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#f07020] appearance-none bg-white"
                          >
                            <option value="">Select Machine Type</option>
                            {machineTypes.map((type) => (
                              <option key={type.id} value={type.id}>
                                {type.name}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Brand */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          Brand <span className="text-red-500">*</span>
                        </label>
                        {loading ? (
                          <SelectSkeleton />
                        ) : (
                          <div className="relative">
                            <select
                              value={selectedBrand}
                              onChange={(e) =>
                                setSelectedBrand(e.target.value)
                              }
                              className={`w-full h-12 px-4 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-[#f07020] appearance-none bg-white ${
                                calcError && !selectedBrand
                                  ? "border-red-400"
                                  : "border-gray-200"
                              }`}
                            >
                              <option value="">Select Brand</option>
                              {brands.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                  {brand.name}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                          </div>
                        )}
                      </div>

                      {/* Canopy / Model */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          Canopy / Model{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        {loading ? (
                          <SelectSkeleton />
                        ) : (
                          <div className="relative">
                            <select
                              value={selectedCanopy}
                              onChange={(e) =>
                                setSelectedCanopy(e.target.value)
                              }
                              className={`w-full h-12 px-4 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-[#f07020] appearance-none bg-white ${
                                calcError && !selectedCanopy
                                  ? "border-red-400"
                                  : "border-gray-200"
                              }`}
                            >
                              <option value="">Select Option</option>
                              <optgroup label="Canopy Type">
                                {canopies.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                              </optgroup>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Capacity */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Capacity <span className="text-red-500">*</span>
                      </label>
                      {loading ? (
                        <SelectSkeleton />
                      ) : (
                        <div className="relative">
                          <select
                            value={selectedCapacity}
                            onChange={(e) =>
                              setSelectedCapacity(e.target.value)
                            }
                            className={`w-full h-12 px-4 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-[#f07020] appearance-none bg-white ${
                              calcError && !selectedCapacity
                                ? "border-red-400"
                                : "border-gray-200"
                            }`}
                          >
                            <option value="">Select Capacity</option>
                            {capacities.map((cap) => (
                              <option key={cap.id} value={cap.kva}>
                                {cap.kva} KVA
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                      )}
                    </div>

                    {calcError && (
                      <p className="text-sm text-red-500 -mt-1">{calcError}</p>
                    )}

                    <button
                      onClick={handleStep1Next}
                      disabled={calculating}
                      className="w-full h-12 bg-[#f07020] text-white rounded-xl font-semibold hover:bg-[#d85f14] transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {calculating ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Calculating...
                        </>
                      ) : (
                        "Next"
                      )}
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
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Year of Purchase
                      </label>
                      <div className="relative">
                        <select
                          value={selectedYear}
                          onChange={(e) => setSelectedYear(e.target.value)}
                          className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#f07020] appearance-none bg-white"
                        >
                          <option value="">Select Year</option>
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Running Hours
                      </label>
                      <div className="relative">
                        <select
                          value={selectedHours}
                          onChange={(e) => setSelectedHours(e.target.value)}
                          className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#f07020] appearance-none bg-white"
                        >
                          <option value="">Select Running Hours</option>
                          <option value="500">Less than 1,000 hrs</option>
                          <option value="1500">1,000 – 2,000 hrs</option>
                          <option value="2500">2,000 – 3,000 hrs</option>
                          <option value="3500">3,000 – 4,000 hrs</option>
                          <option value="5000">4,000 – 6,000 hrs</option>
                          <option value="7000">6,000 – 8,000 hrs</option>
                          <option value="9000">8,000 – 10,000 hrs</option>
                          <option value="10000">10,000+ hrs</option>
                          <option value="-1">Don&apos;t know</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Engine Condition
                      </label>
                      <div className="relative">
                        <select
                          value={selectedEngineCondition}
                          onChange={(e) =>
                            setSelectedEngineCondition(e.target.value)
                          }
                          className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#f07020] appearance-none bg-white"
                        >
                          <option value="">Select Engine Condition</option>
                          <option value="12.5">0–25% (Poor)</option>
                          <option value="38">26–50% (Average)</option>
                          <option value="63">51–75% (Good)</option>
                          <option value="88">76–100% (Very Good)</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={prevStep}
                        className="w-full h-12 border border-orange-200 text-gray-700 rounded-xl font-medium hover:bg-orange-50 transition"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleStep2Next}
                        disabled={calculating}
                        className="w-full h-12 bg-[#f07020] text-white rounded-xl font-semibold hover:bg-[#d85f14] transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {calculating ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Calculating...
                          </>
                        ) : (
                          "Next"
                        )}
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

                  {uploadedPreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                      {uploadedPreviews.map((preview, index) => (
                        <div
                          key={index}
                          className="relative rounded-2xl overflow-hidden border border-orange-100"
                        >
                          <img
                            src={preview}
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

                  {submitError && (
                    <p className="text-sm text-red-500 mt-4">{submitError}</p>
                  )}

                  <div className="flex gap-3 pt-6">
                    <button
                      onClick={prevStep}
                      disabled={submitting}
                      className="w-full h-12 border border-orange-200 text-gray-700 rounded-xl font-medium hover:bg-orange-50 transition disabled:opacity-60"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="w-full h-12 bg-[#f07020] text-white rounded-xl font-semibold hover:bg-[#d85f14] transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Get Price Estimate"
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white rounded-3xl p-8 border border-orange-100 shadow-sm h-full flex flex-col">
            {/* Estimated Range */}
            <div className="order-1 lg:order-2 mt-0 lg:mt-auto bg-gradient-to-b from-white to-orange-50/40 rounded-3xl p-6 border border-orange-100 mb-8 lg:mb-0">
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">
                Estimated Market Range
              </h3>

              {calculating && (
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <Loader2 className="w-4 h-4 animate-spin text-[#f07020]" />
                  Fetching price estimate...
                </div>
              )}

              {!calculating && priceResult && !priceResult.status && (
                <p className="text-sm text-red-500 mb-4">
                  {priceResult.message ||
                    "Price not found for selected options."}
                </p>
              )}

              {!calculating && priceResult?.status && step === 1 && (
                <>
                  <p className="text-xs text-gray-400 mb-3">
                    Base market price for selected model
                  </p>
                  <div className="flex justify-between text-lg font-semibold text-gray-900 mb-3">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 font-normal mb-0.5">
                        New Price ({priceResult.year})
                      </span>
                      <span className="text-[#f07020]">
                        {formatCurrency(priceResult.price_new)}
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-400 font-normal mb-0.5">
                        Day 2 Price
                      </span>
                      <span>{formatCurrency(priceResult.day2_price)}</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-gradient-to-r from-yellow-400 via-green-500 to-[#f07020]" />
                  <p className="text-xs text-gray-400 mt-3">
                    Complete Step 2 to refine with age &amp; hours.
                  </p>
                </>
              )}

              {!calculating && priceResult?.status && step >= 2 && (
                <>
                  <p className="text-xs text-gray-400 mb-3">
                    Adjusted for age, usage &amp; condition
                  </p>
                  <div className="flex justify-between text-sm text-gray-700 mb-2">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 mb-0.5">
                        New Price ({priceResult.year})
                      </span>
                      <span className="font-semibold">
                        {formatCurrency(priceResult.price_new)}
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-400 mb-0.5">
                        Day 2 Price
                      </span>
                      <span className="font-semibold">
                        {formatCurrency(priceResult.day2_price)}
                      </span>
                    </div>
                  </div>
                  <div className="h-px bg-orange-100 my-3" />
                  {priceResult.estimated_price &&
                    (() => {
                      const est =
                        typeof priceResult.estimated_price === "string"
                          ? parseFloat(priceResult.estimated_price)
                          : Number(priceResult.estimated_price);
                      const low = Math.round(est * 0.9);
                      const high = Math.round(est * 1.1);
                      return (
                        <div className="bg-orange-50 rounded-2xl px-4 py-4 mb-3">
                          <p className="text-xs text-gray-500 mb-3">
                            Estimated Resale Value
                          </p>
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex-1 bg-white rounded-xl px-4 py-3 border border-orange-100 text-center">
                              <p className="text-xs text-gray-400 mb-1">
                                Min Price
                              </p>
                              <p className="text-lg font-bold text-gray-800">
                                {formatCurrency(low)}
                              </p>
                              <div className="flex justify-center mt-1">
                                <svg
                                  width="14"
                                  height="8"
                                  viewBox="0 0 14 8"
                                  fill="none"
                                >
                                  <path
                                    d="M7 8L0 0H14L7 8Z"
                                    fill="#f07020"
                                    opacity="0.5"
                                  />
                                </svg>
                              </div>
                            </div>
                            <span className="text-gray-300 font-light text-xl">
                              —
                            </span>
                            <div className="flex-1 bg-white rounded-xl px-4 py-3 border border-orange-100 text-center">
                              <p className="text-xs text-gray-400 mb-1">
                                Max Price
                              </p>
                              <p className="text-lg font-bold text-[#f07020]">
                                {formatCurrency(high)}
                              </p>
                              <div className="flex justify-center mt-1">
                                <svg
                                  width="14"
                                  height="8"
                                  viewBox="0 0 14 8"
                                  fill="none"
                                >
                                  <path
                                    d="M7 8L0 0H14L7 8Z"
                                    fill="#f07020"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="text-right text-xs text-gray-400 space-y-0.5 mt-3">
                            {priceResult.year_factor && (
                              <p>
                                Age: ×{priceResult.year_factor.toFixed(2)}
                              </p>
                            )}
                            {priceResult.hours_factor && (
                              <p>
                                Hours: ×{priceResult.hours_factor.toFixed(2)}
                              </p>
                            )}
                            {priceResult.engine_factor && (
                              <p>
                                Engine:{" "}
                                ×{priceResult.engine_factor.toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  <div className="h-2 rounded-full bg-gradient-to-r from-yellow-400 via-green-500 to-[#f07020]" />
                  <p className="text-xs text-gray-400 mt-3">
                    Final price subject to physical inspection.
                  </p>
                </>
              )}

              {!calculating && !priceResult && (
                <>
                  <div className="flex justify-between text-lg font-semibold mb-3">
                    <span className="text-gray-200">₹—</span>
                    <span className="text-gray-200">₹—</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100" />
                  <p className="text-sm text-gray-400 mt-3">
                    Complete Step 1 to see price estimate.
                  </p>
                </>
              )}
            </div>

            {/* Why Choose Us */}
            <div className="order-2 lg:order-1 mb-8 lg:mb-0">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">
                Why Choose Us?
              </h2>
              <div className="space-y-5">
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

// ─── Loading fallback ─────────────────────────────────────────────────────────
function WizardFallback() {
  return (
    <section className="min-h-screen py-14 bg-gradient-to-b from-white to-orange-50/40 flex items-center justify-center">
      <div className="flex items-center gap-3 text-gray-400">
        <Loader2 className="w-5 h-5 animate-spin text-[#f07020]" />
        <span className="text-sm">Loading valuation wizard...</span>
      </div>
    </section>
  );
}

// ─── Public export — wrapped in Suspense ─────────────────────────────────────
export default function MachineryValuationWizard() {
  return (
    <Suspense fallback={<WizardFallback />}>
      <MachineryValuationWizardInner />
    </Suspense>
  );
}