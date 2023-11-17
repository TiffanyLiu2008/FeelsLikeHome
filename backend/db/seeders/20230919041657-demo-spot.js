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
    name: 'BnB Number 1',
    description: 'BnB Number 1 - Best Spot in NYC',
    price: 1000
  },
  {
    ownerId: 1,
    address: '123 B Street',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    lat: 40.7302,
    lng: -73.9402,
    name: 'BnB Number 2',
    description: 'BnB Number 2 - Best Spot in NYC',
    price: 2000
  },
  {
    ownerId: 2,
    address: '123 C Street',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    lat: 40.7303,
    lng: -73.9403,
    name: 'BnB Number 3',
    description: 'BnB Number 3 - Best Spot in NYC',
    price: 3000
  },
  {
    ownerId: 2,
    address: '123 D Street',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    lat: 40.7304,
    lng: -73.9404,
    name: 'BnB Number 4',
    description: 'BnB Number 4 - Best Spot in NYC',
    price: 4000
  },
  {
    ownerId: 3,
    address: '123 E Street',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    lat: 40.7305,
    lng: -73.9405,
    name: 'BnB Number 5',
    description: 'BnB Number 5 - Best Spot in NYC',
    price: 5000
  },
  {
    ownerId: 3,
    address: '123 F Street',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    lat: 40.7306,
    lng: -73.9406,
    name: 'BnB Number 6',
    description: 'BnB Number 6 - Best Spot in NYC',
    price: 6000
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
