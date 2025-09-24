import { useEffect } from "react";
import { logout } from "../../../utils/auth";
import { Link } from "react-router-dom";
import "./Logout.css";

function Logout() {
  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="logout-wrapper">
      <div className="logout-form-wrapper">
        <img src="byona_logo_main.png" alt="Byona Logo" className="logo-reg" />
        <h2 className="register-text">You've been Logged Out.</h2>
        <div className="logout-buttons">
          <Link to={"/login"} className="logout-login">
            Login
          </Link>
          <Link to={"/register"} className="logout-register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Logout;
