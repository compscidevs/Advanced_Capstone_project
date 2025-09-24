import React, { useState } from "react";
import "./Categories.css";
import ReactSlider from "react-slider";
import { ProductData } from "../ProductCard/PdroductData";
import TruncateText from "../ProductCard/truncate-text";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <>
      <div className="top-navigation-wrapper">
        <div className="top-navigation">
          <span className="products-home">
            <span className="material-symbols-outlined">home</span>
            <Link to={'/'}><span>Home</span></Link>
          </span>
          <span className="material-symbols-outlined">navigate_next</span>
          <span>Categories</span>
          <span className="material-symbols-outlined">navigate_next</span>
          <span className="top-nav-active">Computers</span>
        </div>
      </div>
      <CategoriesContent />
    </>
  );
};

const CategoriesContent = () => {
  const [sliderValues, setSliderValues] = useState([10000, 5000000]);

  const handleSliderChange = (values) => {
    setSliderValues(values);
  };

  return (
    <div className="cat-content-wrapper">
      <div className="categories-header">
        <img
          src="/images/computers.jpg"
          alt="computers"
          className="cat-header-text-image"
        />
        <h2 className="cat-header-text">Computers</h2>
      </div>

      <div className="categories-body">
        <div className="cat-content-filter">
          <div className="cat-content-filter-top">
            <div className="filter-header">
              <h2 className="filter-header-text">Filter By Price</h2>
              <hr />
            </div>
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              value={sliderValues}
              ariaLabel={["Lower thumb", "Upper thumb"]}
              min={10000}
              max={5000000}
              minDistance={10000}
              step={10000}
              onChange={handleSliderChange}
            />
            <div className="filter-from-to">
              <p className="from">
                From: <span>{sliderValues[0].toLocaleString()}</span>
              </p>
              <p className="to">
                To: <span>{sliderValues[1].toLocaleString()}</span>
              </p>
            </div>
            <div className="color-filter-container">
              <div className="color-filter">
                <h3 color-filter-header>Color</h3>
                <div className="check-box-list">
                  <label className="checkbox-lable">
                    Green (26)
                    <input type="checkbox" />
                    <span className="checkbox-container"></span>
                  </label>

                  <label className="checkbox-lable">
                    Yellow (35)
                    <input type="checkbox" />
                    <span className="checkbox-container"></span>
                  </label>

                  <label className="checkbox-lable">
                    Blue (06)
                    <input type="checkbox" />
                    <span className="checkbox-container"></span>
                  </label>
                </div>
              </div>
              <div className="color-filter">
                <h3 color-filter-header>Item Condition</h3>
                <div className="check-box-list">
                  <label className="checkbox-lable">
                    New (261)
                    <input type="checkbox" />
                    <span className="checkbox-container"></span>
                  </label>

                  <label className="checkbox-lable">
                    Refurbished (135)
                    <input type="checkbox" />
                    <span className="checkbox-container"></span>
                  </label>

                  <label className="checkbox-lable">
                    Used (206)
                    <input type="checkbox" />
                    <span className="checkbox-container"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="filter-list-container">
            <div className="filter-list-title-box">
              <h1 className="filter-list-title">Other Categories</h1>
              <hr />
            </div>
            <ul className="filter-attributes">
              <li className="filter-attribute">
                <span className="material-symbols-outlined filter-icon">
                  apparel
                </span>
                <span>Fashion and Clothes</span>
              </li>
              <li className="filter-attribute">
                <span className="material-symbols-outlined filter-icon">
                  laptop_mac
                </span>
                <span>Computer and Accessories</span>
              </li>
              <li className="filter-attribute">
                <span className="material-symbols-outlined filter-icon">
                  phone_iphone
                </span>
                <span>Phone and Tablets</span>
              </li>
              <li className="filter-attribute">
                <span className="material-symbols-outlined filter-icon">
                  tv_gen
                </span>
                <span>Appliances and Electronics</span>
              </li>
              <li className="filter-attribute">
                <span className="material-symbols-outlined filter-icon">
                  oven_gen
                </span>
                <span>Home and Kitchen</span>
              </li>
              <li className="filter-attribute">
                <span className="material-symbols-outlined filter-icon">menu</span>
                <span>View all Categories</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="cat-content">
          <div className="cat-contnet-header">
            <h2 className="cat-contnet-header-text">Top Deals in Computers</h2>
            <hr />
          </div>
          <div className="cat-content-items">
            <ProductCardItem dataItems={ProductData} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCardItem = ({ dataItems }) => {
  return (
    <>
      {dataItems.map((dataItem, index) => {
        return (
          <div className="product-card" key={index}>
            <img
              src={dataItem.image}
              alt={dataItem.name}
              className="product-img"
            />
            <div className="product-content">
              <div className="product-card-row2">
                <div className="product-name-tag">
                  <p className="product-tag">{dataItem.tag}</p>
                  <Link to={`/product/${dataItem.id}`} className="link">
                    <p className="product-name">
                      <TruncateText maxChars={19}>{dataItem.name}</TruncateText>
                    </p>
                  </Link>
                </div>
                <div className="discout">{dataItem.discount}% off</div>
              </div>
              <div className="product-card-row3">
                <div className="product-price">
                  <p className="new-price">UGX. {dataItem.newPrice}</p>
                  <p className="old-price">UGX. {dataItem.oldPrice}</p>
                </div>
                <div className="fav-icon">
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

export default Categories;
