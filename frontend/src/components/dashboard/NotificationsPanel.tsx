import { useNotifications } from "../../hooks/useNotifications";

function formatTime(timestamp: string) {
  const value = new Date(timestamp);
  if (Number.isNaN(value.getTime())) {
    return "Just now";
  }
  return value.toLocaleString();
}

export default function NotificationsPanel() {
  const { rows, isLoading } = useNotifications(true);

  return (
    <article className="workspace-card notifications-panel">
      <div className="section-head compact-head">
        <h3>Unread Alerts</h3>
        <span className="stat-chip">{rows.length}</span>
      </div>
      {isLoading && <p className="muted">Loading notifications...</p>}
      {!isLoading && rows.length === 0 && <p className="muted">No unread alerts at the moment.</p>}
      {!isLoading && rows.length > 0 && (
        <ul className="notification-list">
          {rows.map((item) => (
            <li key={item.id} className="notification-item">
              <p>{item.message}</p>
              <time dateTime={item.createdAt}>{formatTime(item.createdAt)}</time>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
