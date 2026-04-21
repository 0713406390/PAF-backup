import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth } from "../../context/AuthContext";
export default function LoginPage() {
    const { loginWithGoogle } = useAuth();
    return (_jsxs("main", { className: "hero-shell", children: [_jsxs("section", { className: "hero-panel", children: [_jsx("p", { className: "eyebrow", children: "Smart Campus Operations Hub" }), _jsx("h1", { children: "Operational control for every room, lab, and technician lane." }), _jsx("p", { className: "subcopy", children: "Secure sign-in with Google, role-based dashboards, and protected workflows for incident and booking management." }), _jsxs("button", { className: "google-btn", onClick: loginWithGoogle, children: [_jsx("span", { children: "G" }), "Continue with Google"] })] }), _jsxs("aside", { className: "signal-panel", children: [_jsxs("div", { className: "signal-card", children: [_jsx("h3", { children: "Roles Enabled" }), _jsx("p", { children: "USER, ADMIN, MANAGER, TECHNICIAN" })] }), _jsxs("div", { className: "signal-card", children: [_jsx("h3", { children: "Security" }), _jsx("p", { children: "OAuth 2.0 + backend RBAC + protected frontend routes" })] })] })] }));
}
