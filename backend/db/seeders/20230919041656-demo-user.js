'use strict';
/** @type {import('sequelize-cli').Migration} */

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'emma@aa.io',
        username: 'EmmaSmith',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Emma',
        lastName: 'Smith'
      },
      {
        email: 'noah@aa.io',
        username: 'NoahJohnson',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Noah',
        lastName: 'Johnson'
      },
      {
        email: 'olivia2@aa.io',
        username: 'OliviaWilliams',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Olivia',
        lastName: 'Williams'
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['EmmaSmith', 'NoahJohnson', 'OliviaWilliams'] }
    }, {});
  }
};
