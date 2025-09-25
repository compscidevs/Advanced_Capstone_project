const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const CartOrder = sequelize.define('CartOrder', {
  sub_total: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.00 },
  shipping_amount: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.00 },
  tax_fee: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.00 },
  service_fee: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.00 },
  total: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.00 },
  payment_status: { type: DataTypes.ENUM('paid', 'pending', 'processing', 'cancelled'), defaultValue: 'pending' },
  order_status: { type: DataTypes.ENUM('Pending', 'Fullfilled', 'Cancelled'), defaultValue: 'Pending' },
  initial_total: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.00 },
  saved: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.00 },
  full_name: { type: DataTypes.STRING(100) },
  email: { type: DataTypes.STRING(100) },
  mobile: { type: DataTypes.STRING(100) },
  address: { type: DataTypes.STRING(100) },
  city: { type: DataTypes.STRING(100) },
  division: { type: DataTypes.STRING(100) },
  country: { type: DataTypes.STRING(100) },
  oid: { type: DataTypes.STRING, unique: true },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  timestamps: false,
  tableName: 'cart_orders'
});

module.exports = CartOrder;