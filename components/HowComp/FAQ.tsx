"use client";

import { useState } from "react";

export default function FAQ({ faqs = [] }: any) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
     <section className="w-full bg-white py-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* HEADER (your provided design) */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">FAQ</h2>

          <div className="mt-4 mx-auto w-32 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>

          <p className="text-gray-500 mt-6 text-lg md:text-xl">
            Frequently Asked Questions
          </p>
        </div>

        {faqs.map((item: any, index: number) => (
          <div key={index} className="border rounded-lg mb-3">

            <button
              className="w-full text-left p-4"
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            >
              {item.question}
            </button>

            {openIndex === index && (
              <div className="p-4 border-t">
                {item.answer}
              </div>
            )}

          </div>
        ))}

      </div>
    </section>
  );
}