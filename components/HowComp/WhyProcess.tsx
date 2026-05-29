"use client";

export default function WhyProcess({ data }: any) {
  return (
    <section className="w-full bg-gradient-to-t from-orange-100/30 to-orange-50 py-20">
      <div
        className="max-w-7xl mx-auto px-6"
        dangerouslySetInnerHTML={{
          __html: data || "",
        }}
      />
    </section>
  );
}