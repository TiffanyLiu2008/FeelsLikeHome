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
    review: 'BnB 1 (owned by 1) - reviewed by 2',
    stars: 1
  },
  {
    userId: 2,
    spotId: 2,
    review: 'BnB 2 (owned by 1) - reviewed by 2',
    stars: 2
  },
  {
    userId: 2,
    spotId: 5,
    review: 'BnB 5 (owned by 3) - reviewed by 2',
    stars: 5
  },
  {
    userId: 2,
    spotId: 6,
    review: 'BnB 6 (owned by 3) - reviewed by 2',
    stars: 1
  },
  {
    userId: 3,
    spotId: 1,
    review: 'BnB 1 (owned by 1) - reviewed by 3',
    stars: 2
  },
  {
    userId: 3,
    spotId: 2,
    review: 'BnB 2 (owned by 1) - reviewed by 3',
    stars: 3
  },
  {
    userId: 3,
    spotId: 3,
    review: 'BnB 3 (owned by 2) - reviewed by 3',
    stars: 3
  },
  {
    userId: 3,
    spotId: 4,
    review: 'BnB 4 (owned by 2) - reviewed by 3',
    stars: 4
  },
  {
    userId: 1,
    spotId: 3,
    review: 'BnB 3 (owned by 2) - reviewed by 1',
    stars: 4
  },
  {
    userId: 1,
    spotId: 4,
    review: 'BnB 4 (owned by 2) - reviewed by 1',
    stars: 5
  },
  {
    userId: 1,
    spotId: 5,
    review: 'BnB 5 (owned by 3) - reviewed by 1',
    stars: 1
  },
  {
    userId: 1,
    spotId: 6,
    review: 'BnB 6 (owned by 3) - reviewed by 1',
    stars: 2
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
