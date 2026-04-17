"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Menu, X } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "I Want to Sell", href: "/sell" },
  { name: "I Want to Buy", href: "/buy" },
  { name: "Price Calculator", href: "/price-calculator" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* TOP BAR */}
      <div className="bg-[#1a1a1a] text-white text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 hover:text-[#f07020] transition"
            >
              <Phone size={15} />
              +1 234 567 890
            </a>
            <a
              href="mailto:info@example.com"
              className="flex items-center gap-2 hover:text-[#f07020] transition"
            >
              <Mail size={15} />
              info@example.com
            </a>
          </div>

          <div className="flex items-center gap-3">
            {[FaFacebookF, FaInstagram, FaLinkedinIn].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#f07020] hover:border-[#f07020] transition"
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* STICKY NAV */}
      <header
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300 ${
          isScrolled ? "shadow-lg" : "shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/img/logo.svg"
              alt="Ompere Logo"
              width={180}
              height={50}
              priority
              className="h-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-[15px] font-medium text-[#1a1a1a] hover:text-[#f07020] transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#f07020] after:transition-all hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="hidden lg:inline-flex bg-[#f07020] text-white px-5 py-3 rounded-full font-medium hover:bg-[#d85f14] transition"
          >
            Get Started
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? "max-h-[600px]" : "max-h-0"
          }`}
        >
          <div className="px-6 py-4 bg-white border-t border-gray-100 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-medium text-[#1a1a1a] hover:text-[#f07020]"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}
