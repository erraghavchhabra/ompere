"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { API } from "@/lib/api";

interface FormData {
  full_name: string;
  email: string;
  phone_number: string;
  company_name: string;
  brand: string;
  capacity_range: string;
  manufacturing_year: string;
  running_hours: string;
  condition: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const INITIAL_FORM: FormData = {
  full_name: "",
  email: "",
  phone_number: "",
  company_name: "",
  brand: "",
  capacity_range: "",
  manufacturing_year: "",
  running_hours: "",
  condition: "",
};

const validate = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};

  // Full Name
  if (!formData.full_name.trim()) {
    errors.full_name = "Full name is required.";
  } else if (formData.full_name.trim().length < 2) {
    errors.full_name = "Full name must be at least 2 characters.";
  }

  // Email
  if (!formData.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  // Phone Number
  if (!formData.phone_number.trim()) {
    errors.phone_number = "Phone number is required.";
  } else if (!/^\+?[0-9\s\-().]{7,15}$/.test(formData.phone_number.trim())) {
    errors.phone_number = "Enter a valid phone number.";
  }

  // Company Name — optional, no validation needed

  // Brand
  if (!formData.brand) {
    errors.brand = "Please select a brand.";
  }

  // Capacity Range
  if (!formData.capacity_range) {
    errors.capacity_range = "Please select a capacity range.";
  }

  // Manufacturing Year
  if (!formData.manufacturing_year) {
    errors.manufacturing_year = "Please select a manufacturing year.";
  }

  // Running Hours
  if (!formData.running_hours) {
    errors.running_hours = "Please select running hours.";
  }

  // Condition
  if (!formData.condition) {
    errors.condition = "Please select a condition.";
  }

  return errors;
};

export default function SellRight() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);

    // Re-validate the changed field if it was already touched
    if (touched[e.target.name as keyof FormData]) {
      const fieldErrors = validate(updated);
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: fieldErrors[e.target.name as keyof FormData] || undefined,
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name as keyof FormData;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validate(formData);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldErrors[name] || undefined,
    }));
  };

  const handleSubmit = async () => {
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {} as Record<keyof FormData, boolean>
    );
    setTouched(allTouched);

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {
      const response = await fetch(API.sellRequest, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.status) {
        alert("Thank you, we’ll contact you soon.” We will share business mail id soon");
        setFormData(INITIAL_FORM);
        setErrors({});
        setTouched({});
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }

    setLoading(false);
  };

  // Helper: returns red border class when field has an error
  const inputClass = (name: keyof FormData) =>
    `w-full h-14 px-5 rounded-2xl border text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 ${
      errors[name]
        ? "border-red-400 focus:ring-red-400"
        : "border-gray-200 focus:ring-[#f07020]"
    }`;

  const selectClass = (name: keyof FormData) =>
    `w-full h-14 px-5 rounded-2xl border appearance-none focus:outline-none focus:ring-1 bg-white ${
      errors[name]
        ? "border-red-400 focus:ring-red-400 text-gray-800"
        : "border-gray-200 focus:ring-[#f07020] text-gray-500"
    }`;

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

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="John Doe"
              className={inputClass("full_name")}
            />
            {errors.full_name && (
              <p className="mt-1 text-sm text-red-500">{errors.full_name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="john@example.com"
              className={inputClass("email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Phone Number *
            </label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="+91 98765 43210"
              className={inputClass("phone_number")}
            />
            {errors.phone_number && (
              <p className="mt-1 text-sm text-red-500">{errors.phone_number}</p>
            )}
          </div>

          {/* Company Name (optional) */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Company Name
            </label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              placeholder="Your Company"
              className={inputClass("company_name")}
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

          {/* Brand */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Brand *
            </label>
            <div className="relative">
              <select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                onBlur={handleBlur}
                className={selectClass("brand")}
              >
                <option value="">Select option</option>
                <option value="Caterpillar">Caterpillar</option>
                <option value="Cummins">Cummins</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            {errors.brand && (
              <p className="mt-1 text-sm text-red-500">{errors.brand}</p>
            )}
          </div>

          {/* Capacity Range */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Capacity Range *
            </label>
            <div className="relative">
              <select
                name="capacity_range"
                value={formData.capacity_range}
                onChange={handleChange}
                onBlur={handleBlur}
                className={selectClass("capacity_range")}
              >
                <option value="">Select option</option>
                <option value="125 KVA">125 KVA</option>
                <option value="250 KVA">250 KVA</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            {errors.capacity_range && (
              <p className="mt-1 text-sm text-red-500">{errors.capacity_range}</p>
            )}
          </div>

          {/* Manufacturing Year */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Manufacturing Year *
            </label>
            <div className="relative">
              <select
                name="manufacturing_year"
                value={formData.manufacturing_year}
                onChange={handleChange}
                onBlur={handleBlur}
                className={selectClass("manufacturing_year")}
              >
                <option value="">Select option</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            {errors.manufacturing_year && (
              <p className="mt-1 text-sm text-red-500">{errors.manufacturing_year}</p>
            )}
          </div>

          {/* Running Hours */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Running Hours *
            </label>
            <div className="relative">
              <select
                name="running_hours"
                value={formData.running_hours}
                onChange={handleChange}
                onBlur={handleBlur}
                className={selectClass("running_hours")}
              >
                <option value="">Select option</option>
                <option value="1000">1000</option>
                <option value="2000">2000</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            {errors.running_hours && (
              <p className="mt-1 text-sm text-red-500">{errors.running_hours}</p>
            )}
          </div>

          {/* Condition */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Condition *
            </label>
            <div className="relative">
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                onBlur={handleBlur}
                className={selectClass("condition")}
              >
                <option value="">Select condition</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Average">Average</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            {errors.condition && (
              <p className="mt-1 text-sm text-red-500">{errors.condition}</p>
            )}
          </div>

        </div>

        {/* CTA */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full h-14 mt-8 rounded-2xl bg-[#f07020] hover:bg-[#d85f14] text-white text-lg font-semibold transition shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Submit Information"}
        </button>

      </div>
    </div>
  );
}