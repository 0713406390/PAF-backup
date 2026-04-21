import { useEffect, useState } from "react";
import client from "../../api/client";

export default function TechnicianPage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      const response = await client.get<{ message: string }>("/ops/technician");
      setMessage(response.data.message);
    };
    void load();
  }, []);

  return (
    <main className="panel">
      <h1>Technician Workbench</h1>
      <p>{message}</p>
    </main>
  );
}
