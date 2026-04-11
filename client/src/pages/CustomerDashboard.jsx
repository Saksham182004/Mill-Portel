import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* ===== CUSTOMER NAVBAR ===== */}
      <nav className="navbar navbar-expand-lg px-4" style={{ backgroundColor: "#1e3a8a", minHeight: "100px" }}>
        <span className="navbar-brand text-white fw-bold">
          Mill Portal
        </span>

        <div className="ms-auto d-flex gap-3">
          {/* <button
            className="btn btn-outline-light btn-sm"
            onClick={() => navigate("/customer")}
          >
            Dashboard
          </button> */}

          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* ===== PAGE CONTENT ===== */}
      <div className="container py-5">
        <h3 className="fw-bold mb-4">Welcome 👋</h3>

        <div className="row g-4">
          {/* PLACE ORDER */}
          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">Place New Order</h5>
                <p className="card-text text-muted">
                  Order rice, wheat, flour directly from the mill.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/customer/order")}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>

          {/* MY ORDERS */}
          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">My Orders</h5>
                <p className="card-text text-muted">
                  Track your orders and delivery status.
                </p>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate("/customer/orders")}
                >
                  View Orders
                </button>
              </div>
            </div>
          </div>

          {/* FEEDBACK */}
          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">Feedback</h5>
                <p className="card-text text-muted">
                  Share your experience with us.
                </p>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate("/customer/feedback")}
                >
                  Give Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
