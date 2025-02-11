'use strict';
const {
  Model
} = require('sequelize');
const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      users.hasMany(models.orders, {
        foreignKey: 'userId',
      });
    }
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