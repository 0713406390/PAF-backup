import { useEffect, useState } from "react";
import client from "../../api/client";
import { Wrench, ClipboardList, MapPin, CheckCircle } from "lucide-react";

export default function TechnicianPage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const response = await client.get<{ message: string }>("/ops/technician");
        setMessage(response.data.message);
      } catch (err) {
        console.error("Failed to load technician data", err);
      }
    };
    void load();
  }, []);

  return (
    <main className="panel">
      <header className="hero-banner" style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <Wrench size={32} color="var(--primary)" />
          <h1>Technician Workbench</h1>
        </div>
        <p className="muted">Field diagnostics, ticket updates, and resolution management.</p>
      </header>

      <div className="workspace-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        <article className="workspace-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <ClipboardList size={20} color="var(--primary)" />
            <h3>Active Feed</h3>
          </div>
          <p style={{ fontWeight: 500, color: 'var(--text-muted)' }}>{message}</p>
        </article>

        <article className="workspace-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <MapPin size={20} color="var(--primary)" />
            <h3>Today's Route</h3>
          </div>
          <ul className="action-list" style={{ listStyle: 'none', display: 'grid', gap: '1rem' }}>
            <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.925rem' }}>
              <span style={{ color: 'var(--primary)' }}>•</span>
              Inspect projector fault in Lecture Hall 3
            </li>
            <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.925rem' }}>
              <span style={{ color: 'var(--primary)' }}>•</span>
              Close HVAC ticket for Lab Cluster B
            </li>
            <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.925rem' }}>
              <span style={{ color: 'var(--primary)' }}>•</span>
              Update resolution notes for helpdesk review
            </li>
          </ul>
        </article>

        <article className="workspace-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <CheckCircle size={20} color="var(--primary)" />
            <h3>Resolution Target</h3>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Maintain a 24-hour resolution target for all high-priority tickets. Document all parts used and time spent on each task.
          </p>
        </article>
      </div>
    </main>
  );
}
