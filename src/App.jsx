import { useState, useEffect } from "react";
import UpdateItem from "./components/UpdateItem";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${API_URI}/1`); 
        if (!response.ok) {
          throw new Error("Failed to fetch item");
        }
        const data = await response.json();
        setItem(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchItem();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!item) {
    return <p>Loading...</p>;
  }

  return <UpdateItem itemId="1" />;
}

export default App;