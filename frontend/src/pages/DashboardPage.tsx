import { Link } from "react-router-dom";
import NotificationsPanel from "../components/dashboard/NotificationsPanel";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <main className="panel">
      <div className="hero-banner">
        <p className="eyebrow">Operations Snapshot</p>
        <h1>Welcome, {user?.fullName}</h1>
        <p>
          Access level: <span className="role-pill">{user?.role}</span>
        </p>
      </div>

      <section className="kpi-grid">
        <article className="kpi-card">
          <h3>Bookings Queue</h3>
          <p>14 pending approvals</p>
        </article>
        <article className="kpi-card">
          <h3>Open Incidents</h3>
          <p>6 active maintenance tickets</p>
        </article>
        <article className="kpi-card">
          <h3>Utilization</h3>
          <p>87% room usage this week</p>
        </article>
      </section>

      <section className="workspace-grid">
        <article className="workspace-card">
          <h3>Today's Focus</h3>
          <ul>
            <li>Review high-priority lab equipment bookings</li>
            <li>Escalate unresolved tickets older than 24h</li>
            <li>Confirm tomorrow's facility readiness</li>
          </ul>
        </article>
        <article className="workspace-card">
          <h3>Quick Navigation</h3>
          <div className="quick-links">
            <Link to="/bookings" className="quick-link">
              Open Bookings
            </Link>
            <Link to="/incidents" className="quick-link">
              Open Incidents
            </Link>
            {(user?.role === "MANAGER" || user?.role === "ADMIN") && (
              <Link to="/manager" className="quick-link">
                Open Manager Deck
              </Link>
            )}
          </div>
        </article>
        <NotificationsPanel />
      </section>
    </main>
  );
}
