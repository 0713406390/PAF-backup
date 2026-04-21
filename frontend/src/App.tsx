import { Link, Route, Routes } from "react-router-dom";

function HomePage() {
  return (
    <main className="container">
      <h1>Smart Campus Operations Hub</h1>
      <p>Starter scaffold ready for your assessment workflows.</p>
      <div className="grid">
        <section className="card">
          <h2>Bookings</h2>
          <p>Rooms, labs, and equipment reservation management.</p>
        </section>
        <section className="card">
          <h2>Maintenance</h2>
          <p>Incident reporting, technician updates, and resolutions.</p>
        </section>
      </div>
    </main>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <main className="container">
      <h1>{title}</h1>
      <p>Implementation pending.</p>
    </main>
  );
}

export default function App() {
  return (
    <>
      <header className="topbar">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/bookings">Bookings</Link>
          <Link to="/incidents">Incidents</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bookings" element={<PlaceholderPage title="Bookings" />} />
        <Route path="/incidents" element={<PlaceholderPage title="Incidents" />} />
      </Routes>
    </>
  );
}
