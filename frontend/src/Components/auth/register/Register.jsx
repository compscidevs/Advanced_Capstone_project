import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../../store/auth";
import "./Register.css";

function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const validate = () => {
    const errors = {};
    if (!fullname) errors.fullname = "Full name is required";
    if (!email) errors.email = "Email is required";
    if (!mobile) errors.mobile = "Phone number is required";
    if (!password) errors.password = "Password is required";
    if (password !== password2) errors.password2 = "Passwords do not match";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear errors before validation

    // const validationErrors = validate();
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return; // Prevent form submission with errors
    // }

    const formData = { fullname, email, mobile, password };

    setIsLoading(true);
    try {
      const response = await fetch('/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('User registered successfully!');
        navigate('/'); // Redirect to home page on success
      } else {
        const errorData = await response.json();
        console.error('Error registering user:', errorData);
        setErrors({ general: 'An error occurred during registration' });
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setErrors({ general: 'An error occurred during registration' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="form-wrapper">
        <img src="byona_logo_main.png" alt="Byona Logo" className="logo-reg" />
        <h2 className="register-text">Register Account</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="reg-entry-area">
            <input
              type="text"
              required
              onChange={(e) => setFullname(e.target.value)}
              value={fullname}
            />
            <div className="labelline">Enter Your Full Name</div>
            {errors.fullname && <div className="error">{errors.fullname}</div>}
          </div>
          <div className="reg-entry-area">
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <div className="labelline">Enter Your Email</div>
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="reg-entry-area">
            <input
              type="text"
              required
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
            />
            <div className="labelline">Enter Your Phone Number</div>
            {errors.mobile && <div className="error">{errors.mobile}</div>}
          </div>
          <div className="reg-entry-area">
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div className="labelline">Enter Your Password</div>
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <div className="reg-entry-area">
            <input
              type="password"
              required
              onChange={(e) => setPassword2(e.target.value)}
              value={password2}
            />
            <div className="labelline">Confirm Your Password</div>
            {errors.password2 && <div className="error">{errors.password2}</div>}
          </div>
          {isLoading ? (
            <button disabled type="submit" className="reg-btn">
              Processing...
            </button>
          ) : (
            <button type="submit" className="reg-btn">
              Register
            </button>
          )}
          {errors.general && <div className="error">{errors.general}</div>}
        </form>
        <p className="have-acct-text">
          Already have an account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
