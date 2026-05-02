import { useEffect, useState } from "react";
import { fetchNotifications } from "./api";
import { getTop10 } from "./utils";

function App() {
  const [allData, setAllData] = useState([]);
  const [top10, setTop10] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      console.log("🚀 App mounted – starting data fetch");
      setLoading(true);
      setError(null);

      let data = await fetchNotifications();

      if (!data || data.length === 0) {
        console.warn("⚠️ Using fallback demo data");

        data = [
          {
            ID: 1,
            Message: "Google Hiring",
            Type: "Placement",
            Timestamp: new Date().toISOString(),
          },
          {
            ID: 2,
            Message: "Mid Sem Results",
            Type: "Result",
            Timestamp: new Date().toISOString(),
          },
          {
            ID: 3,
            Message: "Tech Fest",
            Type: "Event",
            Timestamp: new Date().toISOString(),
          },
          {
            ID: 4,
            Message: "Amazon Hiring",
            Type: "Placement",
            Timestamp: new Date().toISOString(),
          },
        ];

        setError("API not reachable / unauthorized → showing demo data");
      }

      console.log("📋 Final data used by UI:", data);

      setAllData(data);
      setTop10(getTop10(data));
      setLoading(false);
    }

    loadData();
  }, []);

  const filtered =
    filter === "All"
      ? allData
      : allData.filter((item) => item.Type === filter);

  if (loading) {
    return (
      <div style={styles.center}>
        <p>Loading notifications...</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>📢 Campus Notification System</h1>

      {error && <div style={styles.errorBox}>⚠️ {error}</div>}

      <h2 style={styles.sectionTitle}>🏆 Top 10 Notifications</h2>
      {top10.length === 0 ? (
        <p style={styles.empty}>No data available</p>
      ) : (
        top10.map((item) => (
          <div key={item.ID} style={styles.card}>
            <strong>{item.Message}</strong>
            <p style={styles.meta}>
              Type: {item.Type} |{" "}
              {new Date(item.Timestamp).toLocaleString()}
            </p>
          </div>
        ))
      )}

      <h2 style={styles.sectionTitle}>📋 All Notifications</h2>

      <div style={styles.filterRow}>
        {["All", "Placement", "Result", "Event"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            style={{
              ...styles.btn,
              background: filter === type ? "#4f46e5" : "#374151",
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={styles.empty}>No notifications found</p>
      ) : (
        filtered.map((item) => (
          <div key={item.ID} style={styles.card}>
            <strong>{item.Message}</strong>
            <p style={styles.meta}>
              Type: {item.Type} |{" "}
              {new Date(item.Timestamp).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "24px",
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    color: "#f9fafb",
    background: "#111827",
    minHeight: "100vh",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    color: "#f9fafb",
    background: "#111827",
  },
  title: {
    fontSize: "1.8rem",
    marginBottom: "16px",
  },
  sectionTitle: {
    fontSize: "1.2rem",
    marginTop: "28px",
    marginBottom: "12px",
    borderBottom: "1px solid #374151",
    paddingBottom: "6px",
  },
  card: {
    background: "#1f2937",
    borderRadius: "8px",
    padding: "12px 16px",
    marginBottom: "10px",
  },
  meta: {
    color: "#9ca3af",
    fontSize: "0.85rem",
    marginTop: "4px",
  },
  filterRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "14px",
    flexWrap: "wrap",
  },
  btn: {
    padding: "6px 14px",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  errorBox: {
    background: "#7f1d1d",
    border: "1px solid #ef4444",
    borderRadius: "8px",
    padding: "12px 16px",
    marginBottom: "16px",
    color: "#fca5a5",
  },
  empty: {
    color: "#6b7280",
    fontStyle: "italic",
  },
};

export default App;