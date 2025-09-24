import React from "react";
import "./StoresSection.css";

const StoresSection = () => {
  return (
    <div className="stores-container">
      <div className="stores-left">
        <h3 className="stores-left-title">Sell On Byona</h3>
        <div className="stores-left-content">
          <p>
            Byona Online Store has gained a reputation for its user-friendly
            interface, secure payment gateways, and exceptional customer
            service.
          </p>
          <p>
            Our growing customer base is actively seeking unique and reliable
            products, and we believe your offerings align perfectly with our
            vision.
          </p>
        </div>
        <button className="store-left-button">Register Now</button>
      </div>
      <div className="stores-right">
        <div className="stores-right-title">
          <h2 className="stores-right-title-text">Top Rated Vendors</h2>
          <p className="stores-view-link-text">
            <span className="stores-right-text">View All</span>
            <span className="material-symbols-outlined">chevron_right</span>
          </p>
        </div>
        <div className="stores-right-logos">
          <div className="stores-right-logos-item">log 1</div>
          <div className="stores-right-logos-item">log 2</div>
          <div className="stores-right-logos-item">log 3</div>
          <div className="stores-right-logos-item">log 4</div>
          <div className="stores-right-logos-item">log 5</div>
          <div className="stores-right-logos-item">log 6</div>
          <div className="stores-right-logos-item">log 7</div>
          <div className="stores-right-logos-item">log 8</div>
          <div className="stores-right-logos-item">log 9</div>
        </div>
      </div>
    </div>
  );
};

export default StoresSection;
