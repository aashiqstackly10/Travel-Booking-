// src/components/PackageCard.jsx

import { Link } from "react-router-dom";
import {
  CalendarDays,
  MapPin,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function PackageCard({ travelPackage }) {
  const packageName = travelPackage.title || travelPackage.name;

  return (
    <article className="package-card">
      <Link
        to={`/packages/${travelPackage.id}`}
        className="package-image-link"
        aria-label={`View ${packageName}`}
      >
        <img
          src={travelPackage.image}
          alt={packageName}
          className="package-image"
          loading="lazy"
        />

        <span className="package-image-label">TRAVEL PACKAGE</span>
      </Link>

      <div className="package-card-body">
        <div className="package-location">
          <MapPin size={15} />
          <span>{travelPackage.location}</span>
        </div>

        <h3>{packageName}</h3>

        <p className="package-description">
          {travelPackage.description}
        </p>

        <div className="package-duration">
          <CalendarDays size={17} />
          <span>{travelPackage.duration}</span>
        </div>

        <div className="package-includes-note">
          <CheckCircle2 size={15} />
          <span>Carefully planned travel experience</span>
        </div>

        <div className="package-card-footer">
          <div className="package-price-block">
            <span className="package-price-label">Starting from</span>
            <div className="package-price">
              ${Number(travelPackage.price).toLocaleString()}
              <span> / person</span>
            </div>
          </div>

          <Link
            to={`/packages/${travelPackage.id}`}
            className="package-view-button"
          >
            View Details
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}