const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Specification = sequelize.define('Specification', {
  title: { type: DataTypes.STRING(100), allowNull: false },
  content: { type: DataTypes.STRING(1000), allowNull: false }
}, {
  timestamps: false,
  tableName: 'specifications'
});

module.exports = Specification;