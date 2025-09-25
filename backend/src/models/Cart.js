const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Cart = sequelize.define('Cart', {
  qty: { type: DataTypes.INTEGER, defaultValue: 0 },
  price: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.00 },
  sub_total: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.00 },
  shipping_amount: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.00 },
  service_fee: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.00 },
  total: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.00 },
  country: { type: DataTypes.STRING(100) },
  size: { type: DataTypes.STRING(100) },
  cart_id: { type: DataTypes.STRING(100) },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  timestamps: false,
  tableName: 'carts'
});

module.exports = Cart;