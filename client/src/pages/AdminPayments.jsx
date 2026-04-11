import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

const AdminPayments = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch payments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const markAsPaid = async (orderId) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/orders/${orderId}/pay`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) {
        alert("Failed to update payment");
        return;
      }

      fetchPayments(); // refresh UI
    } catch (err) {
      alert("Server error");
    }
  };

  const statusColor = (status) =>
    status === "Paid" ? "text-success" : "text-warning";

  return (
    <>
      <AdminNavbar />

      <div className="container mt-4">
        <h4 className="fw-bold mb-3">Payments</h4>

        {loading ? (
          <div className="alert alert-info">Loading payments...</div>
        ) : (
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Payment ID</th>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount (₹)</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id.slice(-6)}</td>
                      <td>{order._id.slice(-6)}</td>

                      <td className="fw-semibold">
                        {order.customer?.name || "Customer"}
                      </td>

                      <td className="fw-semibold">
                        ₹{order.grandTotal}
                      </td>

                      <td>{order.paymentMethod}</td>

                      <td className={`fw-bold ${statusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </td>

                      <td>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>

                      <td>
                        {order.paymentStatus === "Pending" ? (
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => markAsPaid(order._id)}
                          >
                            Mark as Paid
                          </button>
                        ) : (
                          <span className="text-success">✔ Verified</span>
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

export default AdminPayments;

