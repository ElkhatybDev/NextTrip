import React from "react";

export default function SectionHeading({ label, title, desc, centered = true }) {
  return (
    <div className={centered ? "section-heading centered" : "section-heading"}>
      <div>
        <p className="section-label">{label}</p>
        <h2>{title}</h2>
      </div>
      {desc ? <p className="section-desc">{desc}</p> : null}
    </div>
  );
}
