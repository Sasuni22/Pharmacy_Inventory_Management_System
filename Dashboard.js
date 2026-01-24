import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard({ token }) {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/medicines/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setMedicines(res.data))
      .catch((err) => console.log(err));
  }, [token]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>💊 Pharmacy Inventory Dashboard</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Expiry</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
