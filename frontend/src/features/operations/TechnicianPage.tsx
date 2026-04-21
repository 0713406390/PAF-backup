import { useEffect, useState } from "react";
import client from "../../api/client";

export default function TechnicianPage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      const response = await client.get<{ message: string }>("/ops/technician");
      setMessage(response.data.message);
    };
    void load();
  }, []);

  return (
    <main className="panel">
      <div className="section-head">
        <div>
          <h1>Technician Workbench</h1>
          <p className="muted">Focused workspace for diagnostics, updates, and resolution handoff.</p>
        </div>
        <span className="stat-chip">Field Ready</span>
      </div>
      <div className="workspace-grid">
        <article className="workspace-card">
          <h3>Workbench Feed</h3>
          <p>{message}</p>
        </article>
        <article className="workspace-card">
          <h3>Today's Route</h3>
          <ul>
            <li>Inspect projector fault in Lecture Hall 3</li>
            <li>Close HVAC ticket for Lab Cluster B</li>
            <li>Update resolution notes for helpdesk review</li>
          </ul>
        </article>
      </div>
    </main>
  );
}
