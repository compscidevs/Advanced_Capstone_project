import React, { useState } from "react";
import "./signup-page.css";
import { Link } from "react-router-dom";
import logo from "../Components/Assets/byona_logo_main.png";

const VendorSignUp = () => {
  const [formData, setFormData] = useState({
    vendorName: "",
    email: "",
    password: "",
    companyName: "",
    businessName: "",
    category: "",
    hoursOpen: "",
    contactLocation: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let errors = {};

    if (!formData.vendorName) {
      errors.vendorName = "Vendor name is required";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!formData.companyName) {
      errors.companyName = "Company name is required";
    }

    if (!formData.businessName) {
      errors.businessName = "Business name is required";
    }

    if (!formData.category) {
      errors.category = "Category is required";
    }

    if (!formData.hoursOpen) {
      errors.hoursOpen = "Hours of operation are required";
    }

    if (!formData.contactLocation) {
      errors.contactLocation = "Contact location is required";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form data submitted:", formData);
      // Add form submission logic here
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="vendor-flex-box">
      <div className="vendor-signup-container">
        <h2>Vendor Sign Up</h2>
        <div className="vendor-signin-logo-flex">
          <img src={logo} alt="Couldnt load" className="vendor-signin-logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="vendor-form-group">
            <label className="vendor-field-names" htmlFor="vendorName">
              Vendor Name:
            </label>
            <input
              type="text"
              id="vendorName"
              name="vendorName"
              value={formData.vendorName}
              onChange={handleChange}
            />
            {errors.vendorName && (
              <p className="vendor-error">{errors.vendorName}</p>
            )}
          </div>
          <div className="vendor-form-group">
            <label className="vendor-field-names" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="vendor-error">{errors.email}</p>}
          </div>
          <div className="vendor-form-group">
            <label className="vendor-field-names" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="vendor-error">{errors.password}</p>
            )}
          </div>
          <div className="vendor-form-group">
            <label className="vendor-field-names" htmlFor="companyName">
              Company Name:
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
            {errors.companyName && (
              <p className="vendor-error">{errors.companyName}</p>
            )}
          </div>
          <div className="vendor-form-group">
            <label className="vendor-field-names" htmlFor="businessName">
              Business Name:
            </label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
            />
            {errors.businessName && (
              <p className="vendor-error">{errors.businessName}</p>
            )}
          </div>
          <div className="vendor-form-group">
            <label className="vendor-field-names" htmlFor="category">
              Category:
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
            {errors.category && (
              <p className="vendor-error">{errors.category}</p>
            )}
          </div>
          <div className="vendor-form-group">
            <label className="vendor-field-names" htmlFor="hoursOpen">
              Hours Open:
            </label>
            <input
              type="text"
              id="hoursOpen"
              name="hoursOpen"
              value={formData.hoursOpen}
              onChange={handleChange}
            />
            {errors.hoursOpen && (
              <p className="vendor-error">{errors.hoursOpen}</p>
            )}
          </div>
          <div className="vendor-form-group">
            <label className="vendor-field-names" htmlFor="contactLocation">
              Contact Location:
            </label>
            <input
              type="text"
              id="contactLocation"
              name="contactLocation"
              value={formData.contactLocation}
              onChange={handleChange}
            />
            {errors.contactLocation && (
              <p className="vendor-error">{errors.contactLocation}</p>
            )}
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <div className="vendor-login-link">
          <p>
            Already have an account? <Link to="/vendor-login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorSignUp;
