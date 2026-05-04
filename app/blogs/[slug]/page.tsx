import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";
import { blogData } from "@/lib/blogData";

export async function generateStaticParams() {
  return blogData.map((blog) => ({
    slug: blog.slug,
  }));
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  const blog = blogData.find((post) => post.slug === slug);

  if (!blog) {
    notFound();
  }

  // Other blogs except current one
  const otherBlogs = blogData.filter((post) => post.slug !== slug);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-orange-50/40 relative overflow-hidden">
      {/* Hero Section */}
      <section className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Back Button */}
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-[#f07020] font-semibold mb-10 hover:gap-3 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </Link>

          {/* Main Layout */}
          <div className="grid lg:grid-cols-3 gap-10">
            {/* LEFT CONTENT */}
            <div className="lg:col-span-2">
              {/* Date */}
              <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
                <CalendarDays className="w-4 h-4 text-[#f07020]" />
                <span>{blog.date}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-8">
                {blog.title}
              </h1>

              {/* Featured Image */}
              <div className="relative w-full h-[320px] md:h-[520px] rounded-3xl overflow-hidden shadow-xl border border-orange-100 mb-10">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Content Card */}
              <article className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-orange-100">
                {/* Description */}
                <p className="text-xl text-gray-700 leading-relaxed mb-8 border-l-4 border-[#f07020] pl-5">
                  {blog.description}
                </p>

                {/* Content */}
                <div className="space-y-7">
                  {blog.content.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-gray-700 text-lg leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Sidebar Card */}
                <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Other Blogs
                  </h3>

                  <div className="w-14 h-[3px] bg-[#f07020] mb-6 rounded-full" />

                  <div className="space-y-6">
                    {otherBlogs.map((post, index) => (
                      <Link
                        key={index}
                        href={`/blogs/${post.slug}`}
                        className="group block"
                      >
                        <div className="flex gap-4">
                          {/* Thumbnail */}
                          <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-orange-100">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>

                          {/* Text */}
                          <div className="flex-1">
                            <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                              <CalendarDays className="w-3 h-3 text-[#f07020]" />
                              {post.date}
                            </p>

                            <h4 className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-[#f07020] transition-colors duration-300 line-clamp-3">
                              {post.title}
                            </h4>

                            <span className="inline-flex items-center gap-1 text-[#f07020] text-sm font-medium mt-2">
                              Read
                              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                          </div>
                        </div>

                        {/* Divider */}
                        {index !== otherBlogs.length - 1 && (
                          <div className="border-b border-orange-100 mt-6" />
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#f07020]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />
    </main>
  );
}