import Auth from "../components/Auth";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"


const Register = () => {

  return (
    <div>
      <Navbar />
      <Auth mode="register" />
      <Footer />

    </div>
    
  );
};

export default Register;
