import { Link } from "react-router-dom";
import { MapPin, ArrowUpRight } from "lucide-react";

export default function DestinationCard({ destination }) {
  return (
    <article className="destination-card">
      <Link
        to="/packages"
        className="destination-image-link"
        aria-label={`Explore packages for ${destination.name}`}
      >
        <img
          className="destination-image"
          src={destination.image}
          alt={destination.name}
          loading="lazy"
        />
        <span className="destination-category">
          {destination.category}
        </span>
      </Link>

      <div className="destination-card-body">
        <p className="destination-country">
          <MapPin size={15} />
          {destination.country}
        </p>

        <h3>{destination.name}</h3>
        <p className="destination-description">
          {destination.description}
        </p>

        <div className="destination-card-bottom">
          <p className="price">
            <span>From</span> ${destination.price.toLocaleString()}
          </p>
          <Link to="/packages" className="round-link" aria-label="View packages">
            <ArrowUpRight size={19} />
          </Link>
        </div>
      </div>
    </article>
  );
}