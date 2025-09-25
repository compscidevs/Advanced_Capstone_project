const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Color = sequelize.define('Color', {
  name: { type: DataTypes.STRING(1000), allowNull: false },
  color_code: { type: DataTypes.STRING(1000), allowNull: false }
}, {
  timestamps: false,
  tableName: 'colors'
});

module.exports = Color;