import React, { Fragment } from "react";
import "./ServicesCard.css";
import Link from 'react-router-dom'
// import { ServicesData } from "./PdroductData";

export const ServicesCard = ({ dataItems, children }) => {
  const btnPressPrev = () => {
    const slider = document.querySelector(".services-card-wrapper");
    const width = slider.offsetWidth;
    slider.scrollLeft -= width;
  };

  const btnPressNext = () => {
    const slider = document.querySelector(".services-card-wrapper");
    const width = slider.offsetWidth;
    slider.scrollLeft += width;
  };

  return (
    <div className="services-card-container">
      <div className="services-card-header">
        <div className="services-card-title">
          <h2 className="services-card-title-text">{children}</h2>
          <p className="services-view-link-text">
            <span className="services-text">View All</span>
            <span className="material-symbols-outlined">chevron_right</span>
          </p>
        </div>
        <div className="services-card-btns">
          <button className="services-pre-btn" onClick={btnPressPrev}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button className="services-next-btn" onClick={btnPressNext}>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
      <div className="services-card-wrapper services-container">
        <ServicesCardItem dataItems={dataItems} />
      </div>
    </div>
  );
};

const ServicesCardItem = ({ dataItems }) => {
  return (
    <>
      {dataItems.map((dataItem, index) => {
        return (
          <div className="services-card" key={index}>
            <img
              src={dataItem.image}
              alt={dataItem.name}
              className="services-img"
              
            />
            <div className="services-content">
              <div className="services-card-row2">
                <p className="services-tag">{dataItem.tag}</p>
                <div className="services-name-location">
                  <p className="services-name">{dataItem.name}</p>
                  <p className="services-location">{dataItem.location}</p>
                </div>
              </div>
              <div className="services-card-row3">
                <div className="services-rating">
                  <span className="services-rating-number">
                    {dataItem.rated}
                  </span>
                  <span className="services-rating-icon">
                    <ion-icon name="star"></ion-icon>
                  </span>
                  <span>({dataItem.rating})</span>
                </div>
                <div className="services-fav-icon">
                  <span className="material-symbols-outlined">favorite</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
