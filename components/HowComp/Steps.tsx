"use client";

import {
  ClipboardList,
  FileText,
  Wrench,
  BadgeCheck,
  FileCheck2,
  Truck,
  CheckCircle2,
} from "lucide-react";

export default function Steps() {
  const steps = [
    {
      icon: ClipboardList,
      content: `Step 1: Submit Equipment Details   (2 Minutes)
Enter basic information in our price calculator:
•   Make / Brand
•   Capacity (KVA) / Model
•   Manufacturing Year
•   Running Hours
•   Current Condition
•   Location
✔ Get instant estimated price range
✔ No commitment required
CTA: Get Instant Estimate`,
    },
    {
      icon: FileText,
      content: `Step 2: Submit Detailed Information (5 Minutes)
Fill out the complete equipment form:
•   Upload photos (recommended-If not uploaded Previous)
•   Inspection availability (Mutual convenient time)
✔ Our team reviews within 4 hours`,
    },
    {
      icon: Wrench,
      content: `Step 3: Free Technical Inspection (1–2 Hours)
If the estimate matches your expectation:
•   Schedule inspection at your convenience
•   30-point technical evaluation
•   Load & performance testing
•   Documentation verification
✔ Transparent assessment
✔ No hidden deductions
CTA: Book Inspection`,
    },
    {
      icon: BadgeCheck,
      content: `Step 4: Receive Final Offer (Within 24 Hours)
After inspection, you receive:
•   Detailed valuation report
•   Final locked-in price
•   Offer valid for 3 days
•   Transparent price breakdown
✔ No last-minute negotiation
✔ No obligation to accept`,
    },
    {
      icon: FileCheck2,
      content: `Step 5: Accept & Complete Documentation (1–2 Days)
Once you accept:
•   Documentation assistance
•   Invoice & ownership verification
•   GST-compliant paperwork
•   Legal transfer support
✔ Smooth & professional process`,
    },
    {
      icon: Truck,
      content: `Step 6: Pickup & Payment
(Within 48 Hours-Depends on Location)
•   Execute Sale Agreement
•   Payment via NEFT / RTGS
•   Full payment (no installments)
•   Logistics handled by our team
✔ Crane, dismantling & transport arranged
✔ You don’t lift a finger`,
    },
  ];

  const renderLines = (lines) => {
    return lines.map((line, idx) => {
      if (line.startsWith("✔")) {
        return (
          <div key={idx} className="flex items-start gap-2 text-gray-700">
            <CheckCircle2 className="w-4 h-4 text-orange-500 mt-1 shrink-0" />
            <span className="text-[15px] md:text-base font-medium">
              {line.replace("✔", "").trim()}
            </span>
          </div>
        );
      }

      if (line.startsWith("•")) {
        return (
          <div key={idx} className="flex items-start gap-2 text-gray-700">
            <div className="w-1.5 h-1.5 mt-2 rounded-full bg-gray-400"></div>
            <span className="text-[15px] md:text-base">
              {line.replace("•", "").trim()}
            </span>
          </div>
        );
      }

      return (
        <p key={idx} className="text-gray-700 text-[15px] md:text-base">
          {line}
        </p>
      );
    });
  };

  return (
    <section className="w-full py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            6-Step Process to Sell Your Genset
          </h2>

          <div className="mt-4 mx-auto w-32 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>

          <p className="text-gray-500 mt-6 text-lg md:text-xl">
            Simple, transparent and structured selling process
          </p>
        </div>

        {/* STEPS */}
        <div className="space-y-8 md:space-y-10">

          {steps.map((step, i) => {
            const Icon = step.icon;

            const lines = step.content.split("\n");
            const title = lines[0];       // first line only
            const body = lines.slice(1);  // rest only

            return (
              <div key={i} className="flex gap-6">

                {/* STEP NUMBER */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 
                                  text-white flex items-center justify-center font-bold shadow-lg">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {i !== steps.length - 1 && (
                    <div className="w-px flex-1 bg-gradient-to-b from-orange-200 to-gray-200 mt-2"></div>
                  )}
                </div>

                {/* CARD */}
                <div className="w-full bg-white border border-gray-100 rounded-xl p-8 shadow-md">

                  {/* ICON */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-full bg-gradient-to-r from-orange-100 to-orange-200 border border-orange-300">
                      <Icon className="w-6 h-6 text-orange-600" />
                    </div>

                    {/* ONLY ONE HEADING (FIXED) */}
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                      {title}
                    </h3>
                  </div>

                  {/* CONTENT (NO DUPLICATE HEADING) */}
                  <div className="space-y-3">
                    {renderLines(body)}
                  </div>

                </div>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}