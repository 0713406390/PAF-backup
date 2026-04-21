import { useEffect, useState } from "react";
import client from "../../api/client";

export default function AdminPage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      const response = await client.get<{ message: string }>("/ops/admin");
      setMessage(response.data.message);
    };
    void load();
  }, []);

  return (
    <main className="panel">
      <h1>Admin Control Room</h1>
      <p>{message}</p>
    </main>
  );
}
