const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Category = sequelize.define('Category', {
  title: { type: DataTypes.STRING(100), allowNull: false },
  active: { type: DataTypes.BOOLEAN, defaultValue: true },
  slug: { type: DataTypes.STRING, unique: true }
}, {
  timestamps: true,
  tableName: 'categories'
});

module.exports = Category;