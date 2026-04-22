import { useEffect, useState } from "react";
import client from "../../api/client";
import { Calendar, Hash, Box, Activity } from "lucide-react";

interface BookingRow {
  id: number;
  asset: string;
  status: string;
}

export default function BookingsPage() {
  const [rows, setRows] = useState<BookingRow[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await client.get<BookingRow[]>("/bookings");
        setRows(response.data);
      } catch (err) {
        console.error("Failed to load bookings", err);
      }
    };
    void load();
  }, []);

  return (
    <main className="panel">
      <header className="hero-banner" style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <Calendar size={32} color="var(--primary)" />
          <h1>Facility & Assets</h1>
        </div>
        <p className="muted">Manage room reservations and equipment bookings across the campus.</p>
      </header>

      <div className="workspace-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Recent Requests</h2>
          <span className="role-pill">{rows.length} Total</span>
        </div>
        
        <div className="table-wrap" style={{ border: 'none', margin: '0', borderRadius: '0' }}>
          <table>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ paddingLeft: '1.5rem' }}><div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Hash size={14} /> ID</div></th>
                <th><div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Box size={14} /> Asset / Resource</div></th>
                <th style={{ paddingRight: '1.5rem' }}><div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity size={14} /> Status</div></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td style={{ paddingLeft: '1.5rem', fontWeight: 600, color: 'var(--text-muted)' }}>#{row.id}</td>
                  <td style={{ fontWeight: 500 }}>{row.asset}</td>
                  <td style={{ paddingRight: '1.5rem' }}>
                    <span className="role-pill" style={{ 
                      background: row.status === 'APPROVED' ? '#dcfce7' : row.status === 'PENDING' ? '#fef3c7' : '#fee2e2',
                      color: row.status === 'APPROVED' ? '#166534' : row.status === 'PENDING' ? '#92400e' : '#991b1b'
                    }}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
