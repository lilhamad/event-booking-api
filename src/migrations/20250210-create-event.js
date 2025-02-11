'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('events', {
      id: {
        allowNull: true,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      venue: {
        allowNull: true,
        type: Sequelize.STRING
      },
      capacity: {
        allowNull: true,
        type: Sequelize.INTEGER
      },      
      booked: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      date: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('events');
  }
};