import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/orders/my", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Failed to fetch orders");
          return;
        }

        setOrders(data);
      } catch (error) {
        alert("Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const statusColor = (status) => {
    if (status === "Pending") return "text-warning";
    if (status === "Processing") return "text-primary";
    if (status === "Completed") return "text-success";
    if (status === "Rejected") return "text-danger";
    return "";
  };

  const paymentColor = (status) =>
    status === "Paid" ? "text-success" : "text-warning";

  return (
    <div>
      {/* ===== NAVBAR ===== */}
      <nav
        className="navbar navbar-expand-lg px-4"
        style={{ backgroundColor: "#1e3a8a", minHeight: "100px" }}
      >
        <span className="navbar-brand text-white fw-bold">
          My Orders
        </span>

        <div className="ms-auto">
          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => navigate("/customer")}
          >
            Back to Dashboard
          </button>
        </div>
      </nav>

      {/* ===== PAGE CONTENT ===== */}
      <div className="container mt-4">
        <h4 className="fw-bold mb-3">Order History</h4>

        {loading && (
          <div className="alert alert-info">Loading orders...</div>
        )}

        {!loading && orders.length === 0 && (
          <div className="alert alert-info">
            You have not placed any orders yet.
          </div>
        )}

        {!loading && orders.length > 0 && (
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Order ID</th>
                    <th>Items</th>
                    <th>Total (₹)</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id.slice(-6)}</td>

                      <td>
                        <ul className="mb-0 ps-3">
                          {order.items.map((item, index) => (
                            <li key={index}>
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
                        <span className="text-muted fw-normal">
                          {" "}({order.paymentMethod})
                        </span>
                      </td>

                      <td
                        className={`fw-bold ${statusColor(
                          order.orderStatus
                        )}`}
                      >
                        {order.orderStatus}
                      </td>

                      <td className="text-muted">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>

                     
                      <td>
                        {order.orderStatus === "Completed" ? (
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() =>
                              navigate(`/customer/feedback`)
                            }
                          >
                            Give Feedback
                          </button>
                        ) : (
                          <span className="text-muted">—</span>
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
    </div>
  );
};

export default MyOrders;
