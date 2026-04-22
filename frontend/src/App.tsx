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
import DashboardPage from "./pages/DashboardPage";

function TopBar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="topbar">
      <div className="brand-wrap">
        <div className="brand">SmartCampus</div>
        <p className="brand-subtitle">Operations & Management</p>
      </div>
      <nav>
        <Link to="/">Dashboard</Link>
        {isAuthenticated && <Link to="/bookings">Bookings</Link>}
        {isAuthenticated && <Link to="/incidents">Incidents</Link>}
        {user?.role === "ADMIN" && <Link to="/admin">Admin</Link>}
        {(user?.role === "MANAGER" || user?.role === "ADMIN") && <Link to="/manager">Manager Deck</Link>}
      </nav>
      <div className="actions">
        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className="role-pill">{user?.role}</span>
            <button className="ghost-btn" onClick={() => void logout()}>
              Log out
            </button>
          </div>
        ) : (
          <Link className="ghost-btn" to="/login">
            Enter Hub
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
              <DashboardPage />
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
