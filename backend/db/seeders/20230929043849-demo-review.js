'use strict';
/** @type {import('sequelize-cli').Migration} */

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const reviews = [
  {
    userId: 2,
    spotId: 1,
    review: 'I am giving 1 star review',
    stars: 1
  },
  {
    userId: 2,
    spotId: 2,
    review: 'I am giving 2 star review',
    stars: 2
  },
  {
    userId: 2,
    spotId: 5,
    review: 'I am giving 5 star review',
    stars: 5
  },
  {
    userId: 3,
    spotId: 1,
    review: 'I am giving 2 star review',
    stars: 2
  },
  {
    userId: 3,
    spotId: 2,
    review: 'I am giving 3 star review',
    stars: 3
  },
  {
    userId: 3,
    spotId: 3,
    review: 'I am giving 3 star review',
    stars: 3
  },
  {
    userId: 3,
    spotId: 4,
    review: 'I am giving 4 star review',
    stars: 4
  },
  {
    userId: 1,
    spotId: 3,
    review: 'I am giving 4 star review',
    stars: 4
  },
  {
    userId: 1,
    spotId: 4,
    review: 'I am giving 5 star review',
    stars: 5
  },
];

module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate(reviews, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, {
      stars: reviews.map(review => review.stars)
    },{});
  }
};
