import { Link } from "react-router-dom";
import {
  ArrowRight,
  Compass,
  MapPin,
  ShieldCheck,
  Headphones,
  Star,
} from "lucide-react";

import { destinations, packages } from "../data/travelData.js";
import DestinationCard from "../components/DestinationCard.jsx";
import PackageCard from "../components/PackageCard.jsx";

export default function Home() {
  const featuredDestinations = destinations.slice(0, 3);
  const featuredPackages = packages.slice(0, 3);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img
            src="/images/hero.jpg"
            alt="Beautiful travel destination"
            className="hero-image"
          />
        </div>

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <span className="hero-tag">
            <Compass size={17} />
            DISCOVER YOUR NEXT ADVENTURE
          </span>

          <h1>
            Explore the World,
            <br />
            <span>One Journey at a Time.</span>
          </h1>

          <p>
            Discover amazing destinations, explore unforgettable
            travel packages, and create memories that last a lifetime.
          </p>

          <div className="hero-buttons">
            <Link to="/destinations" className="btn btn-primary">
              Explore Destinations
              <ArrowRight size={18} />
            </Link>

            <Link to="/packages" className="btn btn-outline">
              View Packages
            </Link>
          </div>

          <div className="hero-trust">
            <div className="hero-trust-icon">
              <ShieldCheck size={20} />
            </div>

            <span>Travel with confidence and peace of mind</span>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="benefits-grid">
          <div className="benefit-item">
            <div className="benefit-icon">
              <Compass size={25} />
            </div>

            <div>
              <h3>Handpicked Destinations</h3>
              <p>Discover places worth exploring.</p>
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon">
              <ShieldCheck size={25} />
            </div>

            <div>
              <h3>Trusted Travel Packages</h3>
              <p>Enjoy a smooth travel experience.</p>
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon">
              <Headphones size={25} />
            </div>

            <div>
              <h3>Travel Support</h3>
              <p>Get help when you need it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="section home-destinations">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">
              FIND YOUR NEXT ESCAPE
            </span>

            <h2>Popular Destinations</h2>

            <p>
              Explore beautiful places and find the perfect
              destination for your next holiday.
            </p>
          </div>

          <Link
            to="/destinations"
            className="section-link"
          >
            View All Destinations
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="destination-grid">
          {featuredDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
            />
          ))}
        </div>
      </section>

      {/* Featured Travel Packages */}
      <section className="section home-packages">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">
              TRAVEL MADE SIMPLE
            </span>

            <h2>Featured Travel Packages</h2>

            <p>
              Find your ideal getaway with our carefully planned
              travel packages.
            </p>
          </div>

          <Link to="/packages" className="section-link">
            View All Packages
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="package-grid">
          {featuredPackages.map((travelPackage) => (
            <PackageCard
              key={travelPackage.id}
              travelPackage={travelPackage}
            />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="home-cta-section">
        <div className="home-cta-content">
          <span className="section-eyebrow">
            YOUR NEXT ADVENTURE STARTS HERE
          </span>

          <h2>Ready to Make New Memories?</h2>

          <p>
            Choose your destination, find a package that suits you,
            and start planning your next unforgettable trip.
          </p>

          <Link to="/packages" className="btn btn-primary">
            Find Your Trip
            <ArrowRight size={18} />
          </Link>

          <div className="home-cta-rating">
            <Star size={17} fill="currentColor" />
            <span>Discover more. Travel better. Enjoy every moment.</span>
          </div>
        </div>
      </section>
    </div>
  );
}