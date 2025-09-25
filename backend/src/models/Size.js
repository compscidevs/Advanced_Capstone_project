const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Size = sequelize.define('Size', {
  name: { type: DataTypes.STRING(100), allowNull: false },
  price: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.00 }
}, {
  timestamps: false,
  tableName: 'sizes'
});

module.exports = Size;