import {useParams} from "react-router-dom";
import "./ProductDetails.css";
import { ProductData } from "../ProductCard/PdroductData";
import { ProductCard } from "../ProductCard/ProductCard";
import Rating from "./Rating"
import Apple from "./Try"

const ProductDetails = () => {


  const { id } = useParams();
  const product = ProductData.find(p => p.id === parseInt(id));

  return (
    <>
      <div className="top-navigation-wrapper">
        <div className="top-navigation">
          <span className="products-home">
            <span className="material-symbols-outlined">home</span>
            <a href="/">Home</a>
          </span>
           <span className="material-symbols-outlined">navigate_next</span> 
          <span><a href ="/categories">{product.tag}</a></span>
           <span className="material-symbols-outlined">navigate_next</span> 
          
          <span className="top-nav-active">16inch Macbook Pro</span>
        </div>
      </div>
      <ProductDetailsContent />

      <ProductCard dataItems={ProductData}>Related Products</ProductCard>
      {/* <Footer /> */}
    </>
  );
};

const ProductDetailsContent = () => {

  const { id } = useParams();  //look for id//
  const product = ProductData.find(p => p.id === parseInt(id));  //finds the product data corresponding to the id

  return (
    <>
      <div className="product-details-wrapper">
        <div className="product-details-row1">
          <div className="pdt-details-r1-left">
            <img
              src={product.image}
              alt="laptop"
              className="pdt-detail-img "
            />
            <div className="pdt-more-imgs">
              <img
                src={product.image}
                alt="laptop"
                className="pdt-more-img pdt-more-img-active"
              />
              <img
                src={product.image}
                alt="laptop"
                className="pdt-more-img"
              />
              <img
                src={product.image}
                alt="laptop"
                className="pdt-more-img"
              />
              <img
                src={product.image}
                alt="laptop"
                className="pdt-more-img"
              />
            </div>
          </div>
          <div className="pdt-details-r1-right">
            <span className="pdt-availability">Available</span>
            <h2 className="prdt-detail-name">
              {product.name}
            </h2>
            <div className="pdt-reviews">
              <span className="pdt-rating-icon">
                <Rating rating={3}/>
              </span>
              <span className="pdt-rating-text">(1,453 reviews)</span>
            </div>
            <div className="pdt-detail-price">
              <div className="pdt-detail-price-text">UGX. {product.newPrice}</div>
              <div className="pdt-detail-discount">
                <span className="p-discount">20% off</span>
                <span className="p-reduced-price">UGX. {product.oldPrice}</span>
              </div>
            </div>
            <p className="pdt-detail-description">
              {product.description}
            </p>
            <div className="pdt-details-more">
              <span>
                <strong>Color:</strong>
              </span>
              <span>Steel</span>
              <span className="active">Grey</span>
              <span>White</span>
              <span>Gold</span>
            </div>
            <div className="pdt-cart-buttons">
              <button className="add-to-cart-button" >
                <span>{product.discount}%</span>
              </button>
              <span className="add-to-cart-fav">
                <span className="material-symbols-outlined">favorite</span>
              </span>
              <span className="pdt-detail-share">
                <span className="material-symbols-outlined">share</span>
              </span>
            </div>
          </div>
        </div>

        <div className="product-details-row2">
          <Apple/> 
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
