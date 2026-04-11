import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // ================= FETCH ALL ORDERS =================
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ================= UPDATE ORDER STATUS =================
  const updateStatus = async (orderId, status) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/orders/${orderId}/status`,
        {
          method: "PUT", // ✅ MUST be PUT (matches backend)
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update order");
        return;
      }

      fetchOrders(); // refresh UI
    } catch (err) {
      alert("Server error");
    }
  };

  // ================= HELPERS =================
  const paymentColor = (value) =>
    value === "Paid" ? "text-success" : "text-warning";

  const statusColor = (value) => {
    if (value === "Pending") return "text-warning";
    if (value === "Processing") return "text-primary";
    if (value === "Completed") return "text-success";
    if (value === "Rejected") return "text-danger";
    return "";
  };

  // ================= UI =================
  return (
    <>
      <AdminNavbar />

      <div className="container mt-4">
        <h4 className="fw-bold mb-3">Orders</h4>

        {loading ? (
          <div className="alert alert-info">Loading orders...</div>
        ) : (
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total (₹)</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id.slice(-6)}</td>

                      <td className="fw-semibold">
                        {order.customer?.name || "Customer"}
                      </td>

                      <td>
                        <ul className="mb-0 ps-3">
                          {order.items.map((item) => (
                            <li key={item._id}>
                              {item.name} ({item.qty}kg)
                            </li>
                          ))}
                        </ul>
                      </td>

                      <td className="fw-semibold">
                        ₹{order.grandTotal}
                      </td>

                      <td
                        className={`fw-bold ${paymentColor(
                          order.paymentStatus
                        )}`}
                      >
                        {order.paymentStatus}
                      </td>

                      <td
                        className={`fw-bold ${statusColor(
                          order.orderStatus
                        )}`}
                      >
                        {order.orderStatus}
                      </td>

                      {/* ============ ACTION COLUMN ============ */}
                      <td>
                        {/* PENDING */}
                        {order.orderStatus === "Pending" && (
                          <>
                            <button
                              className="btn btn-sm btn-success me-2"
                              onClick={() =>
                                updateStatus(order._id, "Processing")
                              }
                            >
                              Accept
                            </button>

                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() =>
                                updateStatus(order._id, "Rejected")
                              }
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {/* PROCESSING */}
                        {order.orderStatus === "Processing" && (
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() =>
                              updateStatus(order._id, "Completed")
                            }
                          >
                            Mark Completed
                          </button>
                        )}

                        {/* COMPLETED */}
                        {order.orderStatus === "Completed" && (
                          <span className="text-success fw-semibold">
                            Completed
                          </span>
                        )}

                        {/* REJECTED */}
                        {order.orderStatus === "Rejected" && (
                          <span className="text-danger fw-semibold">
                            Rejected
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminOrders;
