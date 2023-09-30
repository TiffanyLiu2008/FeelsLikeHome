'use strict';
/** @type {import('sequelize-cli').Migration} */

const { SpotImage } = require('../models');

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
];

module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate(spotImages, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('spotImages', {
      url: spotImages.map(spotImage => spotImage.url)
    },{});
  }
};
