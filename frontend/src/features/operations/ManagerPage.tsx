import { useEffect, useState } from "react";
import client from "../../api/client";

export default function ManagerPage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      const response = await client.get<{ message: string }>("/ops/manager");
      setMessage(response.data.message);
    };
    void load();
  }, []);

  return (
    <main className="panel">
      <div className="section-head">
        <div>
          <h1>Manager Overview Deck</h1>
          <p className="muted">Operational planning, assignment flow, and completion tracking.</p>
        </div>
        <span className="stat-chip">Coordination Mode</span>
      </div>
      <div className="workspace-grid">
        <article className="workspace-card">
          <h3>Manager Brief</h3>
          <p>{message}</p>
        </article>
        <article className="workspace-card">
          <h3>Priority Checklist</h3>
          <ul>
            <li>Approve pending high-impact bookings</li>
            <li>Review delayed maintenance tickets</li>
            <li>Balance technician workload</li>
          </ul>
        </article>
      </div>
    </main>
  );
}
