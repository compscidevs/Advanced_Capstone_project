import React, { Fragment, useState } from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import TruncateText from "./truncate-text";

export const ProductCard = ({ dataItems}) => {


  // Add state to store cart items
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (dataItem) => {
    // Check if item already exists in cart
    const existingItem = cartItems.find((item) => item.id === dataItem.id);

    if (existingItem) {
      // Update quantity if item already exists
      setCartItems(
        cartItems.map((item) =>
          item.id === dataItem.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      // Add new item to cart with quantity 1
      setCartItems([...cartItems, { ...dataItem, quantity: 1 }]);
    }
  };

  return (
    <div className="product-card-container">
      <div className="product-card-wrapper product-container">
        {/* ProductCardItem component */}
        <ProductCardItem dataItems={dataItems} addToCart={addToCart} />
      </div>
      {/* Cart section (conditionally rendered) */}
      {cartItems.length > 0 && (
        <div className="cart-container">
          <h2>Your Cart</h2>
          {/* Display cart items here */}
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <p>
                {item.name} (x{item.quantity})
              </p>
              <p>UGX. {item.newPrice * item.quantity}</p>
            </div>
          ))}
          <Link to="payments"><button className="place-order-btn">Place Order</button></Link>
        </div>
      )}
    </div>
  );
};

const ProductCardItem = ({ dataItems, addToCart }) => {
  return (
    // To avoid introducing additional dorm nodes I have used <></>
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
                      <TruncateText maxChars={20}>{dataItem.name}</TruncateText>
                    </p>
                  </Link>
                </div>
                <div className="fav-icon">
                  <span className="material-symbols-outlined">favorite</span>
                </div>
              </div>
              <div className="product-card-row3">
                <div className="product-price">
                  <p className="new-price">UGX. {dataItem.newPrice}</p>
                  <p className="old-price">UGX. {dataItem.oldPrice}</p>
                </div>

                <button className="discout" onClick={() => addToCart(dataItem)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
