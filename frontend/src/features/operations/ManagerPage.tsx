import { useEffect, useState } from "react";
import client from "../../api/client";

export default function ManagerPage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      const response = await client.get<{ message: string }>("/ops/manager");
      setMessage(response.data.message);
    };
    void load();
  }, []);

  return (
    <main className="panel">
      <h1>Manager Overview Deck</h1>
      <p>{message}</p>
    </main>
  );
}
