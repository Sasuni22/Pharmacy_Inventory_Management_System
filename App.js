import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// ---------------------- LOGIN ----------------------
function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });
      setToken(response.data.access);
      setError("");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="container login-container">
      <h2><b>Pharmacy Login</b></h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn login-btn">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

// ---------------------- DASHBOARD ----------------------
function Dashboard({ token, logout }) {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    id: null,
    name: "",
    brand: "",
    quantity: "",
    price: "",
    expiry_date: "",
  });
  const [editing, setEditing] = useState(false);

  const headers = { Authorization: `Bearer ${token}` };

  // Fetch medicines
  const fetchMedicines = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/medicines/", { headers });
      setMedicines(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch medicines");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  // Add / Edit medicine
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(
          `http://127.0.0.1:8000/api/medicines/${form.id}/`,
          form,
          { headers }
        );
        setEditing(false);
      } else {
        await axios.post("http://127.0.0.1:8000/api/medicines/", form, { headers });
      }
      setForm({ id: null, name: "", brand: "", quantity: "", price: "", expiry_date: "" });
      fetchMedicines();
    } catch (err) {
      setError("Failed to save medicine");
    }
  };

  // Edit button
  const handleEdit = (med) => {
    setForm(med);
    setEditing(true);
  };

  // Delete button
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/medicines/${id}/`, { headers });
        fetchMedicines();
      } catch (err) {
        setError("Failed to delete medicine");
      }
    }
  };

  // Sell medicine
  const sellMedicine = async (id) => {
    const amount = parseInt(prompt("Enter quantity to sell:", "1"));
    if (!amount || amount <= 0) return;

    try {
      await axios.post(`http://127.0.0.1:8000/api/medicines/${id}/sell/`, { amount }, { headers });
      fetchMedicines();
    } catch (err) {
      alert(err.response.data.error || "Failed to sell medicine");
    }
  };

  // Restock medicine
  const restockMedicine = async (id) => {
    const amount = parseInt(prompt("Enter quantity to add:", "1"));
    if (!amount || amount <= 0) return;

    try {
      await axios.post(`http://127.0.0.1:8000/api/medicines/${id}/restock/`, { amount }, { headers });
      fetchMedicines();
    } catch (err) {
      alert(err.response.data.error || "Failed to restock medicine");
    }
  };

  if (loading) return <p>Loading medicines...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="container">
      <header className="dashboard-header">
        <h1>Pharmacy Dashboard</h1>
        <button className="btn logout-btn" onClick={logout}>Logout</button>
      </header>

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} className="form">
        <h2>{editing ? "Edit Medicine" : "Add Medicine"}</h2>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Brand"
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          type="date"
          placeholder="Expiry Date"
          value={form.expiry_date}
          onChange={(e) => setForm({ ...form, expiry_date: e.target.value })}
          required
        />
        <div className="form-buttons">
          <button type="submit" className="btn add-btn">{editing ? "Update" : "Add"}</button>
          {editing && (
            <button
              type="button"
              className="btn cancel-btn"
              onClick={() => {
                setEditing(false);
                setForm({ id: null, name: "", brand: "", quantity: "", price: "", expiry_date: "" });
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Medicines Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Expiry</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((med) => (
            <tr key={med.id}>
              <td>{med.name}</td>
              <td>{med.brand}</td>
              <td>{med.quantity}</td>
              <td>{med.price}</td>
              <td>{med.expiry_date}</td>
              <td>
                <button className="btn edit-btn" onClick={() => handleEdit(med)}>Edit</button>
                <button className="btn cancel-btn" onClick={() => handleDelete(med.id)}>Delete</button>
                <button className="btn sell-btn" onClick={() => sellMedicine(med.id)}>Sell</button>
                <button className="btn restock-btn" onClick={() => restockMedicine(med.id)}>Restock</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------- APP ----------------------
function App() {
  const [token, setToken] = useState("");
  const logout = () => setToken("");
  return <div>{!token ? <Login setToken={setToken} /> : <Dashboard token={token} logout={logout} />}</div>;
}

export default App;
