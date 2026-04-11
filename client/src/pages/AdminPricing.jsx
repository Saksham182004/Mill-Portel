import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

const AdminPricing = () => {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");

  // 🔹 fetch prices
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/pricing", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setItems(data);
      } catch (err) {
        alert("Failed to load pricing");
      }
    };

    fetchPricing();
  }, []);

  // 🔹 change price locally
  const handleChange = (index, value) => {
    const updated = [...items];
    updated[index].price = value;
    setItems(updated);
  };

  // 🔹 save price to DB
  const handleSave = async (item) => {
    try {
      const res = await fetch("http://localhost:8080/api/pricing", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          item: item.item,
          price: item.price,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to save");
        return;
      }

      alert("Price updated successfully ✅");
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="container mt-4">
        <h4 className="fw-bold mb-3">Pricing Management</h4>

        <div className="card shadow-sm">
          <div className="card-body p-0">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Item</th>
                  <th>Price (₹)</th>
                  <th>Unit</th>
                  <th>Last Updated</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item, index) => (
                  <tr key={item._id}>
                    <td className="fw-semibold">{item.item}</td>

                    <td style={{ maxWidth: "160px" }}>
                      <div className="input-group">
                        <span className="input-group-text">₹</span>
                        <input
                          type="number"
                          className="form-control"
                          value={item.price}
                          onChange={(e) =>
                            handleChange(index, e.target.value)
                          }
                        />
                      </div>
                    </td>

                    <td>{item.unit}</td>

                    <td className="text-muted">
                      {new Date(item.updatedAt).toLocaleDateString()}
                    </td>

                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleSave(item)}
                      >
                        Save
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

        <div className="alert alert-info mt-3">
          <strong>Note:</strong> Updated prices will apply to new orders only.
        </div>
      </div>
    </>
  );
};

export default AdminPricing;
