import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Users,
} from "lucide-react";
import { packages } from "../data/travelData.js";

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const travelPackage = packages.find(
    (item) => String(item.id) === String(id)
  );

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    travelDate: "",
    travelers: "1",
    requests: "",
  });

  const [error, setError] = useState("");

  if (!travelPackage) {
    return (
      <section className="section">
        <div className="container empty-state">
          <h2>Package not found</h2>
          <Link to="/packages" className="button button-primary">
            Browse packages
          </Link>
        </div>
      </section>
    );
  }

  const packageName = travelPackage.title || travelPackage.name;
  const total = travelPackage.price * Number(form.travelers);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!form.fullName.trim() || !form.email.trim() || !form.travelDate) {
      setError("Please fill in your name, email, and travel date.");
      return;
    }

    if (new Date(`${form.travelDate}T00:00:00`) < new Date(new Date().toDateString())) {
      setError("Please choose today or a future travel date.");
      return;
    }

    const booking = {
      id: `TM-${Date.now()}`,
      packageId: String(travelPackage.id),
      packageName,
      location: travelPackage.location,
      image: travelPackage.image,
      duration: travelPackage.duration,
      price: travelPackage.price,
      totalPrice: total,
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      travelDate: form.travelDate,
      travelers: Number(form.travelers),
      requests: form.requests.trim(),
      bookedAt: new Date().toISOString(),
      status: "Confirmed",
    };

    try {
      const savedBookings = JSON.parse(
        localStorage.getItem("travelBookings") || "[]"
      );
      const bookings = Array.isArray(savedBookings) ? savedBookings : [];

      localStorage.setItem(
        "travelBookings",
        JSON.stringify([booking, ...bookings])
      );

      navigate("/my-bookings", { state: { justBooked: true } });
    } catch {
      setError(
        "Your booking could not be saved. Please check your browser storage and try again."
      );
    }
  }

  return (
    <section className="section booking-section">
      <div className="container">
        <Link to={`/packages/${travelPackage.id}`} className="back-link">
          <ArrowLeft size={17} /> Back to package
        </Link>

        <div className="booking-page-heading">
          <span className="eyebrow">LET'S PLAN YOUR TRIP</span>
          <h1>Complete Your Booking</h1>
          <p>Enter your details to save your travel reservation.</p>
        </div>

        <div className="booking-layout">
          <form className="booking-form" onSubmit={handleSubmit}>
            <h2>Traveller information</h2>
            <p className="form-intro">
              Please provide the details for your trip.
            </p>

            {error && <div className="form-error" role="alert">{error}</div>}

            <div className="form-field">
              <label htmlFor="fullName">Full name *</label>
              <input
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="email">Email address *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="phone">Phone number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="travelDate">Travel date *</label>
                <input
                  id="travelDate"
                  name="travelDate"
                  type="date"
                  min={new Date().toLocaleDateString("en-CA")}
                  value={form.travelDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="travelers">Number of travellers *</label>
                <select
                  id="travelers"
                  name="travelers"
                  value={form.travelers}
                  onChange={handleChange}
                  required
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
                    <option key={number} value={number}>
                      {number} {number === 1 ? "traveller" : "travellers"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="requests">Special requests</label>
              <textarea
                id="requests"
                name="requests"
                value={form.requests}
                onChange={handleChange}
                placeholder="Any additional information? (optional)"
                rows={4}
              />
            </div>

            <button
              type="submit"
              className="button button-primary button-full"
            >
              Confirm Booking · ${total.toLocaleString()}
            </button>

            <p className="form-disclaimer">
              This student project stores bookings locally in your browser.
              It does not process real payments.
            </p>
          </form>

          <aside className="booking-summary booking-summary-sticky">
            <img
              src={travelPackage.image}
              alt={packageName}
              className="booking-summary-image"
            />
            <span className="eyebrow">YOUR TRIP</span>
            <h2>{packageName}</h2>
            <p className="package-location">
              <MapPin size={16} /> {travelPackage.location}
            </p>

            <div className="summary-detail">
              <CalendarDays size={18} />
              <span>{travelPackage.duration}</span>
            </div>
            <div className="summary-detail">
              <Users size={18} />
              <span>
                {form.travelers}{" "}
                {Number(form.travelers) === 1 ? "traveller" : "travellers"}
              </span>
            </div>

            <div className="summary-divider" />
            <div className="summary-line">
              <span>Price per person</span>
              <strong>${travelPackage.price.toLocaleString()}</strong>
            </div>
            <div className="summary-line">
              <span>Travellers</span>
              <strong>× {form.travelers}</strong>
            </div>
            <div className="summary-divider" />
            <div className="summary-line summary-total">
              <span>Total</span>
              <strong>${total.toLocaleString()}</strong>
            </div>

            <p className="secure-note">
              <CheckCircle2 size={16} /> Your booking is saved on this device
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}