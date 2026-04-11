import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ORDERS ================= */
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /* ================= BASIC ANALYTICS ================= */

  const today = new Date().toDateString();

  const ordersToday = orders.filter(
    (o) => new Date(o.createdAt).toDateString() === today
  );

  const pending = orders.filter((o) => o.orderStatus === "Pending");
  const processing = orders.filter((o) => o.orderStatus === "Processing");
  const completed = orders.filter((o) => o.orderStatus === "Completed");

  /* ================= REVENUE ================= */

  const revenueToday = ordersToday.reduce(
    (sum, o) =>
      o.paymentStatus === "Paid" ? sum + o.grandTotal : sum,
    0
  );

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const revenueThisMonth = orders
    .filter((o) => {
      const date = new Date(o.createdAt);
      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    })
    .reduce(
      (sum, o) =>
        o.paymentStatus === "Paid" ? sum + o.grandTotal : sum,
      0
    );

  /* ================= TOTAL CUSTOMERS ================= */

  const uniqueCustomers = [
    ...new Set(orders.map((o) => o.customer?._id)),
  ];

  const totalCustomers = uniqueCustomers.length;

  /* ================= CHART DATA ================= */

  const last7DaysData = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const formatted = date.toDateString();

    const count = orders.filter(
      (o) => new Date(o.createdAt).toDateString() === formatted
    ).length;

    return {
      date: date.toLocaleDateString("en-IN", { weekday: "short" }),
      orders: count,
    };
  });

  const revenueLast7DaysData = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const formatted = date.toDateString();

    const revenue = orders
      .filter(
        (o) =>
          new Date(o.createdAt).toDateString() === formatted &&
          o.paymentStatus === "Paid"
      )
      .reduce((sum, o) => sum + o.grandTotal, 0);

    return {
      date: date.toLocaleDateString("en-IN", { weekday: "short" }),
      revenue,
    };
  });

  const statusData = [
    { name: "Pending", value: pending.length },
    { name: "Processing", value: processing.length },
    { name: "Completed", value: completed.length },
  ];

  const statusColors = ["#d97706", "#2563eb", "#15803d"];

  /* ================= TOP PRODUCTS ================= */

  const productMap = {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (!productMap[item.name]) {
        productMap[item.name] = 0;
      }
      productMap[item.name] += item.qty;
    });
  });

  const topProductsData = Object.keys(productMap)
    .map((name) => ({
      name,
      quantity: productMap[name],
    }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  const chartBoxStyle = {
    height: 300,
    backgroundColor: "#fff",
    borderRadius: 3,
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    p: 2,
  };

  /* ================= DATAGRID ================= */

  const columns = [
    { field: "id", headerName: "Order ID", width: 110 },

    { field: "customer", headerName: "Customer", width: 160 },

    {
      field: "items",
      headerName: "Items",
      width: 360,
      renderCell: (params) => (
        <ul style={{ paddingLeft: 16, margin: 0 }}>
          {params.value.map((item, i) => (
            <li key={i} style={{ fontSize: "13px" }}>
              {item}
            </li>
          ))}
        </ul>
      ),
    },

    {
      field: "itemTotal",
      headerName: "Item Total (₹)",
      width: 160,
      align: "right",
      headerAlign: "right",
    },

    {
      field: "paymentStatus",
      headerName: "Payment",
      width: 140,
      renderCell: (params) => {
        const color =
          params.value === "Paid"
            ? "#15803d"
            : "#d97706";

        return (
          <span style={{ color, fontWeight: 600 }}>
            {params.value}
          </span>
        );
      },
    },

    {
      field: "status",
      headerName: "Order Status",
      width: 160,
      renderCell: (params) => {
        let color = "#374151";

        if (params.value === "Pending") color = "#d97706";
        if (params.value === "Processing") color = "#2563eb";
        if (params.value === "Completed") color = "#15803d";
        if (params.value === "Rejected") color = "#dc2626";

        return (
          <span style={{ color, fontWeight: 600 }}>
            {params.value}
          </span>
        );
      },
    },
  ];

  const rows = orders.map((order) => ({
    id: order._id.slice(-6),
    customer: order.customer?.name || "Customer",
    items: order.items.map(
      (i) => `${i.name} (${i.qty}kg)`
    ),
    itemTotal: order.grandTotal,
    paymentStatus: order.paymentStatus,
    status: order.orderStatus,
  }));

  return (
    <>
      <AdminNavbar />

      <Box sx={{ width: "100%", padding: "24px 48px" }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
          Admin Dashboard
        </Typography>

        {/* SUMMARY CARDS */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 2,
            mb: 4,
          }}
        >
          {[
            { label: "Orders Today", value: ordersToday.length },
            { label: "Pending", value: pending.length },
            { label: "Processing", value: processing.length },
            { label: "Completed", value: completed.length },
            {
              label: "Revenue Today (₹)",
              value: revenueToday.toLocaleString(),
            },
            {
              label: "Revenue This Month (₹)",
              value: revenueThisMonth.toLocaleString(),
            },
            { label: "Total Customers", value: totalCustomers },
          ].map((card, i) => (
            <Box
              key={i}
              sx={{
                p: 2.5,
                backgroundColor: "#fff",
                borderRadius: 3,
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "#6b7280", mb: 0.5 }}
              >
                {card.label}
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700 }}
              >
                {card.value}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* CHARTS */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 3,
            mb: 4,
          }}
        >
          <Box sx={chartBoxStyle}>
            <Typography sx={{ mb: 2, fontWeight: 600 }}>
              Orders Last 7 Days
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={last7DaysData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#2563eb" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>

          <Box sx={chartBoxStyle}>
            <Typography sx={{ mb: 2, fontWeight: 600 }}>
              Revenue Last 7 Days (₹)
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={revenueLast7DaysData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#15803d" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>

          <Box sx={chartBoxStyle}>
            <Typography sx={{ mb: 2, fontWeight: 600 }}>
              Order Status Distribution
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={90} label>
                  {statusData.map((_, index) => (
                    <Cell key={index} fill={statusColors[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>

          <Box sx={chartBoxStyle}>
            <Typography sx={{ mb: 2, fontWeight: 600 }}>
              Top Selling Products
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={topProductsData} layout="vertical">
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="quantity" fill="#d97706" radius={[0,6,6,0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        {/* DATA GRID */}
        <Box
          sx={{
            height: 560,
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: 3,
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            onRowClick={(params) =>
              navigate(`/admin/orders/${params.row.id}`)
            }
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f1f5f9",
                fontWeight: 700,
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#f8fafc",
                cursor: "pointer",
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default AdminDashboard;

