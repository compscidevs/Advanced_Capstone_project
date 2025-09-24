import React from "react";
import "./Footer.css";
import logoWhite from "../Assets/byona_logo_white.png";

export const Footer = () => {
  return (
    <footer>
      <div className="main-footer-container">
        <div className="footer">
          <LogoSection />
          <LinkSection1 />
          <LinkSection2 />
          <SocialSection />
        </div>
      </div>
      <div className="sub-footer-container">
        <div className="sub-footer-inner">
          <p className="copy-right">
            &copy;2024, Byona Online Store - All rights reserved.
          </p>
          <p className="terms">Terms and conditions</p>
        </div>
      </div>
    </footer>
  );
};

const LogoSection = () => {
  return (
    <div className="logo-section">
      <img className="logo-white" src={logoWhite} alt="Byona Logo White" />
      <ul className="about-list">
        <li className="about-list-item">
          <span className="material-symbols-outlined">support_agent</span>
          <span>
            <strong>Call Us/WhatsApp:</strong> +256-781-876735
          </span>
        </li>
        <li className="about-list-item">
          <span className="material-symbols-outlined">mail</span>
          <span>
            <strong>Email:</strong> sale@byonaonlinestore.com
          </span>
        </li>
        <li className="about-list-item">
          <span className="material-symbols-outlined">schedule</span>
          <span>
            <strong>Hours:</strong> 9:00am - 5:00pm, Mon - Sat
          </span>
        </li>
      </ul>
    </div>
  );
};

const LinkSection1 = () => {
  return (
    <div className="link-section">
      <h3 className="link-header">Company</h3>
      <ul className="link-items">
        <li className="link-item">About Us</li>
        <li className="link-item">Delivery Information</li>
        <li className="link-item">Privacy Policy</li>
        <li className="link-item">Terms and Conditions</li>
        <li className="link-item">Support Center</li>
        <li className="link-item">Return and Refund Policy</li>
      </ul>
    </div>
  );
};

const LinkSection2 = () => {
  return (
    <div className="link-section">
      <h3 className="link-header">Useful Links</h3>
      <ul className="link-items">
        <li className="link-item">Sale on Byona</li>
        <li className="link-item">My Whishlist</li>
        <li className="link-item">Track My Order</li>
        <li className="link-item">Our Suppliers</li>
        <li className="link-item">All Categories</li>
        <li className="link-item">Payment Methods</li>
      </ul>
    </div>
  );
};

const SocialSection = () => {
  return (
    <div className="social-section">
      <h3 className="social-header">Follow Us</h3>
      <ul className="social-icons">
        <li className="social-icon-item">
          <ion-icon name="logo-facebook"></ion-icon>
        </li>
        <li className="social-icon-item">
          <ion-icon name="logo-twitter"></ion-icon>
        </li>
        <li className="social-icon-item">
          <ion-icon name="logo-instagram"></ion-icon>
        </li>
        <li className="social-icon-item">
          <ion-icon name="logo-pinterest"></ion-icon>
        </li>
        <li className="social-icon-item">
          <ion-icon name="logo-youtube"></ion-icon>
        </li>
      </ul>

      <div className="newsletter">
        <input
          type="email"
          className="newsletter-field"
          placeholder="Your email address..."
        />
        <button className="newsletter-btn">Subscribe</button>
      </div>
    </div>
  );
};
