'use strict';
/** @type {import('sequelize-cli').Migration} */

const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

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
  },
];

module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate(reviewImages, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkDelete(options, {
      url: reviewImages.map(reviewImage => reviewImage.url)
    },{});
  }
};
