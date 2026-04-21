import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
export default function UnauthorizedPage() {
    return (_jsxs("main", { className: "panel route-center", children: [_jsx("h1", { children: "Access Restricted" }), _jsx("p", { children: "Your current role does not have permission for this section." }), _jsx(Link, { className: "action-link", to: "/", children: "Return to dashboard" })] }));
}
