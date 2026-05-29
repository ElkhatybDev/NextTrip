import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { footerBottomLinks, footerSections } from "../../data/siteNavigation";
import logo from "../../Assets/images/NextTrip logo.png";

function FooterItem({ item }) {
  if (!item.to) {
    return <span className="site-footer-static">{item.label}</span>;
  }

  return (
    <Link to={item.to} className="site-footer-link">
      {item.label}
    </Link>
  );
}

export default function Footer({
  description = "Smarter travel planning with trusted agencies, curated packages, and support that stays close to every trip.",
}) {
  return (
    <footer className="site-footer">
      <div className="site-shell site-footer-grid">
        <div>
          <Link to="/" className="site-footer-brand" aria-label="NextTrip home">
            <img src={logo} alt="NextTrip" className="site-footer-logo" />
          </Link>
          <p className="site-footer-brand-text">
            Curated travel planning with direct agency support and smoother booking flows.
          </p>
        </div>

        {footerSections.map((section) => (
          <div key={section.title}>
            <h4>{section.title}</h4>
            <div className="site-footer-links">
              {section.items.map((item) => (
                <FooterItem key={item.label} item={item} />
              ))}
            </div>
          </div>
        ))}

        <div>
          <h4>Newsletter</h4>
          <p className="site-footer-text site-footer-text-wide">{description}</p>
          <div className="site-footer-newsletter">
            <input placeholder="Enter your email" />
            <button type="button">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="site-shell site-footer-bottom">
        <p>(c) 2026 NextTrip. All rights reserved.</p>
        <div className="site-footer-bottom-links">
          {footerBottomLinks.map((item) => (
            <Link key={item.label} to={item.to} className="site-footer-link">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
