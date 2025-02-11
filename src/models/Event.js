'use strict';
const {
  Model
} = require('sequelize');
const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class events extends Model {
    static associate(models) {
      events.hasMany(models.orders, {
        foreignKey: 'eventId',
      });
    }
  };
  events.init({
    name: DataTypes.STRING,
    venue: DataTypes.STRING,
    date: DataTypes.DATE,
    capacity: DataTypes.INTEGER,
    booked: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'events',
  });
  events.beforeCreate(event => event.id = uuid.v4());
  return events;
};