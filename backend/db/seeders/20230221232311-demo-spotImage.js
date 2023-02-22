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


    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
       spotId: 1,
       url: 'https://www.visittheusa.com/sites/default/files/styles/16_9_1280x720/public/2016-10/Getty_591648687_Brand_City_SanFrancisco_Hero_FinalCrop.jpg?itok=NqcWiJZn',
       preview: true,
      },
      {
        spotId: 2,
        url: 'https://www.extraspace.com/wp-content/uploads/2019/05/things-know-living-san-francisco-ca.jpg',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://heartafact.com/wp-content/uploads/2022/07/Island-Boys-hair.png',
        preview: true,
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

    options.tableName = 'SpotImages'
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(options, {
      spotId:
      { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
