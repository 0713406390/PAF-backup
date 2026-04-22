import { useEffect, useState } from "react";
import client from "../../api/client";
import ProtectedButton from "../../components/shared/ProtectedButton";
import { useAuth } from "../../context/AuthContext";
import { Wrench, CheckCircle, UserPlus, Info } from "lucide-react";

interface IncidentRow {
  id: number;
  title: string;
  status: string;
  assignedTechnicianEmail?: string | null;
}

export default function IncidentsPage() {
  const { user } = useAuth();
  const [rows, setRows] = useState<IncidentRow[]>([]);
  const [message, setMessage] = useState("");

  const loadRows = async () => {
    try {
      const response = await client.get<IncidentRow[]>("/incidents");
      setRows(response.data);
    } catch (err) {
      console.error("Failed to load incidents", err);
    }
  };

  useEffect(() => {
    void loadRows();
  }, []);

  const resolveIncident = async (id: number) => {
    await client.patch(`/incidents/${id}/resolve`);
    setMessage(`Ticket #${id} has been marked as resolved.`);
    setTimeout(() => setMessage(""), 3000);
    await loadRows();
  };

  const assignTechnician = async (id: number) => {
    await client.patch(`/incidents/${id}/assign`, {
      technicianEmail: "tech1@campus.edu",
    });
    setMessage(`Technician assigned to Ticket #${id}.`);
    setTimeout(() => setMessage(""), 3000);
    await loadRows();
  };

  const canResolve = user?.role === "TECHNICIAN" || user?.role === "MANAGER" || user?.role === "ADMIN";

  return (
    <main className="panel">
      <header className="hero-banner" style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <Wrench size={32} color="var(--primary)" />
          <h1>Maintenance Stream</h1>
        </div>
        <p className="muted">Track, assign, and resolve facility incidents across campus.</p>
      </header>

      {message && (
        <div className="notice" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <Info size={18} color="var(--primary)" />
          {message}
        </div>
      )}

      <div className="incident-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {rows.map((row) => (
          <article className="workspace-card" key={row.id} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.125rem', margin: 0 }}>{row.title}</h3>
              <span className={`role-pill`} style={{ 
                background: row.status === 'RESOLVED' ? '#dcfce7' : '#fef3c7',
                color: row.status === 'RESOLVED' ? '#166534' : '#92400e'
              }}>
                {row.status}
              </span>
            </div>
            
            <p className="muted" style={{ fontSize: '0.875rem', marginBottom: '1.5rem', flex: 1 }}>
              Ticket #{row.id} • {row.assignedTechnicianEmail ? `Assigned to ${row.assignedTechnicianEmail}` : 'Unassigned'}
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
              {canResolve && row.status !== 'RESOLVED' && (
                <button className="accent-btn" onClick={() => void resolveIncident(row.id)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, justifyContent: 'center' }}>
                  <CheckCircle size={16} /> Resolve
                </button>
              )}
              <ProtectedButton
                className="ghost-btn"
                allowedRoles={["ADMIN"]}
                onClick={() => void assignTechnician(row.id)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, justifyContent: 'center' }}
              >
                <UserPlus size={16} /> Assign
              </ProtectedButton>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
