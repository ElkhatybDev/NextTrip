import React from "react";

const stats = [
  { value: "50K+", label: "Happy Travelers" },
  { value: "120+", label: "Agency Partners" },
  { value: "300+", label: "Curated Packages" },
  { value: "24/7", label: "Support" },
];

export default function StatsSection() {
  return (
    <section className="global-stats">
      {stats.map((item) => (
        <div key={item.label} className="global-stat">
          <h3>{item.value}</h3>
          <p>{item.label}</p>
        </div>
      ))}
    </section>
  );
}
