import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import client from "../../api/client";
import { useAuth } from "../../context/AuthContext";
export default function IncidentsPage() {
    const { user } = useAuth();
    const [rows, setRows] = useState([]);
    const [message, setMessage] = useState("");
    const loadRows = async () => {
        const response = await client.get("/incidents");
        setRows(response.data);
    };
    useEffect(() => {
        void loadRows();
    }, []);
    const resolveIncident = async (id) => {
        await client.patch(`/incidents/${id}/resolve`);
        setMessage(`Incident ${id} was resolved.`);
    };
    const canResolve = user?.role === "TECHNICIAN" || user?.role === "MANAGER" || user?.role === "ADMIN";
    return (_jsxs("main", { className: "panel", children: [_jsx("h1", { children: "Maintenance and Incident Workflow" }), _jsx("p", { className: "muted", children: "Fault reporting, technician updates, and status transitions." }), message && _jsx("p", { className: "notice", children: message }), _jsx("div", { className: "incident-grid", children: rows.map((row) => (_jsxs("article", { className: "incident-card", children: [_jsx("h3", { children: row.title }), _jsxs("p", { children: ["Ticket #", row.id, " ", _jsx("span", { className: `tag ${row.status.toLowerCase()}`, children: row.status })] }), canResolve && (_jsx("button", { onClick: () => void resolveIncident(row.id), children: "Mark Resolved" }))] }, row.id))) })] }));
}
