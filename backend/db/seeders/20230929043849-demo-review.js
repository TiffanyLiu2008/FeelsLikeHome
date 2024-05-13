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
    review: 'Newly renovated home. Minutes from Stanford University, HP, Google and Tesla.',
    stars: 4
  },
  {
    userId: 2,
    spotId: 2,
    review: 'I loved the regal rooftop ballroom with sweeping views of midtown Manhattan!',
    stars: 5
  },
  {
    userId: 3,
    spotId: 3,
    review: 'I truly enjoyed the captivating atmosphere shaped by dynamic surroundings.',
    stars: 4
  },
  {
    userId: 1,
    spotId: 4,
    review: 'Only steps from Millennium Park, Willis Tower and the Art Institute of Chicago!',
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
