import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
export default function AuthCallbackPage() {
    const { refreshUser } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const sync = async () => {
            await refreshUser();
            navigate("/", { replace: true });
        };
        void sync();
    }, [navigate, refreshUser]);
    return (_jsx("main", { className: "panel route-center", children: _jsx("p", { className: "pulse", children: "Finalizing secure sign-in..." }) }));
}
