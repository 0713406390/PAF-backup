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

  return (
    <main className="panel route-center">
      <p className="pulse">Preparing your campus dashboard...</p>
    </main>
  );
}
