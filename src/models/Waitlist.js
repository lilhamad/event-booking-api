'use strict';
const {
  Model
} = require('sequelize');
const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class waitlists extends Model {
    
  };
  waitlists.init({
    userId: DataTypes.STRING,
    eventId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'waitlists',
  });
  waitlists.beforeCreate(event => event.id = uuid.v4());
  return waitlists;
};