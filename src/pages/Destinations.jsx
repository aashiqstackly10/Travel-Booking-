import { useMemo, useState } from "react";
import { Search, MapPin } from "lucide-react";
import { destinations } from "../data/travelData.js";
import DestinationCard from "../components/DestinationCard.jsx";

export default function Destinations() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(destinations.map((item) => item.category)),
  ];

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      const matchesSearch = [
        destination.name,
        destination.country,
        destination.category,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || destination.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <>
      <section className="page-banner">
        <div className="container page-banner-content">
          <span className="eyebrow banner-eyebrow">YOUR WORLD AWAITS</span>
          <h1>Explore Destinations</h1>
          <p>
            Discover beautiful places, exciting cultures, and unforgettable
            experiences around the world.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="listing-toolbar">
            <div className="listing-intro">
              <span className="eyebrow">FIND YOUR ESCAPE</span>
              <h2>Where would you like to go?</h2>
              <p>{filteredDestinations.length} destinations to explore</p>
            </div>

            <label className="search-field">
              <Search size={19} />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search destinations..."
                aria-label="Search destinations"
              />
            </label>
          </div>

          <div className="filter-row" aria-label="Filter by category">
            {categories.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setCategory(item)}
                className={`filter-chip ${
                  category === item ? "filter-chip-active" : ""
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {filteredDestinations.length > 0 ? (
            <div className="destination-grid">
              {filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <MapPin size={35} />
              <h3>No destinations found</h3>
              <p>Try another search or select a different category.</p>
              <button
                type="button"
                className="button button-primary"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}