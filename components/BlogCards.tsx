"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

type Blog = {
  slug: string;
  image: string;
  date: string;
  title: string;
  description: string;
};

const blogs: Blog[] = [
  {
    slug: "maximize-used-machinery-value",
    image: "/assets/img/blog-1.jpg",
    date: "April 30, 2026",
    title: "How to Maximize the Resale Value of Used Industrial Machinery",
    description:
      "Discover practical strategies to improve machinery condition, timing, and valuation before selling for the highest possible return.",
  },
  {
    slug: "transparent-machinery-valuation",
    image: "/assets/img/blog-2.jpg",
    date: "April 26, 2026",
    title: "Why Transparent Machinery Valuation Matters More Than Ever",
    description:
      "Learn how data-driven pricing and market intelligence protect sellers from underpricing and ensure fair transactions.",
  },
  {
    slug: "inspection-checklist",
    image: "/assets/img/blog-3.jpg",
    date: "April 20, 2026",
    title: "The Complete On-Site Inspection Checklist Before You Sell",
    description:
      "A professional inspection can dramatically increase buyer trust and sale speed—here’s what experts evaluate first.",
  },
];

export default function BlogCards() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-orange-50/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
       

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <article
              key={index}
              className="group bg-white rounded-3xl overflow-hidden border border-orange-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Image */}
              <Link href={`/blogs/${blog.slug}`} className="block relative">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </Link>

              {/* Content */}
              <div className="p-6">
                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <CalendarDays className="w-4 h-4 text-[#f07020]" />
                  <span>{blog.date}</span>
                </div>

                {/* Title */}
                <Link href={`/blogs/${blog.slug}`}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#f07020] transition-colors duration-300 leading-snug">
                    {blog.title}
                  </h3>
                </Link>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-sm mb-6">
                  {blog.description}
                </p>

                {/* Button */}
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="inline-flex items-center gap-2 text-[#f07020] font-semibold hover:gap-3 transition-all duration-300"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#f07020]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}