import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import client from "../../api/client";
export default function BookingsPage() {
    const [rows, setRows] = useState([]);
    useEffect(() => {
        const load = async () => {
            const response = await client.get("/bookings");
            setRows(response.data);
        };
        void load();
    }, []);
    return (_jsxs("main", { className: "panel", children: [_jsx("h1", { children: "Facility and Asset Bookings" }), _jsx("p", { className: "muted", children: "Live reservation stream from secure booking endpoints." }), _jsx("div", { className: "table-wrap", children: _jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "ID" }), _jsx("th", { children: "Asset" }), _jsx("th", { children: "Status" })] }) }), _jsx("tbody", { children: rows.map((row) => (_jsxs("tr", { children: [_jsx("td", { children: row.id }), _jsx("td", { children: row.asset }), _jsx("td", { children: _jsx("span", { className: `tag ${row.status.toLowerCase()}`, children: row.status }) })] }, row.id))) })] }) })] }));
}
