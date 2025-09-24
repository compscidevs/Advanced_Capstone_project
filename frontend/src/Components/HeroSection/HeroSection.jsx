import { useEffect, useState } from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom";
import { imageItems } from "./Data";

export const HeroSection = () => {
  return (
    <div className="section-hero">
      <div className="hero">
        <HeroList />
        <HeroCarousel images={imageItems} />
      </div>
    </div>
  );
};

const HeroCarousel = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  let timeOut = null;

  useEffect(() => {
    timeOut = autoPlay && setTimeout(() => slideRight(), 3000);
  });

  const slideRight = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  return (
    <div
      className="carousel-wrapper"
      onMouseEnter={() => {
        setAutoPlay(false);
        clearTimeout(timeOut);
      }}
      onMouseLeave={() => {
        setAutoPlay(true);
      }}
    >
      {images.map((image, index) => {
        return (
          <div
            key={index}
            className={
              index === current
                ? "carousel-card carousel-card-active"
                : "carousel-card"
            }
          >
            <img className="card-image" src={image.image} alt={image.alt} />
            <div className="card-overlay">
              <h2 className="card-title">{image.title}</h2>
              <p className="card-description">{image.body}</p>
            </div>
          </div>
        );
      })}
      <div className="carousel-pagination">
        {images.map((_, index) => {
          return (
            <div
              key={index}
              className={
                index === current
                  ? "pagination-dot pagination-dot-active"
                  : "pagination-dot"
              }
              onClick={() => setCurrent(index)}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

const HeroList = () => {
  return (
    <div className="carousel-list-container">
      <div className="category-list-title-box">
        <h1 className="carousel-list-title">Categories</h1>
        <hr />
      </div>
      
      <ul className="category-attributes">
      <Link to='/categories' className="link">
        <li className="category-attribute">
          <span className="material-symbols-outlined category-icon">apparel</span>
          <span>Fashion and Clothes</span>
        </li>
      </Link>
        
        <Link to='/categories' className="link">
          <li className="category-attribute">
          <span className="material-symbols-outlined category-icon">
            laptop_mac
          </span>
          <span>Computer and Accessories</span>
          </li>
        </Link>
        

        <Link to='/categories' className="link">
          <li className="category-attribute">
          <span className="material-symbols-outlined category-icon">
            phone_iphone
          </span>
          <span>Phone and Tablets</span>
          </li>
        </Link>
        

        <Link to='/categories' className="link">
          <li className="category-attribute">
          <span className="material-symbols-outlined category-icon">tv_gen</span>
          <span>Appliances and Electronics</span>
          </li>
        </Link>
        

        <Link to='/categories' className="link">
          <li className="category-attribute">
          <span className="material-symbols-outlined category-icon">oven_gen</span>
          <span>Home and Kitchen</span>
        </li>
        </Link>
        

        <Link to='/categories' className="link">
          <li className="category-attribute">
          <span className="material-symbols-outlined category-icon">menu</span>
          <span>View all Categories</span>
        </li>
        </Link>
        
      </ul>
    </div>
  );
};
