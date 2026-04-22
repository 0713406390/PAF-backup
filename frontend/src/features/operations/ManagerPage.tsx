import { useEffect, useState } from "react";
import client from "../../api/client";
import { Briefcase, ListChecks, PieChart, ShieldCheck } from "lucide-react";

export default function ManagerPage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const response = await client.get<{ message: string }>("/ops/manager");
        setMessage(response.data.message);
      } catch (err) {
        console.error("Failed to load manager data", err);
      }
    };
    void load();
  }, []);

  return (
    <main className="panel">
      <header className="hero-banner" style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <Briefcase size={32} color="var(--primary)" />
          <h1>Manager Operations</h1>
        </div>
        <p className="muted">Coordinate workflows, manage assignments, and track performance.</p>
      </header>

      <div className="workspace-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <article className="workspace-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <PieChart size={20} color="var(--primary)" />
            <h3>Status Report</h3>
          </div>
          <p style={{ fontWeight: 500, color: 'var(--text-muted)' }}>{message}</p>
        </article>

        <article className="workspace-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <ListChecks size={20} color="var(--primary)" />
            <h3>Priority Checklist</h3>
          </div>
          <ul className="action-list" style={{ listStyle: 'none', display: 'grid', gap: '1rem' }}>
            <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.925rem' }}>
              <span style={{ color: 'var(--primary)' }}>•</span>
              Approve pending high-impact bookings
            </li>
            <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.925rem' }}>
              <span style={{ color: 'var(--primary)' }}>•</span>
              Review delayed maintenance tickets
            </li>
            <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.925rem' }}>
              <span style={{ color: 'var(--primary)' }}>•</span>
              Balance technician workload
            </li>
          </ul>
        </article>

        <article className="workspace-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <ShieldCheck size={20} color="var(--primary)" />
            <h3>Governance</h3>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            All operational changes are logged for auditing purposes. Ensure that role-specific policies are followed during assignment.
          </p>
        </article>
      </div>
    </main>
  );
}
