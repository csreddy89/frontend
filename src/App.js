import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");  // state to store backend message
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from Django REST Framework backend
    const API_URL = process.env.REACT_APP_API_URL;

    fetch(`${API_URL}/api/hello/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setMessage(data.message);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);  // empty dependency array → runs once on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>React + Django REST Framework Example</h1>
      <p>Message from backend: <strong>{message}</strong></p>
    </div>
  );
}

export default App;
