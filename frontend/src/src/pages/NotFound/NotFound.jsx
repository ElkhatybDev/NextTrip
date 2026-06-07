import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-shell">
      <Navbar />
      <main className="notfound-page">
        <div className="notfound-box">
          <h1 className="notfound-code">404</h1>

          <h2 className="notfound-title">Page Not Found</h2>

          <p className="notfound-text">
            The page you are looking for does not exist or has been moved.
          </p>

          <button type="button" onClick={() => navigate("/")} className="notfound-btn">
            Back to Home
          </button>

          <p className="notfound-footer">NextTrip (c) 2026</p>
        </div>
      </main>
    </div>
  );
}
