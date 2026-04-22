import { User, Settings, Key } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const { loginWithGoogle } = useAuth();

  return (
    <main className="login-container">
      <header className="login-header">
        <div className="app-logo">S</div>
        <h1>SmartCampus</h1>
        <p>Operations & Resource Management Hub</p>
      </header>

      <section className="login-card">
        <h2>Welcome back</h2>
        <p>Select a role to sign in to the platform</p>

        <div className="login-options">
          <button className="login-option-btn" onClick={loginWithGoogle}>
            <div className="login-option-icon">
              <User size={20} />
            </div>
            <div className="login-option-text">
              <h3>Sign in as Student / Staff</h3>
            </div>
          </button>

          <button className="login-option-btn" onClick={loginWithGoogle}>
            <div className="login-option-icon">
              <Settings size={20} />
            </div>
            <div className="login-option-text">
              <h3>Sign in as Technician</h3>
            </div>
          </button>

          <button className="login-option-btn" onClick={loginWithGoogle}>
            <div className="login-option-icon">
              <Key size={20} />
            </div>
            <div className="login-option-text">
              <h3>Sign in as Administrator</h3>
            </div>
          </button>
        </div>
      </section>

      <footer className="login-footer">
        University SSO Simulated Environment
      </footer>
    </main>
  );
}
