const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Review = sequelize.define('Review', {}, {
  timestamps: false,
  tableName: 'reviews'
});

module.exports = Review;