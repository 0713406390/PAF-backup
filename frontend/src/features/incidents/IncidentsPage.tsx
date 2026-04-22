import { useEffect, useState } from "react";
import client from "../../api/client";
import ProtectedButton from "../../components/shared/ProtectedButton";
import { useAuth } from "../../context/AuthContext";

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
    const response = await client.get<IncidentRow[]>("/incidents");
    setRows(response.data);
  };

  useEffect(() => {
    void loadRows();
  }, []);

  const resolveIncident = async (id: number) => {
    await client.patch(`/incidents/${id}/resolve`);
    setMessage(`Incident ${id} was resolved.`);
    await loadRows();
  };

  const assignTechnician = async (id: number) => {
    await client.patch(`/incidents/${id}/assign`, {
      technicianEmail: "tech1@campus.edu",
    });
    setMessage(`Technician was assigned to incident ${id}.`);
    await loadRows();
  };

  const canResolve = user?.role === "TECHNICIAN" || user?.role === "MANAGER" || user?.role === "ADMIN";

  return (
    <main className="panel">
      <div className="section-head">
        <div>
          <h1>Maintenance and Incident Workflow</h1>
          <p className="muted">Fault reporting, technician updates, and status transitions.</p>
        </div>
        <span className="stat-chip">{rows.length} Open Tickets</span>
      </div>
      {message && <p className="notice">{message}</p>}
      <div className="incident-grid">
        {rows.map((row) => (
          <article className="incident-card" key={row.id}>
            <h3>{row.title}</h3>
            <p>
              Ticket #{row.id} <span className={`tag ${row.status.toLowerCase()}`}>{row.status}</span>
            </p>
            {row.assignedTechnicianEmail && <p className="muted">Assigned: {row.assignedTechnicianEmail}</p>}
            {canResolve && (
              <button onClick={() => void resolveIncident(row.id)}>Resolve Ticket</button>
            )}
            <ProtectedButton
              className="accent-btn"
              allowedRoles={["ADMIN"]}
              onClick={() => void assignTechnician(row.id)}
            >
              Assign Technician
            </ProtectedButton>
          </article>
        ))}
      </div>
    </main>
  );
}
