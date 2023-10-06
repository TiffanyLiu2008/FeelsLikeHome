'use strict';
/** @type {import('sequelize-cli').Migration} */

const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const bookings = [
  {
    spotId: 1,
    userId: 1,
    startDate: '2023-01-01',
    endDate: '2023-01-02'
  },
  {
    spotId: 2,
    userId: 2,
    startDate: '2023-02-01',
    endDate: '2023-02-02'
  },
  {
    spotId: 3,
    userId: 3,
    startDate: '2023-03-01',
    endDate: '2023-03-02'
  },
];

module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate(bookings, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkDelete(options, {
      startDate: bookings.map(booking => booking.startDate)
    },{});
  }
};
