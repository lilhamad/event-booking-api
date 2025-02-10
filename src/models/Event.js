'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class externalTransactions extends Model {
    static associate(models) {
      externalTransactions.belongsTo(models.externalSettlement, {
        foreignKey: 'eventId',
        onDelete: 'CASCADE'
      })
    }
  };
  externalTransactions.init({
    name: DataTypes.STRING,
    venue: DataTypes.STRING,
    date: DataTypes.date,
    capacity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'events',
  });
  return externalTransactions;
};