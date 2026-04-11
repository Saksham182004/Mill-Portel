import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* 🔹 Load Razorpay script */
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const PlaceOrder = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [pricing, setPricing] = useState({});
  const [items, setItems] = useState([
    { name: "Rice", qty: "" },
    { name: "Wheat", qty: "" },
    { name: "Flour", qty: "" },
  ]);

  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  /* 🔹 Fetch prices */
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/pricing", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        const map = {};
        data.forEach((p) => {
          map[p.item] = p.price;
        });
        setPricing(map);
      } catch {
        alert("Failed to load pricing");
      }
    };
    fetchPricing();
  }, []);

  const handleQtyChange = (index, value) => {
    const updated = [...items];
    updated[index].qty = value;
    setItems(updated);
  };

  /* 🔹 Calculate totals */
  const calculatedItems = items
    .filter((i) => i.qty && pricing[i.name])
    .map((i) => ({
      name: i.name,
      qty: Number(i.qty),
      pricePerKg: pricing[i.name],
      itemTotal: pricing[i.name] * Number(i.qty),
    }));

  const grandTotal = calculatedItems.reduce(
    (sum, i) => sum + i.itemTotal,
    0
  );

  /* 🔹 Submit order */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (calculatedItems.length === 0) {
      alert("Please select at least one item");
      return;
    }

    const orderData = {
      items: calculatedItems,
      address,
      note,
      paymentMethod,
      grandTotal,
    };

    try {
      /* 1️⃣ Create Order */
      const res = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Order failed");
        return;
      }

      /* 🟢 COD FLOW */
      if (paymentMethod === "COD") {
        alert("Order placed successfully 🎉");
        navigate("/customer/orders");
        return;
      }

      /* 🟡 UPI FLOW */
      if (paymentMethod === "UPI" || paymentMethod=="Bank Transfer") {
        const loaded = await loadRazorpayScript();
        if (!loaded) {
          alert("Razorpay SDK failed to load");
          return;
        }

        /* 2️⃣ Create Razorpay Order */
        const rpRes = await fetch(
          "http://localhost:8080/api/payments/create-order",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ orderId: data.order._id }),
          }
        );

        const rpData = await rpRes.json();
        if (!rpRes.ok) {
          alert(rpData.message || "Payment initialization failed");
          return;
        }

        /* 3️⃣ Razorpay Checkout */
        const options = {
          key: rpData.key,
          amount: rpData.amount,
          currency: "INR",
          name: "Mill Portal",
          description: "Order Payment",
          order_id: rpData.razorpayOrderId,

          handler: async function (response) {
            /* 4️⃣ Verify Payment */
            const verifyRes = await fetch(
              "http://localhost:8080/api/payments/verify",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(response),
              }
            );

            const verifyData = await verifyRes.json();
            if (verifyRes.ok) {
              alert("Payment successful 🎉");
              navigate("/customer/orders");
            } else {
              alert(verifyData.message || "Payment verification failed");
            }
          },

          theme: { color: "#1e3a8a" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch {
      alert("Server error");
    }
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav
        className="navbar navbar-expand-lg px-4"
        style={{ backgroundColor: "#1e3a8a", minHeight: "100px" }}
      >
        <span className="navbar-brand text-white fw-bold">Place Order</span>
        <div className="ms-auto">
          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => navigate("/customer")}
          >
            Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="container mt-4">
        <h4 className="fw-bold mb-3">Order Details</h4>

        <form onSubmit={handleSubmit}>
          {/* ITEMS */}
          <div className="card mb-4">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Select Items</h6>
              {items.map((item, index) => (
                <div key={item.name} className="row align-items-center mb-3">
                  <div className="col-md-3 fw-semibold">{item.name}</div>
                  <div className="col-md-2 text-muted">
                    ₹{pricing[item.name] ?? "—"} / kg
                  </div>
                  <div className="col-md-3">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Qty (kg)"
                      value={item.qty}
                      onChange={(e) =>
                        handleQtyChange(index, e.target.value)
                      }
                      min="0"
                    />
                  </div>
                  <div className="col-md-3 fw-semibold">
                    {item.qty && pricing[item.name]
                      ? `₹${pricing[item.name] * item.qty}`
                      : "—"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TOTAL */}
          <div className="card mb-4">
            <div className="card-body d-flex justify-content-between">
              <h6 className="fw-bold mb-0">Total Amount</h6>
              <h5 className="fw-bold mb-0">₹{grandTotal}</h5>
            </div>
          </div>

          {/* PAYMENT METHOD */}
          <div className="card mb-4">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Payment Method</h6>
              {["COD", "UPI", "Bank Transfer"].map((method) => (
                <div className="form-check mb-2" key={method}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label className="form-check-label">{method}</label>
                </div>
              ))}
            </div>
          </div>

          {/* ADDRESS */}
          <div className="card mb-4">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Delivery Address</h6>
              <textarea
                className="form-control"
                rows="3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          </div>

          {/* NOTE */}
          <div className="card mb-4">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Additional Note</h6>
              <textarea
                className="form-control"
                rows="2"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
