import React from "react";
import "./NotFound.css";

export default function NotFound() {
  const goHome = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  return (
    <div className="notfound-page">
      <div className="notfound-box">
        <h1 className="notfound-code">404</h1>

        <h2 className="notfound-title">Page Not Found</h2>

        <p className="notfound-text">
          The page you are looking for does not exist or has been moved.
        </p>

        <button onClick={goHome} className="notfound-btn">
          Back to Home
        </button>

        <p className="notfound-footer">NextTrip © 2026</p>
      </div>
    </div>
  );
}