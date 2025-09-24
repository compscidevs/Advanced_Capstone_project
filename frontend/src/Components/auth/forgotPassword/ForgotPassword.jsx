import { useState } from "react";
import apiInstance from "../../../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await apiInstance.get(`user/password-reset/${email}/`).then((res) => {
        alert("An Email has been sent to you");
        setIsLoading(false);
      });
    } catch (error) {
      alert("Email Does not Exist");
    }
  };

  return (
    <div className="f-pass-wrapper">
      <div className="form-wrapper">
        <img src="byona_logo_main.png" alt="Byona Logo" className="logo-reg" />
        <h2 className="f-pass-text">Forgot Password?</h2>
        <form onSubmit={handleEmailSubmit} className="f-password-form">
          <div className="f-pass-entry-area">
            <input
              type="email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="labelline">Enter Your Email</div>
          </div>
          <button type="submit" className="fpass-btn">
            Reset Password
          </button>
        </form>
        <p className="have-acct-text">
          Want to sign in? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
