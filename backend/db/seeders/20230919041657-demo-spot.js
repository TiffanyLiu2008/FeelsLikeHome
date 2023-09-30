'use strict';
/** @type {import('sequelize-cli').Migration} */

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const spots = [
  {
    ownerId: 1,
    address: '123 A Street',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    lat: 40.7301,
    lng: -73.9401,
    name: 'Good Bnb',
    description: 'Good Place in NYC',
    price: 1000
  },
  {
    ownerId: 2,
    address: '123 B Street',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    lat: 40.7302,
    lng: -73.9402,
    name: 'Better Bnb',
    description: 'Better Place in NYC',
    price: 2000
  },
  {
    ownerId: 3,
    address: '123 C Street',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    lat: 40.7303,
    lng: -73.9403,
    name: 'Best Bnb',
    description: 'Best Place in NYC',
    price: 3000
  },
];

module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate(spots, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options, {
      name: spots.map(spot => spot.name)
    },{});
  }
};
