import { NavLink, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg px-4"
      style={{
        backgroundColor: "#1e3a8a", // faint blue
        minHeight: "115px",          // increased height
      }}
    >
      <span className="navbar-brand fw-bold text-white fs-5">
        Mill Admin
      </span>

      <div className="collapse navbar-collapse show">
        <ul className="navbar-nav me-auto align-items-center">
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/admin">
              Dashboard
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/admin/orders">
              Orders
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/admin/payments">
              Payments
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/admin/feedback">
              Feedback
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/admin/pricing">
              Pricing
            </NavLink>
          </li>
        </ul>

        <button
          className="btn btn-outline-light btn-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;

