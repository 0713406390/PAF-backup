import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const { loginWithGoogle } = useAuth();

  return (
    <main className="hero-shell">
      <section className="hero-panel">
        <p className="eyebrow">Smart Campus Operations Hub</p>
        <h1>Operational control for every room, lab, and technician lane.</h1>
        <p className="subcopy">
          Plan bookings, monitor facilities, and manage incidents from one unified campus workspace.
        </p>
        <button className="google-btn" onClick={loginWithGoogle}>
          <span>G</span>
          Sign in to Workspace
        </button>
      </section>
      <aside className="signal-panel">
        <div className="signal-card">
          <h3>Bookings at a Glance</h3>
          <p>Track room, lab, and equipment requests in real time.</p>
        </div>
        <div className="signal-card">
          <h3>Maintenance Flow</h3>
          <p>Receive fault updates quickly and keep resolution progress visible.</p>
        </div>
      </aside>
    </main>
  );
}
