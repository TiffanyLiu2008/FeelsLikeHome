'use strict';
/** @type {import('sequelize-cli').Migration} */

const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const reviewImages = [
  {
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/1_1.png',
    reviewId: 1
  },{
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/2_1.png',
    reviewId: 2
  },{
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/3_1.png',
    reviewId: 3
  },
  {
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/4_1.png',
    reviewId: 4
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
