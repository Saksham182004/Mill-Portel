
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-lg-5 py-4 bg-light border-top mt-5 faint-blue-footer">
      <div className="container">
        <div className="row justify-content-center text-center">
          
          {/* NAV LINKS */}
          <div className="col-12 col-xl-8 mb-3">
            <nav className="nav justify-content-center">
              {[
                "Terms & Conditions",
                "Get Support",
              ].map((link) => (
                <a
                  key={link}
                  href="/"
                  className="nav-link px-2 text-muted"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* SOCIAL ICONS */}
          <div className="col-12 mb-3">
            <div className="d-flex justify-content-center gap-4 text-muted">
              
              {/* Facebook */}
              <a href="https://www.facebook.com/saksham.sutar.9/" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>

              {/* Twitter */}
              <a href="#" aria-label="Twitter">
                <i className="bi bi-twitter"></i>
              </a>

              {/* LinkedIn */}
              <a href="https://in.linkedin.com/in/saksham-sutar-580144320" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>

              {/* Instagram */}
              <a href="https://www.instagram.com/saksham_sutar18?igsh=emJiMmVubzNscmFo&utm_source=qr" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>

            </div>
          </div>

          {/* COPYRIGHT */}
          <div className="col-12 text-muted small">
            © {year} Geeks-UI, Inc. All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


