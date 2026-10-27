import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Users,
} from "lucide-react";
import { packages } from "../data/travelData.js";

export default function PackageDetails() {
  const { id } = useParams();
  const travelPackage = packages.find(
    (item) => String(item.id) === String(id)
  );

  if (!travelPackage) {
    return (
      <section className="section">
        <div className="container empty-state">
          <h2>Package not found</h2>
          <p>This travel package may no longer be available.</p>
          <Link to="/packages" className="button button-primary">
            Browse packages
          </Link>
        </div>
      </section>
    );
  }

  const packageName = travelPackage.title || travelPackage.name;

  return (
    <section className="section detail-section">
      <div className="container">
        <Link to="/packages" className="back-link">
          <ArrowLeft size={17} /> Back to packages
        </Link>

        <div className="detail-layout">
          <div className="detail-main">
            <div className="detail-image-wrap">
              <img
                src={travelPackage.image}
                alt={packageName}
                className="detail-image"
              />
            </div>

            <div className="detail-content">
              <p className="package-location">
                <MapPin size={16} /> {travelPackage.location}
              </p>
              <h1>{packageName}</h1>
              <p className="detail-description">
                {travelPackage.description}
              </p>

              <div className="detail-highlights">
                <div className="detail-highlight">
                  <CalendarDays size={22} />
                  <div>
                    <span>Duration</span>
                    <strong>{travelPackage.duration}</strong>
                  </div>
                </div>
                <div className="detail-highlight">
                  <Users size={22} />
                  <div>
                    <span>Travel style</span>
                    <strong>Individual or group</strong>
                  </div>
                </div>
              </div>

              <div className="includes-panel">
                <h2>What's included</h2>
                <ul className="includes-list">
                  {travelPackage.includes.map((item) => (
                    <li key={item}>
                      <CheckCircle2 size={18} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside className="booking-summary">
            <span className="eyebrow">YOUR NEXT GETAWAY</span>
            <p className="summary-label">Starting from</p>
            <p className="summary-price">
              ${travelPackage.price.toLocaleString()}
              <span> / person</span>
            </p>
            <p className="summary-note">
              Review your travel details and reserve your place.
            </p>
            <div className="summary-divider" />
            <div className="summary-line">
              <span>Package</span>
              <strong>{packageName}</strong>
            </div>
            <div className="summary-line">
              <span>Duration</span>
              <strong>{travelPackage.duration}</strong>
            </div>
            <Link
              to={`/booking/${travelPackage.id}`}
              className="button button-primary button-full"
            >
              Book This Trip
            </Link>
            <p className="secure-note">
              <CheckCircle2 size={15} /> Easy and convenient booking
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}