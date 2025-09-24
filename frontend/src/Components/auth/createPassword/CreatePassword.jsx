import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import apiInstance from "../../../utils/axios";
import "./CreatePassword.css";

function CreatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const otp = searchParams.get("otp");
  const uidb64 = searchParams.get("uidb64");

  // Function for submitting password
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    if (password !== confirmPassword) {
      alert("Password Does not Match");
      setIsLoading(false);
    } else {
      setIsLoading(true);

      // Used to create a form object to be sent with the http request
      const formData = new FormData();
      formData.append("password", password);
      formData.append("otp", otp);
      formData.append("uidb64", uidb64);

      try {
        await apiInstance     // Wait for the response and then continue
          .post("user/password-change/", formData)    // Sending the HTTP request
          .then((res) => {          // How to handle the response received
            console.log(res.data);
            alert("Password changed successfully");
            navigate("/login");
            setIsLoading(false);
          });
      } catch (error) {
        alert("An error occured while trying to change the password");
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="login-wrapper">
      <div className="form-wrapper">
        <img src="byona_logo_main.png" alt="Byona Logo" className="logo-reg" />
        <h2 className="register-text">Create New Password</h2>
        <form onSubmit={handlePasswordSubmit} className="login-form">
          <div className="login-entry-area">
            <input
              type="password"
              required
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="labelline">Enter New Password</div>
          </div>
          <div className="login-entry-area">
            <input
              type="password"
              required
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="labelline">Confirm New Password</div>
          </div>
          {isLoading ? (
            <button disabled type="submit" className="login-btn">
              Processing...
            </button>
          ) : (
            <button type="submit" className="login-btn">
              Save New Password
            </button>
          )}
        </form>

        <p className="have-acct-text">
          Want to sign in? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default CreatePassword;
