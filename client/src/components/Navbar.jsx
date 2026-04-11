import { useNavigate, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "./Navbar.css";

const AppNavbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 👇 Detect auth pages
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <Navbar expand="lg" sticky="top" className="app-navbar">
      <Container>
        {/* Logo */}
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          🏭 Mill Portal
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Left links */}
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")}>
              <b>Home</b>
            </Nav.Link>
          </Nav>

          {/* Right actions */}
          <Nav className="gap-2">
            {!user && !isAuthPage && (
              <>
                <Button
                  variant="outline-light"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  variant="light"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </>
            )}

            {user && (
              <Button variant="danger" onClick={onLogout}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
