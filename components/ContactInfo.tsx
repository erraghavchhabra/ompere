"use client";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";

export default function ContactInfo() {
  const items = [
    {
      icon: Phone,
      title: "Phone",
      value: "+91 98765 43210",
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-100",
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@powergenmarketplace.com",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      icon: MapPin,
      title: "Address",
      value: "123 Industrial Area, Sector 5, Gurgaon, Haryana - 122001",
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-100",
    },
    {
      icon: Clock,
      title: "Business Hours",
      value: "Mon-Sat: 9:00 AM - 6:00 PM",
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
    },
  ];

  return (
    <section className="w-full  py-16">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {items.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition"
              >

                {/* ICON */}
                <div className="flex justify-center mb-4">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-lg border ${item.bg} ${item.border}`}>
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                </div>

                {/* TITLE */}
                <h3 className="text-md font-semibold text-gray-900 mb-1">
                  {item.title}
                </h3>

                {/* VALUE */}
                <p className="!text-sm text-gray-600 break-words">
                  {item.value}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}