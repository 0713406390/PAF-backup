import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  return (
    <main className="panel route-center">
      <h1>Access Restricted</h1>
      <p>Your current role does not have permission for this section.</p>
      <Link className="action-link" to="/">
        Return to dashboard
      </Link>
    </main>
  );
}
