import { useEffect, useState } from "react";
import client from "../../api/client";
import { Shield, Settings, Users, Lock } from "lucide-react";

export default function AdminPage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const response = await client.get<{ message: string }>("/ops/admin");
        setMessage(response.data.message);
      } catch (err) {
        console.error("Failed to load admin data", err);
      }
    };
    void load();
  }, []);

  return (
    <main className="panel">
      <header className="hero-banner" style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <Shield size={32} color="var(--primary)" />
          <h1>Admin Control</h1>
        </div>
        <p className="muted">Platform governance, access controls, and system-wide settings.</p>
      </header>

      <div className="workspace-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        <article className="workspace-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <Lock size={20} color="var(--primary)" />
            <h3>System Status</h3>
          </div>
          <p style={{ fontWeight: 500, color: 'var(--text-muted)' }}>{message}</p>
        </article>

        <article className="workspace-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <Users size={20} color="var(--primary)" />
            <h3>Admin Workflow</h3>
          </div>
          <ul className="action-list" style={{ listStyle: 'none', display: 'grid', gap: '1rem' }}>
            <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.925rem' }}>
              <span style={{ color: 'var(--primary)' }}>•</span>
              Review role assignments
            </li>
            <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.925rem' }}>
              <span style={{ color: 'var(--primary)' }}>•</span>
              Audit critical operations
            </li>
            <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.925rem' }}>
              <span style={{ color: 'var(--primary)' }}>•</span>
              Approve service escalations
            </li>
          </ul>
        </article>

        <article className="workspace-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <Settings size={20} color="var(--primary)" />
            <h3>Infrastructure</h3>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Monitor the health of the SmartCampus backend and connected services. Configure global parameters for facility management.
          </p>
        </article>
      </div>
    </main>
  );
}
