const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Tax = sequelize.define('Tax', {
  country: { type: DataTypes.STRING(100), allowNull: false },
  rate: { type: DataTypes.INTEGER, defaultValue: 5 },
  active: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  timestamps: false,
  tableName: 'taxes'
});

module.exports = Tax;