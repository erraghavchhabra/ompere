"use client";

export default function FinalCTA({ data }: any) {
  return (
    <section className="pt-0 pb-20 bg-white relative overflow-hidden">
      <div
        className="max-w-7xl mx-auto px-6"
        dangerouslySetInnerHTML={{
          __html: data || "",
        }}
      />
    </section>
  );
}