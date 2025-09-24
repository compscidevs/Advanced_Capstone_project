import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signin-page.css';
import logo from "../Components/Assets/byona_logo_main.png";

const BusinessSignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let errors = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form data submitted:', formData);
      // Add form submission logic here
    } else {
      setErrors(validationErrors);
    }
  };

  const isFormValid = formData.email && formData.password;

  return (
    <div className="vendor-signin-flex">
    <div className="vendor-signin-container">
        <div className="vendor-signin-logo-flex">
          <img src={logo} alt="Couldnt load" className="vendor-signin-logo" />
        </div>
      <h2>Business Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="vendor-form-group">
          <label htmlFor="email">Email:</label>
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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="vendor-error">{errors.password}</p>}
        </div>
        <button type="submit"><Link className='vendor-link' to="/vendor">Sign In </Link></button>
      </form>
      <div className="vendor-signin-link">
        <p>Don't have an account? <Link to="/vendor-signup">Sign up here</Link></p>
      </div>
    </div>
    </div>
  );
};

export default BusinessSignIn;
