import React, { useState } from 'react';
import './seller_links.css';
import {Link} from 'react-router-dom'

const ManageSeller = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['Electronics', 'Clothes', 'Services']);
  const [showProductForm, setShowProductForm] = useState(false);
  const [productData, setProductData] = useState({
    name: '',
    oldPrice: '',
    newPrice: '',
    imageFile: null,
    description: '',
    category: 'Electronics'
  });
  const [newCategory, setNewCategory] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [expandedCategorySection, setExpandedCategorySection] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredProductIndex, setHoveredProductIndex] = useState(null);
  const [editingProductIndex, setEditingProductIndex] = useState(null);
  const [editProductData, setEditProductData] = useState(null);

  const handleToggleProductForm = () => {
    setShowProductForm(!showProductForm);
    setExpandedCategorySection(!showProductForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductData({ ...productData, imageFile: file });
  };

  const addProduct = () => {
    if (productData.name.trim() !== '' && productData.imageFile !== null) {
      const formData = { ...productData };
      setProducts([...products, formData]);
      setProductData({
        name: '',
        oldPrice: '',
        newPrice: '',
        imageFile: null,
        description: '',
        category: 'Electronics'
      });
      setShowProductForm(false);
      setExpandedCategorySection(false);
    }
  };

  const deleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== '' && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleMouseEnter = (index) => {
    setHoveredProductIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredProductIndex(null);
  };

  const handleEditProduct = (index) => {
    setEditingProductIndex(index);
    setEditProductData({ ...products[index] });
  };

  const handleCancelEdit = () => {
    setEditingProductIndex(null);
    setEditProductData(null);
  };

  const handleSaveEdit = () => {
    const updatedProducts = [...products];
    updatedProducts[editingProductIndex] = editProductData;
    setProducts(updatedProducts);
    setEditingProductIndex(null);
    setEditProductData(null);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditProductData({ ...editProductData, [name]: value });
  };

  return (
    <div className="vendor-dashboard">
        <div className="profile-section">
          <div className="profile-info">
            <h2>Vendor Profile</h2>
            <img className="business-logo" src={profileImage ? URL.createObjectURL(profileImage) : "https://via.placeholder.com/150"} alt="Business Logo" />
            <input className='enter' type="file" accept="image/*" onChange={handleProfileImageChange} />
          </div>
          <div className="dashboard-links">
          <div className="dashboard-item">
            <h3>Home</h3>
          </div>
          <div className="dashboard-item">
            <h3>Orders</h3>
          </div>
          <div className="dashboard-item">
            <h3>Customers</h3>
          </div>
          <div className="dashboard-item">
            <h3>Reports</h3>
          </div>
        </div>
        </div>
        <div className="main-section">
        <div className="header">
          <h1>Vendor Dashboard</h1>
          <button className="add-product-btn" onClick={handleToggleProductForm}>Add Product</button>
        </div>
        {showProductForm && (
          <form className="product-form">
            <input className='enter' 
              type="text"
              placeholder="Product Name"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
            />
             

            <input className='enter'
              type="number"
              placeholder="Old Price"
              name="oldPrice"
              value={productData.oldPrice}
              onChange={handleInputChange}
            />
            <input className='enter'
              type="number"
              placeholder="New Price"
              name="newPrice"
              value={productData.newPrice}
              onChange={handleInputChange}
            />
            <select name="category" value={productData.category} onChange={handleInputChange}>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
            <input className='enter'
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <textarea
              placeholder="Description"
              name="description"
              value={productData.description}
              onChange={handleInputChange}
            ></textarea>
            <button type="button" onClick={addProduct}>Add</button>
          </form>
        )}
        <div className={`product-list ${selectedCategory ? 'expanded' : ''}`}>
          <h2>LIST OF PRODUCTS</h2>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price (UGX)</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, idx) => (
                <tr key={idx} onClick={() => handleCategorySelect(product)} onMouseEnter={() => handleMouseEnter(idx)} onMouseLeave={handleMouseLeave}>
                  {editingProductIndex === idx ? (
                    <>
                      <td><input className='enter' type="text" name="name" value={editProductData.name} onChange={handleEditInputChange} /></td>
                      <td><input className='enter' type="number" name="newPrice" value={editProductData.newPrice} onChange={handleEditInputChange} /></td>
                      <td>
                        <select name="category" value={editProductData.category} onChange={handleEditInputChange}>
                          {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <button onClick={handleSaveEdit}>Save</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{product.name}</td>
                      <td>{product.newPrice}</td>
                      <td>{product.category}</td>
                      <td>
                        {hoveredProductIndex === idx && (
                          <button onClick={() => handleEditProduct(idx)}>Edit</button>
                        )}
                        <button onClick={() => deleteProduct(idx)}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
    </div>
  );
};

export default ManageSeller;
