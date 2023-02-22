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
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address:'1 Dr Carlton B Goodlett Pl',
        city: 'San Francisco',
        state:'California',
        country: 'United States',
        lat: 37.7749,
        lng: 122.4194,
        name:'Oceanview high-end home by Beach',
        description: `About this space The Outer Richmond in San Francisco is a family-friendly district with several fun things to do.`,
        price: 622,
      },
      {
        ownerId: 2,
        address:'1198 Fulton St',
        city:'San Francisco',
        state: 'California',
        country: 'United States',
        lat:37.7765,
        lng:122.4150,
        name:'Big, quiet, top flr apt, hot tub, views, king beds',
        description:`Everyone will love you for bringing them to this clean, spacious, private, fully-equipped suite.`,
        price: 598,
      },
      {
        ownerId: 3,
        address: '525 S Winchester Blvd',
        city: 'San Jose',
        state: 'California',
        country: 'United States',
        lat: 37.3183,
        lng: 121.9510,
        name: 'Winchester Mystery House',
        description: 'Sprawling landmark with a staircase leading nowhere & other odd features designed to confuse ghosts.',
        price: 100
      }
    ],{});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots'
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(options, {
      name:
      { [Op.in]: ['Oceanview high-end home by Beach', 'Big, quiet, top flr apt, hot tub, views, king beds', 'Winchester Mystery House'] }
    }, {})
  }
};
