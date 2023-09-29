'use strict';
/** @type {import('sequelize-cli').Migration} */

const { ReviewImage } = require('../models');

const reviewImages = [
  {
    url: 'https://review1Image.com',
    reviewId: 1
  },{
    url: 'https://review2Image.com',
    reviewId: 2
  },{
    url: 'https://review3Image.com',
    reviewId: 3
  }
];

module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate(reviewImages, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ReviewImages', {
      url: reviewImages.map(reviewImage => reviewImage.url)
    },{});
  }
};
