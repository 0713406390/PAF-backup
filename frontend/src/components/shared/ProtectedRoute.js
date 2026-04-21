import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
export default function ProtectedRoute({ children, allowedRoles }) {
    const { isLoading, isAuthenticated, user } = useAuth();
    const location = useLocation();
    if (isLoading) {
        return (_jsx("main", { className: "panel route-center", children: _jsx("p", { className: "pulse", children: "Loading your campus portal..." }) }));
    }
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/login", state: { from: location }, replace: true });
    }
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return _jsx(Navigate, { to: "/unauthorized", replace: true });
    }
    return children;
}
