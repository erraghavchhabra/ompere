"use client";
import ContactInfo from "@/components/ContactInfo";
export default function Contact() {
  return (
    <>
      <section className=" py-16 bg-gradient-to-t from-orange-100/30 to-white relative overflow-hidden">
        {/* Subtle Background Accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            {/* Small Label */}
            <p className="text-sm font-semibold tracking-widest text-[#f07020] uppercase mb-4">
              Contact Us
            </p>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
              Get in Touch With Us
            </h1>

            {/* Divider */}
            <div className="w-16 h-[3px] bg-[#f07020] mx-auto mb-6" />

            {/* Description */}
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Have questions? We're here to help. Reach out and we'll respond as
              soon as possible.
            </p>
          </div>
        </div>
      </section>
      <ContactInfo />
      {/* CONTACT FORM + MAP */}
      <section className="w-full py-20 bg-gradient-to-t from-white to-orange-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* LEFT SIDE - FORM */}
            <div className="bg-white shadow-xl rounded-2xl p-10 border border-orange-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Contact Us
              </h2>

              <form className="space-y-5">
                {/* Name */}
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#f07020]"
                />

                {/* Contact */}
                <input
                  type="text"
                  placeholder="Contact Number"
                  className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#f07020]"
                />

                {/* Location */}
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#f07020]"
                />

                {/* Email */}
                <input
                  type="email"
                  placeholder="Email ID"
                  className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#f07020]"
                />

                {/* Message */}
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#f07020]"
                />
{/* Availability */}
<div className="space-y-4">

  <p className="font-semibold text-gray-800">
    Best Time to Contact You
  </p>

  {/* Availability Type */}
  <select className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#f07020]">
    <option>Anytime</option>
    <option>Office Hours</option>
    <option>Morning Slot</option>
    <option>Afternoon Slot</option>
    <option>Evening Slot</option>
    <option>Custom Time Range</option>
  </select>

  {/* Time Range */}
  <div className="space-y-2">
    <p className="text-sm text-gray-600">
      If you selected "Custom Time Range", specify below:
    </p>

    <div className="grid grid-cols-2 gap-3">
      <input
        type="time"
        className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#f07020]"
      />

      <input
        type="time"
        className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#f07020]"
      />
    </div>
  </div>

</div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#f07020] hover:bg-[#d95f16] text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* RIGHT SIDE - MAP */}
            <div className="rounded-2xl overflow-hidden shadow-xl border border-orange-100 h-full min-h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=123+Industrial+Area,+Sector+5,+Gurgaon,+Haryana+-+122001"
                className="w-full h-full min-h-[500px]"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
