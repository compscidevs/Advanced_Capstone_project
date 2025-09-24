import React from "react";
import "./Navbar.css";
import logo from "../Assets/byona_logo_main.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import Logout from "../auth/logout/Logout";
import Suggestions from "./suggest";

export const Navbar = () => {
  return (
    <div>
      <TopNavbar />
      <MainNavbar />
    </div>
  );
};

const TopNavbar = () => {
  return (
    <div className="top-bar-container">
      <div className="top-bar-inner">
        <p className="mobile-text">
          <strong>Need Help? Call/WhatsApp:</strong> +256-781-876735
        </p>
        <ul className="top-bar-navigation">
          <li className="top-list-item">
            <Link to="vendor-signup">Sell on Byona</Link>
          </li>
          <li className="top-list-item">
            <a href="#">Whishlist</a>
          </li>
          <li className="top-list-item">
            <a href="#">Help</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const MainNavbar = () => {
  return (
    <div className="main-navbar-container">
      <div className="main-navbar">
        <Link to='/'><img className="logo" src={logo} alt="Byona Logo" /></Link>
        <SearchBar />
        <MenuLink />
      </div>
    </div>
  );
};

const SearchBar = () => {
  return (
    <div className="search-bar">
      <SearchDropDown />
      <SearchBoxInput />
    </div>
  );
};

const SearchDropDown = () => {
  return (
    <div className="dropdown">
      <div className="dropdown-text">
        <span>All Categories</span>
        <span className="material-symbols-outlined">expand_more</span>
      </div>
      <ul className="dropdown-list">
        <li className="drop-down-item">All Categories</li>
        <li className="drop-down-item">Services</li>
        <li className="drop-down-item">Electronics</li>
        <li className="drop-down-item">Home and Kitchen</li>
        <li className="drop-down-item">Computers</li>
        <li className="drop-down-item">Phones and Tablets</li>
        <li className="drop-down-item">Facshion and Clothes</li>
      </ul>
    </div>
  );
};

const SearchBoxInput = () => {
  const [loading, setLoading] = useState(false);
  const [products, setproducts] = useState([]);

  // Initialised to null to show no error
  const [error, setError] = useState(null);

  const [searchparam, setSearchparam] = useState("");

  const [showdropdown, setShowdropdown] = useState(false);

  const [filteredproducts, setFilteredproducts] = useState([]);

  // This senses any changes made by the user in the search bar and provides options for autocompletion from the databse
  function handlechange(event) {
    const query = event.target.value.toLowerCase();
    setSearchparam(query);
    if (query.length > 1) {
      const filteredData = products && products.length
          ? products.filter((item) => item.toLowerCase().indexOf(query) > -1)
          : [];

      setFilteredproducts(filteredData);
      setShowdropdown(true);
    } else {
      setShowdropdown(false);
    }
  }

  function handleClick(event) {
    console.log(event.target.innerText);
  }

  async function fetchListOfproducts() {
    try {
      // Loading is set to true to update the 'loading' variable and show that we are loading the data
      setLoading(true);

      // fetch helps us to fetch the data through sending a get_request to the specified URL usually an API
      const response = await fetch("https://dummyjson.com/products");

      // await is used to pause code execution until the promise returned by response is resolved
      const data = await response.json();

      // Here the data is shown onto the console in form of an array
      // console.log(data)

      // This checks to see whether the data is actually there
      if (data && data.products && data.products.length > 0) {
        //Assuming we want to deal with a specific attribute in the data where "products" represents the api name
        setproducts(data.products.map((productItem) => productItem.title));
        // setproducts(data.products)
        setLoading(false);
        setError(null);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error);
    }
  }

  useEffect(() => {
    fetchListOfproducts();
  }, []);

  console.log(products, filteredproducts); //This helps me to see what is in the databse through the console
  return (
    <div className="blockitem">
      <div className="seaarch-box">
        {loading ? (
          <h3>Loading data! Please wait</h3>
        ) : (
          <input
            type="text"
            id="search-input"
            placeholder="Search all products..."
            value={searchparam}
            onChange={handlechange}
          />
        )}

      </div>
      {showdropdown && (
        <div className="search_result">
          <Suggestions handleClick={handleClick} data={filteredproducts} />
        </div>
      )}
    </div>
  );
};

const MenuLink = () => {
  const [isActive, setIsActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);

  return (
    <ul className="nav-menu">
      <li className="menu-link-item" onClick={() => setIsActive(!isActive)}>
        <span class="material-symbols-outlined link-icon">person</span>
        <span>Account</span>
        {isActive ? (
          <ul className="menu-dropdown-list">
            <li className="menu-dropdown-list-item">
              {isLoggedIn ? (
                <Link to={"/logout"}>Sign Out</Link>
              ) : (
                <Link to={"/login"}>Sign In</Link>
              )}
            </li>
            <li className="menu-dropdown-list-item">My Account</li>
            <li className="menu-dropdown-list-item">My Orders</li>
          </ul>
        ) : (
          ""
        )}
      </li>
      <li className="menu-link-item">
        <span class="material-symbols-outlined link-icon">shopping_cart</span>
        <span>Cart</span>
      </li>
    </ul>
  );
};
