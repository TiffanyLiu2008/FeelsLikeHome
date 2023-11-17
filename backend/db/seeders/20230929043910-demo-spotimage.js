'use strict';
/** @type {import('sequelize-cli').Migration} */

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const spotImages = [
  {
    url: 'https://spot1Image.com',
    preview: true,
    spotId: 1
  },{
    url: 'https://spot2Image.com',
    preview: true,
    spotId: 2
  },{
    url: 'https://spot3Image.com',
    preview: true,
    spotId: 3
  },
  {
    url: 'https://spot4Image.com',
    preview: true,
    spotId: 4
  },{
    url: 'https://spot5Image.com',
    preview: true,
    spotId: 5
  },{
    url: 'https://spot6Image.com',
    preview: true,
    spotId: 6
  },
];

module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate(spotImages, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options, {
      url: spotImages.map(spotImage => spotImage.url)
    },{});
  }
};
