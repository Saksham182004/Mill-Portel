import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import "./AdminFeedback.css";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/feedback", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        setFeedbacks(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch feedback", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const renderStars = (count = 0) =>
    "★".repeat(count) + "☆".repeat(5 - count);

  return (
    <>
      <AdminNavbar />

      <div className="container mt-4">
        <h4 className="fw-bold mb-4">Customer Feedback</h4>

        {loading && (
          <div className="alert alert-info">
            Loading feedback...
          </div>
        )}

        {!loading && feedbacks.length === 0 && (
          <div className="alert alert-warning">
            No feedback received yet.
          </div>
        )}

        {!loading &&
          feedbacks.map((fb) => (
            <div
              key={fb._id}
              className="card feedback-card mb-4"
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h6 className="fw-semibold mb-0">
                      {fb.customer?.name || "Customer"}
                    </h6>
                  </div>

                  <div className="feedback-rating text-warning">
                    {renderStars(fb.rating)}
                  </div>
                </div>

                <p className="mb-2">
                  {fb.comment || "No comment provided"}
                </p>

                <small className="text-muted">
                  {new Date(fb.createdAt).toLocaleDateString()}
                </small>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default AdminFeedback;
