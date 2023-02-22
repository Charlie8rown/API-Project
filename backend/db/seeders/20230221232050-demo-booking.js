'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate:"2023-3-25",
        endDate:"2023-3-28",
      },
      {
        spotId: 2,
        userId: 2,
        startDate:"2023-10-27",
        endDate:"2023-10-31",
      },
      {
        spotId: 3,
        userId: 3,
        startDate:"2023-12-25",
        endDate:"2023-12-31",
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    options.tableName = 'Bookings'
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(options, {
      spotId:
      { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
