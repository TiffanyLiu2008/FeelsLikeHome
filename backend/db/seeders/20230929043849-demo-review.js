'use strict';
/** @type {import('sequelize-cli').Migration} */

const { Review } = require('../models');

const reviews = [
  {
    userId: 1,
    spotId: 1,
    review: 'Very bad!',
    stars: 1
  },
  {
    userId: 2,
    spotId: 2,
    review: 'So so!',
    stars: 2
  },
  {
    userId: 3,
    spotId: 3,
    review: 'Very good!',
    stars: 3
  }
];

module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate(reviews, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', {
      stars: reviews.map(review => review.stars)
    },{});
  }
};
