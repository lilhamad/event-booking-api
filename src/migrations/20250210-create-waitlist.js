'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('waitlists', {
      id: {
        allowNull: true,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      userId: {
        allowNull: true,
        type: Sequelize.STRING
      },      
      eventId: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: 'events',
          key: 'id',
          as: 'eventId',
        }
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
    await queryInterface.dropTable('waitlists');
  }
};