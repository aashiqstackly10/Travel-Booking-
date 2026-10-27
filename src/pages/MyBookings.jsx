import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  CalendarDays,
  MapPin,
  Trash2,
  Luggage,
  CheckCircle2,
} from "lucide-react";

export default function MyBookings() {
  const location = useLocation();
  const [bookings, setBookings] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [showSuccess, setShowSuccess] = useState(
    Boolean(location.state?.justBooked)
  );

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("travelBookings") || "[]"
      );
      setBookings(Array.isArray(saved) ? saved : []);
    } catch {
      setBookings([]);
    }
    setLoaded(true);
  }, []);

  function removeBooking(bookingId) {
    const updated = bookings.filter((booking) => booking.id !== bookingId);
    setBookings(updated);
    localStorage.setItem("travelBookings", JSON.stringify(updated));
  }

  return (
    <section className="section bookings-section">
      <div className="container">
        <div className="bookings-heading">
          <span className="eyebrow">YOUR TRAVEL PLANS</span>
          <h1>My Bookings</h1>
          <p>Keep track of your saved trips and upcoming adventures.</p>
        </div>

        {showSuccess && (
          <div className="success-message" role="status">
            <CheckCircle2 size={21} />
            <div>
              <strong>Booking saved successfully!</strong>
              <p>Your reservation is now listed below.</p>
            </div>
            <button
              type="button"
              className="message-close"
              onClick={() => setShowSuccess(false)}
              aria-label="Dismiss message"
            >
              ×
            </button>
          </div>
        )}

        {!loaded ? null : bookings.length === 0 ? (
          <div className="empty-state bookings-empty">
            <span className="empty-state-icon"><Luggage size={36} /></span>
            <h2>No bookings yet</h2>
            <p>
              Your next adventure is waiting. Explore our packages and
              save your first trip here.
            </p>
            <Link to="/packages" className="button button-primary">
              Explore Packages
            </Link>
          </div>
        ) : (
          <div className="booking-list">
            {bookings.map((booking) => (
              <article className="saved-booking-card" key={booking.id}>
                <img
                  src={booking.image}
                  alt={booking.packageName}
                  className="saved-booking-image"
                />

                <div className="saved-booking-info">
                  <span className="booking-status">
                    <CheckCircle2 size={14} /> {booking.status || "Saved"}
                  </span>
                  <h2>{booking.packageName}</h2>
                  <p className="package-location">
                    <MapPin size={15} /> {booking.location}
                  </p>
                  <div className="saved-booking-meta">
                    <span>
                      <CalendarDays size={16} />
                      {booking.travelDate
                        ? new Date(
                            `${booking.travelDate}T00:00:00`
                          ).toLocaleDateString()
                        : "Date not specified"}
                    </span>
                    <span>
                      <Luggage size={16} />
                      {booking.travelers}{" "}
                      {booking.travelers === 1 ? "traveller" : "travellers"}
                    </span>
                  </div>
                  <p className="booking-reference">
                    Reference: {booking.id}
                  </p>
                </div>

                <div className="saved-booking-price">
                  <span>Total price</span>
                  <strong>
                    ${(booking.totalPrice ?? booking.price ?? 0).toLocaleString()}
                  </strong>
                  <button
                    type="button"
                    className="remove-booking-button"
                    onClick={() => removeBooking(booking.id)}
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}