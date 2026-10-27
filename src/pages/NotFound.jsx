import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container empty-state not-found">
        <span className="empty-state-icon"><Compass size={38} /></span>
        <span className="eyebrow">OOPS! WRONG TURN</span>
        <h1>Page not found</h1>
        <p>The page you're looking for doesn't exist or may have moved.</p>
        <Link to="/" className="button button-primary">
          Back to Home
        </Link>
      </div>
    </section>
  );
}