import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

/* ===== ADMIN PAGES ===== */
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import AdminPayments from "./pages/AdminPayments";
import AdminFeedback from "./pages/AdminFeedback";
import AdminPricing from "./pages/AdminPricing";

/* ===== CUSTOMER PAGES ===== */
import CustomerDashboard from "./pages/CustomerDashboard";
import PlaceOrder from "./pages/PlaceOrder";
import MyOrders from "./pages/MyOrders";
import CustomerFeedback from "./pages/CustomerFeedback";

function App() {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="admin">
              <AdminDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="admin">
              <AdminOrders />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/payments"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="admin">
              <AdminPayments />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/feedback"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="admin">
              <AdminFeedback />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/pricing"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="admin">
              <AdminPricing />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* ================= CUSTOMER ================= */}
      <Route
        path="/customer"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="customer">
              <CustomerDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/order"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="customer">
              <PlaceOrder />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/orders"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="customer">
              <MyOrders />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/feedback"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="customer">
              <CustomerFeedback />
            </RoleRoute>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
