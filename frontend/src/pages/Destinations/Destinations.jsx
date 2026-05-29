import React, { useMemo, useState } from "react";
import { ArrowRight, MapPin, Play, Search, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { destinationCities, destinationFilters } from "../../data/destinationsContent";
import CityDetailModal from "./components/CityDetailModal";
import "./Destinations.css";

export default function Destinations() {
  const [activeRegion, setActiveRegion] = useState("All");
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);

  const filteredCities = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return destinationCities.filter((city) => {
      const matchesRegion = activeRegion === "All" || city.region.includes(activeRegion);
      const matchesQuery =
        !normalizedQuery ||
        [city.name, city.country, city.region, city.mood].some((value) =>
          value.toLowerCase().includes(normalizedQuery)
        );

      return matchesRegion && matchesQuery;
    });
  }, [activeRegion, query]);

  return (
    <div className="destinations-page">
      <Navbar />

      <main>
        <section className="destinations-hero">
          <div className="site-shell destinations-hero-grid">
            <div className="destinations-hero-copy">
              <p className="destinations-eyebrow">
                <Sparkles size={16} />
                Destination Finder
              </p>
              <h1>Pick a city, watch the mood, then plan smarter.</h1>
              <p>
                Explore city ideas across Morocco, Europe, Asia, and Africa. Click any city to
                open a short video preview, useful details, and a simple definition before choosing
                a package or custom trip.
              </p>
              <div className="destinations-actions">
                <Link to="/packages" className="destinations-primary">
                  Browse Packages <ArrowRight size={16} />
                </Link>
                <Link to="/create-trip" className="destinations-secondary">
                  Create custom trip
                </Link>
              </div>
            </div>

            <div className="destinations-map-card">
              <MapPin size={28} />
              <strong>{destinationCities.length} city ideas</strong>
              <span>Click a city card to open video, details, season, and highlights.</span>
            </div>
          </div>
        </section>

        <section className="site-shell destinations-section">
          <div className="destinations-section-head">
            <p>City library</p>
            <h2>Choose your next direction</h2>
            <span>
              Search by city or filter by region. Every card opens a focused city preview.
            </span>
          </div>

          <div className="destinations-toolbar">
            <label className="destinations-search">
              <Search size={18} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search Marrakech, Paris, Kyoto..."
              />
            </label>

            <div className="destinations-filter-row" aria-label="Destination regions">
              {destinationFilters.map((region) => (
                <button
                  key={region}
                  type="button"
                  className={activeRegion === region ? "active" : ""}
                  onClick={() => setActiveRegion(region)}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          <div className="destinations-grid">
            {filteredCities.map((city) => (
              <button
                key={city.name}
                type="button"
                className="destination-tile"
                onClick={() => setSelectedCity(city)}
              >
                <img src={city.image} alt={city.name} />
                <span className="destination-play">
                  <Play size={16} fill="currentColor" />
                  Watch
                </span>
                <div>
                  <span>
                    {city.region} | {city.country}
                  </span>
                  <h3>{city.name}</h3>
                  <p>{city.mood}</p>
                </div>
              </button>
            ))}
          </div>

          {!filteredCities.length ? (
            <div className="destinations-empty">
              No city found yet. Try another name or switch the region filter.
            </div>
          ) : null}
        </section>

        <section className="site-shell destination-types">
          <div>
            <p className="destinations-eyebrow">Travel moods</p>
            <h2>Use destinations as a starting point, not the final decision.</h2>
          </div>
          <div className="destination-type-list">
            {["City breaks", "Beach escapes", "Religious trips", "Adventure routes", "Family holidays", "Luxury stays"].map(
              (item) => (
                <span key={item}>{item}</span>
              )
            )}
          </div>
        </section>
      </main>

      <CityDetailModal city={selectedCity} onClose={() => setSelectedCity(null)} />

      <Footer />
    </div>
  );
}
