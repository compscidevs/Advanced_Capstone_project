const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Gallery = sequelize.define('Gallery', {
  image: { type: DataTypes.STRING, defaultValue: 'Product.jpg' },
  active: { type: DataTypes.BOOLEAN, defaultValue: true },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  gid: { type: DataTypes.STRING, unique: true }
}, {
  timestamps: false,
  tableName: 'galleries'
});

module.exports = Gallery;