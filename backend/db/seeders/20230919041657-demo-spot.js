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
    address: '4460 El Camino Real',
    city: 'Los Altos',
    state: 'CA',
    country: 'USA',
    lat: 37.3907,
    lng: -122.1421,
    name: 'My Residence Palo Alto',
    description: 'Located in the heart of Silicon Valley, minutes from Stanford University. Conveniently located to San Jose and San Francisco airports.',
    price: 250,
  },
  {
    ownerId: 1,
    address: 'Two E 55th St',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    lat: 40.7615,
    lng: -73.9750,
    name: 'My St. Regis New York',
    description: 'My St. Regis New York is ideally situated at 5th Avenue and 55th Street in midtown Manhattan. The spot is just steps from Central Park, Fifth Avenue Shopping, MoMa, Rockefeller Center, Broadway Central Park, the Museum Mile and the Theater District.',
    price: 1000,
  },
  {
    ownerId: 2,
    address: '900 W Olympic Blvd',
    city: 'Los Angeles',
    state: 'CA',
    country: 'USA',
    lat: 34.0522,
    lng: -118.2543,
    name: 'My Ritz-Carlton, Los Angeles',
    description: 'Set within vibrant downtown surroundings My Ritz-Carlton, Los Angeles effortlessly embodies the timeless appeal of a legendary city. Located at L.A. LIVE, home to world class sports and extraordinary live entertainment our luxury spot, in Los Angeles CA features a captivating atmosphere shaped by dynamic surroundings.',
    price: 1000,
  },
  {
    ownerId: 3,
    address: '172 West Adams Street',
    city: 'Chicago',
    state: 'IL',
    country: 'USA',
    lat: 41.8776,
    lng: -87.6298,
    name: 'My W Chicago - City Center',
    description: 'My W Chicago - City Center sits on the Chicago Loop, near Grant Park, Soldier Field and the Art Institute of Chicago. Our downtown spot also places guests near the Chicago Theater District and Willis Tower. The airport is eight miles away.',
    price: 500,
  },
  {
    ownerId: 3,
    address: '39000 State Route 706 E',
    city: 'Ashford',
    state: 'WA',
    country: 'USA',
    lat: 46.7672,
    lng: -121.7944,
    name: 'My Mount Rainier Campground',
    description: 'My Mount Rainier Campground, on the southwest side of Mt. Rainier National Park, is conveniently located near Paradise.',
    price: 100,
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
