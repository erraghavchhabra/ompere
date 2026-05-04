"use client";

export default function StatsBar() {
  const stats = [
    { value: "500+", label: "Gensets Sold" },
    { value: "300+", label: "Happy Clients" },
    { value: "15+", label: "Cities Covered" },
    { value: "48hrs", label: "Avg. Payment Time" },
  ];

  return (
    <section className="w-full bg-gradient-to-t from-orange-100/30 to-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          
          {stats.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition"
            >
              <h3 className="text-3xl font-bold text-orange-600">
                {item.value}
              </h3>
              <p className="text-sm text-gray-600 mt-2 font-medium">
                {item.label}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}