import { useState, useEffect } from "react";

const UpdateItem = ({ itemId = "1" }) => {
  const [item, setItem] = useState(null);
  const [updatedItem, setUpdatedItem] = useState({});
  const [error, setError] = useState(null);

  const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${API_URI}/${itemId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch item");
        }
        const data = await response.json();
        setItem(data);
        setUpdatedItem(data); 
      } catch (err) {
        setError(err.message);
      }
    };

    fetchItem();
  }, [API_URI, itemId]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URI}/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
      });
      if (!response.ok) {
        throw new Error("Failed to update item");
      }
      const data = await response.json();
      setItem(data); // Update the item with the response
      alert("Item updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Item</h2>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={updatedItem.name || ""}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Status:
          <input
            type="text"
            name="status"
            value={updatedItem.status || ""}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateItem;