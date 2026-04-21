import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const { loginWithGoogle } = useAuth();

  return (
    <main className="hero-shell">
      <section className="hero-panel">
        <p className="eyebrow">Smart Campus Operations Hub</p>
        <h1>Operational control for every room, lab, and technician lane.</h1>
        <p className="subcopy">
          Secure sign-in with Google, role-based dashboards, and protected workflows for incident and booking management.
        </p>
        <button className="google-btn" onClick={loginWithGoogle}>
          <span>G</span>
          Continue with Google
        </button>
      </section>
      <aside className="signal-panel">
        <div className="signal-card">
          <h3>Roles Enabled</h3>
          <p>USER, ADMIN, MANAGER, TECHNICIAN</p>
        </div>
        <div className="signal-card">
          <h3>Security</h3>
          <p>OAuth 2.0 + backend RBAC + protected frontend routes</p>
        </div>
      </aside>
    </main>
  );
}
