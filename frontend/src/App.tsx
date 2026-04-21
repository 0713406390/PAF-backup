import { Link, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import AuthCallbackPage from "./features/auth/AuthCallbackPage";
import LoginPage from "./features/auth/LoginPage";
import UnauthorizedPage from "./features/auth/UnauthorizedPage";
import BookingsPage from "./features/bookings/BookingsPage";
import IncidentsPage from "./features/incidents/IncidentsPage";
import AdminPage from "./features/operations/AdminPage";
import ManagerPage from "./features/operations/ManagerPage";
import TechnicianPage from "./features/operations/TechnicianPage";

function HomePage() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="panel">
      <div className="hero-banner">
        <p className="eyebrow">Operations Snapshot</p>
        <h1>Welcome, {user?.fullName}</h1>
        <p>
          Access level: <span className="role-pill">{user?.role}</span>
        </p>
      </div>

      <section className="kpi-grid">
        <article className="kpi-card">
          <h3>Bookings Queue</h3>
          <p>14 pending approvals</p>
        </article>
        <article className="kpi-card">
          <h3>Open Incidents</h3>
          <p>6 active maintenance tickets</p>
        </article>
        <article className="kpi-card">
          <h3>Utilization</h3>
          <p>87% room usage this week</p>
        </article>
      </section>
    </main>
  );
}

function TopBar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="topbar">
      <div className="brand">Smart Campus Hub</div>
      <nav>
        <Link to="/">Home</Link>
        {isAuthenticated && <Link to="/bookings">Bookings</Link>}
        {isAuthenticated && <Link to="/incidents">Incidents</Link>}
        {user?.role === "ADMIN" && <Link to="/admin">Admin</Link>}
        {(user?.role === "MANAGER" || user?.role === "ADMIN") && <Link to="/manager">Manager</Link>}
        {(user?.role === "TECHNICIAN" || user?.role === "MANAGER" || user?.role === "ADMIN") && (
          <Link to="/technician">Technician</Link>
        )}
      </nav>
      <div className="actions">
        {isAuthenticated ? (
          <button className="ghost-btn" onClick={() => void logout()}>
            Sign out
          </button>
        ) : (
          <Link className="ghost-btn" to="/login">
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}

export default function App() {
  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute allowedRoles={["USER", "MANAGER", "ADMIN"]}>
              <BookingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/incidents"
          element={
            <ProtectedRoute allowedRoles={["USER", "TECHNICIAN", "MANAGER", "ADMIN"]}>
              <IncidentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRoles={["MANAGER", "ADMIN"]}>
              <ManagerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/technician"
          element={
            <ProtectedRoute allowedRoles={["TECHNICIAN", "MANAGER", "ADMIN"]}>
              <TechnicianPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
