const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define('Product', {
  title: { type: DataTypes.STRING(100), allowNull: false },
  image: { type: DataTypes.STRING, defaultValue: 'Product.jpg' },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.DECIMAL(12,2), allowNull: false },
  old_price: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.00 },
  shipping_amount: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.00 },
  stock_qty: { type: DataTypes.INTEGER, defaultValue: 1 },
  in_stock: { type: DataTypes.BOOLEAN, defaultValue: true },
  status: { type: DataTypes.ENUM('draft', 'disabled', 'in_review', 'published'), defaultValue: 'published' },
  featured: { type: DataTypes.BOOLEAN, defaultValue: false },
  views: { type: DataTypes.INTEGER, defaultValue: 0 },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  pid: { type: DataTypes.STRING, unique: true },
  slug: { type: DataTypes.STRING, unique: true },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  timestamps: false,
  tableName: 'products'
});

module.exports = Product;