import React from "react";
import { analyticsCards, monthlyPerformance } from "../../../data/dashboardContent";
import SectionTitle from "./SectionTitle";

export default function AnalyticsSection() {
  return (
    <section className="analytics-grid">
      {analyticsCards.map((item) => (
        <div key={item.label} className="analytics-card">
          <p>{item.label}</p>
          <h3>{item.value}</h3>
          <small>{item.note}</small>
        </div>
      ))}

      <div className="analytics-chart-card">
        <SectionTitle
          title="Monthly performance"
          subtitle="A simple visual overview of your agency activity"
        />
        <div className="analytics-chart">
          {monthlyPerformance.map((height, index) => (
            <div key={index} className="chart-bar" style={{ height: `${height}px` }} />
          ))}
        </div>
      </div>
    </section>
  );
}
