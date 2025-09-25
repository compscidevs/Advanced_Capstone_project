const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const CartOrderItem = sequelize.define('CartOrderItem', {
  qty: { type: DataTypes.INTEGER, defaultValue: 0 },
  price: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.00 },
  sub_total: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.00 },
  shipping_amount: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.00 },
  service_fee: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.00 },
  tax_fee: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.00 },
  total: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.00 },
  country: { type: DataTypes.STRING(100) },
  size: { type: DataTypes.STRING(100) },
  color: { type: DataTypes.STRING(100) },
  initial_total: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.00 },
  saved: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.00 },
  oid: { type: DataTypes.STRING, unique: true },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  timestamps: false,
  tableName: 'cart_order_items'
});

module.exports = CartOrderItem;