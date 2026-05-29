import React from "react";

const statusToneClasses = {
  neutral: "status-neutral",
  orange: "status-orange",
  green: "status-green",
  blue: "status-blue",
};

export default function StatusBadge({ children, tone = "neutral" }) {
  return <span className={`status-badge ${statusToneClasses[tone]}`}>{children}</span>;
}
