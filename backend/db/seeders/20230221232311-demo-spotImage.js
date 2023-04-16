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


    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
       spotId: 1,
       url: 'https://ssl.cdn-redfin.com/photo/45/bigphoto/507/BB21004507_34_0.jpg',
       preview: true,
      },
      {
        spotId: 1,
        url: 'https://ssl.cdn-redfin.com/photo/45/bigphoto/507/BB21004507_3_0.jpg',
        preview: false,
       },
       {
        spotId: 1,
        url: 'https://ssl.cdn-redfin.com/photo/45/bigphoto/507/BB21004507_4_0.jpg',
        preview: false,
       },
       {
        spotId: 1,
        url: 'https://ssl.cdn-redfin.com/photo/45/bigphoto/507/BB21004507_2_0.jpg',
        preview: false,
       },
       {
        spotId: 1,
        url: 'https://ssl.cdn-redfin.com/photo/45/bigphoto/507/BB21004507_28_0.jpg',
        preview: false,
       },

      {
        spotId: 2,
        url: 'https://photos.zillowstatic.com/fp/e9cd5bcb4747e256321f2dbe45bc5e4a-uncropped_scaled_within_1536_1152.webp',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://photos.zillowstatic.com/fp/f6bcc8af4574390779f43ec98e1def8f-uncropped_scaled_within_1536_1152.webp',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://photos.zillowstatic.com/fp/702d1626111e2c9a1237e3174e533375-uncropped_scaled_within_1536_1152.webp',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://photos.zillowstatic.com/fp/576496fb02c4cce8590d4082d78158c6-uncropped_scaled_within_1536_1152.webp',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://photos.zillowstatic.com/fp/b7d6ddf7c2c3ee6f331b679ffbbad718-uncropped_scaled_within_1536_1152.webp',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://photos.zillowstatic.com/fp/03981f7f24f060754d348865cbd7a19e-uncropped_scaled_within_1536_1152.webp',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://photos.zillowstatic.com/fp/a6653cfe78a166ff1915c8e615c84a05-uncropped_scaled_within_1536_1152.webp',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://photos.zillowstatic.com/fp/1aec5d5384cd5ad250b0f589c9ee7a3e-uncropped_scaled_within_1536_1152.webp',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://photos.zillowstatic.com/fp/15ae6d6953b1764baadf80393d412988-uncropped_scaled_within_1536_1152.webp',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://photos.zillowstatic.com/fp/f0ca9fef80ebff089f3b3e4d8de3d098-uncropped_scaled_within_1536_1152.webp',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://www.houseloanblog.net/wp-content/uploads/2020/07/murder-houses-1.jpg',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://www.houseloanblog.net/wp-content/uploads/2020/07/murder-houses-1.jpg',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://www.houseloanblog.net/wp-content/uploads/2020/07/murder-houses-1.jpg',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://www.houseloanblog.net/wp-content/uploads/2020/07/murder-houses-1.jpg',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://www.houseloanblog.net/wp-content/uploads/2020/07/murder-houses-1.jpg',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://247wallst.com/wp-content/uploads/2021/10/los-feliz-murder-mansion.jpg',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://247wallst.com/wp-content/uploads/2021/10/los-feliz-murder-mansion.jpg',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://247wallst.com/wp-content/uploads/2021/10/los-feliz-murder-mansion.jpg',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://247wallst.com/wp-content/uploads/2021/10/los-feliz-murder-mansion.jpg',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://247wallst.com/wp-content/uploads/2021/10/los-feliz-murder-mansion.jpg',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://247wallst.com/wp-content/uploads/2021/10/conjuring-house.jpg',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://247wallst.com/wp-content/uploads/2021/10/Watts-House-1.jpg',
        preview: true,
      },
      {
        spotId: 7,
        url: 'https://247wallst.com/wp-content/uploads/2021/10/GettyImages-1006821246-e1635514186137.jpg',
        preview: true,
      },
      {
        spotId: 8,
        url: 'https://247wallst.com/wp-content/uploads/2021/10/in-cold-blood-homer.jpg',
        preview: true,
      },
      {
        spotId: 9,
        url: 'https://247wallst.com/wp-content/uploads/2021/10/lizzie-bordern-house.jpg',
        preview: true,
      },
      {
        spotId: 10,
        url: 'https://247wallst.com/wp-content/uploads/2021/10/Phil-spector-house.jpg',
        preview: true,
      },
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
