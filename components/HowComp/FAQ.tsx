"use client";

export default function FAQ({ data }: any) {
  return (
    <section className="w-full bg-white py-24">
      <div
        className="max-w-5xl mx-auto px-6"
        dangerouslySetInnerHTML={{
          __html: data || "",
        }}
      />
    </section>
  );
}