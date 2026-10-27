import { Link } from "react-router-dom";
import { Compass, MapPin, Mail, Phone, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-about">
          <Link to="/" className="brand footer-brand">
            <span className="brand-icon">
              <Compass size={25} />
            </span>
            <span>
              <strong>TravelMate</strong>
              <small>YOUR JOURNEY STARTS HERE</small>
            </span>
          </Link>

          <p>
            Discover beautiful places, create unforgettable memories, and
            make every journey special with TravelMate.
          </p>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>
          <Link to="/">Home</Link>
          <Link to="/destinations">Destinations</Link>
          <Link to="/packages">Travel Packages</Link>
          <Link to="/my-bookings">My Bookings</Link>
        </div>

        <div className="footer-column">
          <h3>Contact Us</h3>
          <p><MapPin size={16} /> Plan your next adventure</p>
          <p><Mail size={16} /> hello@travelmate.com</p>
          <p><Phone size={16} /> +1 234 567 890</p>
        </div>

        <div className="footer-column footer-newsletter">
          <h3>Ready to explore?</h3>
          <p>Find a destination that makes you excited to travel.</p>
          <Link to="/destinations" className="footer-link">
            Find your trip <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} TravelMate. All rights reserved.</p>
          <p>Made for travellers, by travel lovers.</p>
        </div>
      </div>
    </footer>
  );
}