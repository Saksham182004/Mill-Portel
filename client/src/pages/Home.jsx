import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Footer from "../components/Footer";

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUser(data.user);
        } else {
          localStorage.clear();
        }
      } catch {
        localStorage.clear();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar user={user} logout={logout} />

      <main className="flex-fill">

        {/* ================= HERO ================= */}
        <Hero />

        {/* ================= STATS ================= */}
        <div className="container py-5">
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="p-4 bg-white rounded shadow-sm">
                <h2 className="fw-bold text-primary">500+</h2>
                <p className="mb-0">Happy Customers</p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="p-4 bg-white rounded shadow-sm">
                <h2 className="fw-bold text-primary">10+ Years</h2>
                <p className="mb-0">Experience</p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="p-4 bg-white rounded shadow-sm">
                <h2 className="fw-bold text-primary">1000+ Tons</h2>
                <p className="mb-0">Flour Processed</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= WHAT WE DO ================= */}
        <div className="container py-5">
          <div className="row align-items-center">

            <div className="col-md-6 mb-4">
              <h2 className="fw-bold mb-3">What We Process</h2>
              <p className="text-muted">
                We provide high-quality milling services for a variety of
                agricultural products. Our mill ensures precision processing
                and hygienic handling.
              </p>

              <ul className="list-unstyled mt-3">
                <li>✔ Rice Milling</li>
                <li>✔ Wheat Flour Processing</li>
                <li>✔ Dal & Pulses Processing</li>
                <li>✔ Custom Bulk Orders</li>
              </ul>
            </div>

            <div className="col-md-6 mb-4">
              <h2 className="fw-bold mb-3">Our Infrastructure</h2>
              <p className="text-muted">
                Our facility is equipped with modern automated machines
                designed for high-capacity production and consistent quality.
              </p>

              <ul className="list-unstyled mt-3">
                <li>✔ Advanced Cleaning Machines</li>
                <li>✔ Automated Grinding Units</li>
                <li>✔ High-Capacity Storage Systems</li>
                <li>✔ Strict Quality Inspection Process</li>
              </ul>
            </div>

          </div>
        </div>

        {/* ================= CTA SECTION ================= */}
        <div className="bg-primary text-white py-5">
          <div className="container text-center">
            <h3 className="fw-bold mb-3">
              Ready to Place Your Order?
            </h3>
            <p className="mb-4">
              Join our mill portal and manage your flour orders easily.
            </p>
            <a
              href="/register"
              className="btn btn-light btn-lg fw-semibold"
            >
              Get Started
            </a>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Home;



