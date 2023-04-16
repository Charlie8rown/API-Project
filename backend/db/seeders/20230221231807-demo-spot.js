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
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address:'3311 Waverly Drive',
        city: 'Los Angeles',
        state:'California',
        country: 'United States',
        lat: 37.7749,
        lng: 122.4194,
        name:'Oceanview high-end home by Beach',
        description: `Classic, 1920’s Los Feliz gated single story pool home with breathtaking, unobstructed front and back views and an infamous history. Sitting on a huge 31,000+ sq foot lot, this property has tremendous upside potential as the lot size is truly rare for the pristine location.`,
        price: 215,
      },
      {
        ownerId: 2,
        address:'122 Al Blvd',
        city:'Chicago',
        state: 'Illinois',
        country: 'United States',
        lat:37.7765,
        lng:122.4150,
        name:'Big Als',
        description:`This was the Chicago home of Al Capone and Family. Al Capone and family began to move into the place on August 8,1923. The ownership was under Mae and Theresa Capone. Frank Capone's funeral was held here in 1924. Theresa Capone passed away in this house in 1952.`,
        price: 100,
      },
      {
        ownerId: 3,
        address: '123 Dahmer Blvd',
        city: 'Akron',
        state: 'Ohio',
        country: 'United States',
        lat: 37.3183,
        lng: 121.9510,
        name: 'The Dahmer',
        description: 'Mid-century modern home with a true park-like setting. Smoking and animals okay. Close to Cuyahoga Valley National Park, Montrose shopping. Easy access to I-77 highway.',
        price: 125
      },
      {
        ownerId: 3,
        address: '124 Felix Blvd',
        city: 'Los Angeles',
        state: 'California',
        country: 'United States',
        lat: 37.3183,
        lng: 121.9510,
        name: 'Los Feliz Murder Mansion',
        description: 'This five-bedroom, 3.5-bath home known as the “Los Feliz Murder Mansion” is where Dr. Harold Perelson killed his wife with a hammer in 1959. The grim history of the Los Angeles home led to rumors the home was haunted, and it was vacant for many years. The home was purchased for nearly $2.3 million in 2016, then sold for $2.35 million in late 2020.',
        price: 100
      },
      {
        ownerId: 2,
        address: '125 Con Blvd',
        city: 'Burrillville',
        state: 'Rhode Island',
        country: 'United States',
        lat: 37.3183,
        lng: 121.9510,
        name: 'The Conjuring home',
        description: 'What may seem like an unassuming farm home in Burrillville, Rhode Island, served as the inspiration for one of the most frightening horror films in recent years — 2013’s “The Conjuring.”',
        price: 100
      },
      {
        ownerId: 1,
        address: '126 Watts Blvd',
        city: 'Frederick',
        state: 'Colorado',
        country: 'United States',
        lat: 37.3183,
        lng: 121.9510,
        name: "Chris Watts’ home",
        description: 'The vacant home where the Watts family used to live in Frederick, Colorado, became the setting of a Netflix true crime documentary, titled “American Murder: The Family Next Door.”',
        price: 100
      },
      {
        ownerId: 1,
        address: '127 John Blvd',
        city: 'Norwood Park Township',
        state: 'Illinois',
        country: 'United States',
        lat: 37.3183,
        lng: 121.9510,
        name: "John Wayne Gacy’s House",
        description: 'Sprawling landmark with a lengthy history some say you can still feel the lost souls.',
        price: 100
      },
      {
        ownerId: 2,
        address: '128 Farmhouse Blvd',
        city: 'Holcomb',
        state: 'Kansas',
        country: 'United States',
        lat: 37.3183,
        lng: 121.9510,
        name: 'The Farmhouse from “In Cold Blood”',
        description: 'With the popularity of the book, the house itself became popular as well, with tourists from all over the world coming to Holcomb, Kansas',
        price: 100
      },
      {
        ownerId: 3,
        address: '129 Lizzie Blvd',
        city: 'Fall River',
        state: 'Massachusetts',
        country: 'United States',
        lat: 37.3183,
        lng: 121.9510,
        name: 'Lizzie Borden Ax murder home',
        description: 'Lizzie Borden was the subject of one of the most famous murder investigations in American history. In 1892, her father Andrew and stepmother Abby were found murdered in their Fall River, Massachusetts, home. Daughter Lizzie was suspected of killing them with an ax and put on trial, but she was acquitted.',
        price: 100
      },
      {
        ownerId: 1,
        address: '130 Phil Blvd',
        city: 'Alhambra',
        state: 'California',
        country: 'United States',
        lat: 37.3183,
        lng: 121.9510,
        name: 'Phil Spector’s Pyrenees Castle',
        description: 'Music producer Phil Spector had a legendary career, working with artists like the Righteous Brothers and The Beatles. But he spent the last years of his life in prison, after he murdered model and actor Lana Clarkson in the foyer of his Southern California mansion in 2003. ',
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
