import { useEffect, useState } from "react";
import client from "../../api/client";

export default function AdminPage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      const response = await client.get<{ message: string }>("/ops/admin");
      setMessage(response.data.message);
    };
    void load();
  }, []);

  return (
    <main className="panel">
      <div className="section-head">
        <div>
          <h1>Admin Control Room</h1>
          <p className="muted">Policy controls, platform access, and campus-wide oversight.</p>
        </div>
        <span className="stat-chip">System Authority</span>
      </div>
      <div className="workspace-grid">
        <article className="workspace-card">
          <h3>Control Status</h3>
          <p>{message}</p>
        </article>
        <article className="workspace-card">
          <h3>Admin Actions</h3>
          <ul>
            <li>Review role assignments</li>
            <li>Audit critical operations</li>
            <li>Approve service escalations</li>
          </ul>
        </article>
      </div>
    </main>
  );
}
