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

    options.tableName = 'ReviewImages';

    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'https://lh3.googleusercontent.com/p/AF1QipN9j_k1RDzMXTOQCkwGKrHWMQV-VVvnCPhHFbZ_=s680-w680-h510',
      },
      {
        reviewId: 2,
        url:'https://lh3.googleusercontent.com/p/AF1QipNYcYqhVHxcADlMcNczg4vDm_3tm9lfkn_5TbUz=s680-w680-h510',
      },
      {
        reviewId: 3,
        url:'https://lh3.googleusercontent.com/p/AF1QipOcNhDYREUzhUps9S4EOeIp0tnZtOxi9oU_h4qy=s680-w680-h510',
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

    options.tableName = 'ReviewImages'
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(options, {
      reviewId:
      { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
