import { LayoutDashboard, Calendar, AlertCircle, TrendingUp, CheckCircle2, ChevronRight } from "lucide-react";
import NotificationsPanel from "../components/dashboard/NotificationsPanel";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <main className="panel">
      <header className="hero-banner">
        <h1>Welcome, {user?.fullName}</h1>
        <p className="muted">Your operations overview for today</p>
      </header>

      <section className="kpi-grid">
        <article className="kpi-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Calendar size={18} color="var(--primary)" />
            <h3>Bookings Queue</h3>
          </div>
          <p>14 pending</p>
        </article>
        <article className="kpi-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <AlertCircle size={18} color="#f59e0b" />
            <h3>Open Incidents</h3>
          </div>
          <p>6 active tickets</p>
        </article>
        <article className="kpi-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <TrendingUp size={18} color="#10b981" />
            <h3>Utilization</h3>
          </div>
          <p>87% efficiency</p>
        </article>
      </section>

      <section className="workspace-grid">
        <article className="workspace-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <CheckCircle2 size={20} color="var(--primary)" />
            <h3>Action Items</h3>
          </div>
          <ul className="action-list" style={{ listStyle: 'none', display: 'grid', gap: '1rem' }}>
            <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.925rem' }}>
              <span style={{ color: 'var(--primary)' }}>•</span>
              Review high-priority lab equipment bookings
            </li>
            <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.925rem' }}>
              <span style={{ color: 'var(--primary)' }}>•</span>
              Escalate unresolved tickets older than 24h
            </li>
            <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.925rem' }}>
              <span style={{ color: 'var(--primary)' }}>•</span>
              Confirm tomorrow's facility readiness
            </li>
          </ul>
        </article>

        <article className="workspace-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <LayoutDashboard size={20} color="var(--primary)" />
            <h3>Quick Links</h3>
          </div>
          <div className="quick-links" style={{ display: 'grid', gap: '0.75rem' }}>
            <Link to="/bookings" className="ghost-btn" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textDecoration: 'none' }}>
              Bookings Center <ChevronRight size={16} />
            </Link>
            <Link to="/incidents" className="ghost-btn" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textDecoration: 'none' }}>
              Incident Stream <ChevronRight size={16} />
            </Link>
            {(user?.role === "MANAGER" || user?.role === "ADMIN") && (
              <Link to="/manager" className="ghost-btn" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textDecoration: 'none' }}>
                Manager Deck <ChevronRight size={16} />
              </Link>
            )}
          </div>
        </article>

        <NotificationsPanel />
      </section>
    </main>
  );
}
