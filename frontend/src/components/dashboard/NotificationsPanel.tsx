import { BellRing, Clock } from "lucide-react";
import { useNotifications } from "../../hooks/useNotifications";

function formatTime(timestamp: string) {
  const value = new Date(timestamp);
  if (Number.isNaN(value.getTime())) {
    return "Just now";
  }
  return value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function NotificationsPanel() {
  const { rows, isLoading } = useNotifications(true);

  return (
    <article className="workspace-card notifications-panel">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <BellRing size={20} color="var(--primary)" />
          <h3>Notifications</h3>
        </div>
        {rows.length > 0 && <span className="role-pill">{rows.length} new</span>}
      </div>
      
      {isLoading && <p className="muted">Loading alerts...</p>}
      {!isLoading && rows.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <p className="muted">All caught up!</p>
        </div>
      )}
      
      {!isLoading && rows.length > 0 && (
        <div className="notification-list">
          {rows.map((item) => (
            <div key={item.id} className="notification-item">
              <p style={{ fontSize: '0.935rem', fontWeight: 500, marginBottom: '0.35rem' }}>{item.message}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                <Clock size={12} />
                <span>{formatTime(item.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
