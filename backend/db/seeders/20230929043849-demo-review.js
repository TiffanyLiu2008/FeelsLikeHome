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
    review: 'BnB Number 1 - very bad!',
    stars: 1
  },
  {
    userId: 2,
    spotId: 2,
    review: 'BnB Number 2 - very bad!',
    stars: 2
  },
  {
    userId: 3,
    spotId: 3,
    review: 'BnB Number 3 - so so!',
    stars: 3
  },
  {
    userId: 3,
    spotId: 4,
    review: 'BnB Number 4 - so so!',
    stars: 4
  },
  {
    userId: 1,
    spotId: 5,
    review: 'BnB Number 5 - very good!',
    stars: 5
  },
  {
    userId: 1,
    spotId: 6,
    review: 'BnB Number 6 - very good!',
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
