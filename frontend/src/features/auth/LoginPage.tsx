import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const { loginWithGoogle } = useAuth();

  return (
    <main className="hero-shell">
      <section className="hero-panel">
        <p className="eyebrow">Smart Campus Operations Hub</p>
        <h1>Run a smarter campus day with one unified operations workspace.</h1>
        <p className="subcopy">
          Coordinate facilities, equipment, and maintenance workflows through a clean command interface designed for speed.
        </p>
        <button className="google-btn" onClick={loginWithGoogle}>
          <span>G</span>
          Enter Campus Workspace
        </button>
      </section>
      <aside className="signal-panel">
        <div className="signal-card">
          <h3>Bookings Pulse</h3>
          <p>Track room, lab, and equipment requests with live status visibility.</p>
        </div>
        <div className="signal-card">
          <h3>Maintenance Stream</h3>
          <p>Keep fault reporting, assignment, and resolution progress aligned in one place.</p>
        </div>
      </aside>
    </main>
  );
}
