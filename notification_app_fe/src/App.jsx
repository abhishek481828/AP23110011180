import { useEffect, useState } from "react";
import { fetchNotifications } from "./api";
import { getTop10 } from "./utils";
import { Log } from "../../logging_middleware/log";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        Log("frontend", "info", "component", "Fetching notifications");

        const res = await fetchNotifications();

        Log("frontend", "info", "api", "Notifications fetched successfully");

        const top = getTop10(res.notifications || []);
        setData(top);
      } catch (err) {
        console.error(err);
        setError("Failed to load notifications");

        Log("frontend", "error", "component", "Error fetching notifications");
      }
    };

    loadData();
  }, []);

  return (
    <div style={{ padding: "20px", color: "white", background: "#0f172a", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center" }}>Top 10 Notifications</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data.length === 0 && !error && <p>Loading...</p>}

      {data.map((item) => (
        <div
          key={item.ID}
          style={{
            background: "#1e293b",
            margin: "10px",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{item.Message}</h3>
          <p>Type: {item.Type}</p>
          <p>{item.Timestamp}</p>
        </div>
      ))}
    </div>
  );
}

export default App;