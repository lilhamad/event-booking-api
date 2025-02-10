'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class events extends Model {
    
  };
  events.init({
    name: DataTypes.STRING,
    venue: DataTypes.STRING,
    date: DataTypes.DATE,
    capacity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'events',
  });
  return events;
};