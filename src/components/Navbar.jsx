import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Compass, Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Home", to: "/" },
    { label: "Destinations", to: "/destinations" },
    { label: "Packages", to: "/packages" },
    { label: "My Bookings", to: "/my-bookings" },
  ];

  return (
    <header className="site-header">
      <div className="container nav-container">
        <Link
          to="/"
          className="brand"
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand-icon">
            <Compass size={25} />
          </span>
          <span>
            <strong>TravelMate</strong>
            <small>YOUR JOURNEY STARTS HERE</small>
          </span>
        </Link>

        <button
          type="button"
          className="mobile-menu-button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>

        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link-active" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <Link
            to="/destinations"
            className="button button-primary nav-cta"
            onClick={() => setMenuOpen(false)}
          >
            Explore Trips
          </Link>
        </nav>
      </div>
    </header>
  );
}