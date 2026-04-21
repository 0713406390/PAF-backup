import { useEffect, useState } from "react";
import client from "../../api/client";

interface BookingRow {
  id: number;
  asset: string;
  status: string;
}

export default function BookingsPage() {
  const [rows, setRows] = useState<BookingRow[]>([]);

  useEffect(() => {
    const load = async () => {
      const response = await client.get<BookingRow[]>("/bookings");
      setRows(response.data);
    };
    void load();
  }, []);

  return (
    <main className="panel">
      <h1>Facility and Asset Bookings</h1>
      <p className="muted">View current requests, approvals, and resource availability.</p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Asset</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.asset}</td>
                <td>
                  <span className={`tag ${row.status.toLowerCase()}`}>{row.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
