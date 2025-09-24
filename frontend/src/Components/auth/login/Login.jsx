import React, { useState, useEffect } from "react";
import { login } from "../../../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../../store/auth";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, []);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await login(email, password);
    if (error) {
      setIsLoading(false);
      alert(error);
    } else {
      navigate("/");
      resetForm();
    }
    setIsLoading(false);
  };

  return (
    <div className="login-wrapper">
      <div className="form-wrapper">
        <img src="byona_logo_main.png" alt="Byona Logo" className="logo-reg" />
        <h2 className="register-text">Login To Your Account</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="login-entry-area">
            <input
              type="email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="labelline">Enter Your Email</div>
          </div>
          <div className="login-entry-area">
            <input
              type="password"
              required
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="labelline">Enter Your Password</div>
          </div>
          {isLoading ? (
            <button disabled type="submit" className="login-btn">
              Processing...
            </button>
          ) : (
            <button type="submit" className="login-btn">
              Sign In
            </button>
          )}
        </form>
        <div className="acc-status-links">
          <p className="no-acct-text">
            <Link to={"/forgot-password"}>Forgot Password?</Link>
          </p>
          <p className="forgot-pass-text">
            Not a member? <Link to={"/register"}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
