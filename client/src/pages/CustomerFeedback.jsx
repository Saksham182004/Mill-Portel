import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CustomerFeedback = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!orderId) {
    //   alert("Order ID missing");
    //   return;
    // }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8080/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          orderId,
          rating,
          comment,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to submit feedback");
        return;
      }

      alert("Thank you for your feedback 😊");
      navigate("/customer/orders");
    } catch (err) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav
        className="navbar navbar-expand-lg px-4"
        style={{ backgroundColor: "#1e3a8a", minHeight: "100px" }}
      >
        <span className="navbar-brand text-white fw-bold">
          Feedback
        </span>

        <div className="ms-auto">
          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => navigate("/customer/orders")}
          >
            Back
          </button>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="container mt-4">
        <h4 className="fw-bold mb-3">Share Your Experience</h4>

        <div className="card shadow-sm">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* RATING */}
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Rating
                </label>

                <div className="fs-3 text-warning">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      style={{ cursor: "pointer", marginRight: "6px" }}
                      onClick={() => setRating(star)}
                    >
                      {star <= rating ? "★" : "☆"}
                    </span>
                  ))}
                </div>
              </div>

              {/* COMMENT */}
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Comment
                </label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about quality, delivery, service..."
                />
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={rating === 0 || loading}
              >
                {loading ? "Submitting..." : "Submit Feedback"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerFeedback;
