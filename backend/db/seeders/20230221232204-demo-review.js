'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


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

    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
       spotId: 1,
       userId: 1,
       review: 'Very beautiful building, but way too many homeless around this area.',
       stars: 2
      },
      {
        spotId: 2,
        userId: 2,
        review: 'Best views to have while chilling in the hot tub.',
        stars: 4
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Over priced a little scary.',
        stars: 3
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

    options.tableName = 'Reviews'
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(options, {
      userId:
      { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
