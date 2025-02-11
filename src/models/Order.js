'use strict';
const {
  Model
} = require('sequelize');
const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    static associate(models) {
      orders.belongsTo(models.events, {
        foreignKey: 'eventId',
        onDelete: 'CASCADE'
      })
    }
  };
  orders.init({
    userId: DataTypes.STRING,
    eventId: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'orders',
  });
  orders.beforeCreate(event => event.id = uuid.v4());
  return orders;
};