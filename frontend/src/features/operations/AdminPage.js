import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import client from "../../api/client";
export default function AdminPage() {
    const [message, setMessage] = useState("");
    useEffect(() => {
        const load = async () => {
            const response = await client.get("/ops/admin");
            setMessage(response.data.message);
        };
        void load();
    }, []);
    return (_jsxs("main", { className: "panel", children: [_jsx("h1", { children: "Admin Control Room" }), _jsx("p", { children: message })] }));
}
