import { useMemo, useState } from "react";
import { Search, Luggage } from "lucide-react";
import { destinations, packages } from "../data/travelData.js";
import PackageCard from "../components/PackageCard.jsx";

export default function Packages() {
  const [search, setSearch] = useState("");

  const filteredPackages = useMemo(() => {
    return packages.filter((travelPackage) =>
      [
        travelPackage.name,
        travelPackage.title,
        travelPackage.location,
        travelPackage.destination,
        travelPackage.description,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <>
      <section className="page-banner packages-banner">
        <div className="container page-banner-content">
          <span className="eyebrow banner-eyebrow">TRAVEL MADE SIMPLE</span>
          <h1>Find Your Perfect Package</h1>
          <p>
            Explore our selected travel packages and find the right trip
            for your next getaway.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="listing-toolbar">
            <div className="listing-intro">
              <span className="eyebrow">TRAVEL EXPERIENCES</span>
              <h2>Packages made for you</h2>
              <p>{filteredPackages.length} packages available</p>
            </div>

            <label className="search-field">
              <Search size={19} />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search packages..."
                aria-label="Search packages"
              />
            </label>
          </div>

          {filteredPackages.length > 0 ? (
            <div className="package-grid">
              {filteredPackages.map((travelPackage) => (
                <PackageCard
                  key={travelPackage.id}
                  travelPackage={travelPackage}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Luggage size={35} />
              <h3>No packages found</h3>
              <p>Try searching for a destination or package name.</p>
              <button
                type="button"
                className="button button-primary"
                onClick={() => setSearch("")}
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}