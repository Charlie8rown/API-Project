'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Spot', key: 'id' },
        onDelete: 'CASCADE'
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id'},
        onDelete: 'CASCADE'
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      endDate: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    await queryInterface.dropTable(options);
  }
};
