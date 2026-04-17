"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-white/10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center mb-5">
              <Image
                src="/assets/img/logo-ft.svg"
                alt="Ompere Logo"
                width={180}
                height={50}
                priority
                className="h-auto"
              />
            </Link>

            <p className="text-white/70 leading-relaxed text-sm mb-6">
              India’s trusted marketplace for buying and selling used diesel
              generators. Get the best value with transparent dealings.
            </p>

            <div className="flex gap-3">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#f07020] flex items-center justify-center transition"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-5">Quick Links</h4>
            <div className="space-y-3 text-white/70">
              {[
                "Home",
                "About Us",
                "How It Works",
                "Sell Your DG",
                "Price Calculator",
                "Contact Us",
              ].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="block hover:text-[#f07020] transition"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal / Support */}
          <div>
            <h4 className="text-lg font-semibold mb-5">Legal & Support</h4>
            <div className="space-y-3 text-white/70">
              {[
                "Privacy Policy",
                "Terms & Conditions",
                "Refund Policy",
                "Cookie Policy",
                "Support Center",
                "FAQs",
              ].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="block hover:text-[#f07020] transition"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-5">Contact Us</h4>

            <div className="space-y-4 text-white/70 text-sm">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-[#f07020] flex-shrink-0 mt-0.5" />
                <span>
                  123 Industrial Area, Sector 5, Gurgaon, Haryana - 122001
                </span>
              </div>

              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-[#f07020] flex-shrink-0" />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-[#f07020] flex-shrink-0" />
                <span>info@ompere.com</span>
              </div>

              <div className="pt-2">
                <p className="text-white/50 text-xs">
                  Business Hours:
                  <br />
                  Mon-Sat: 9:00 AM - 6:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center text-sm text-white/50">
          © {new Date().getFullYear()} Ompere. All rights reserved.
        </div>
      </div>
    </footer>
  );
}