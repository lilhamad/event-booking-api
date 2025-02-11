'use strict';
const {
  Model
} = require('sequelize');
const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    
  };
  users.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'users',
  });
  users.beforeCreate(event => event.id = uuid.v4());
  return users;
};