'use strict';
/** @type {import('sequelize-cli').Migration} */

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const spotImages = [
  {
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/1_1.png',
    preview: true,
    spotId: 1
  },{
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/2_1.png',
    preview: true,
    spotId: 2
  },{
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/3_1.png',
    preview: true,
    spotId: 3
  },
  {
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/4_1.png',
    preview: true,
    spotId: 4
  },{
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/5_1.png',
    preview: true,
    spotId: 5
  },
  {
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/1_2.png',
    preview: false,
    spotId: 1
  },{
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/2_2.png',
    preview: false,
    spotId: 2
  },{
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/3_2.png',
    preview: false,
    spotId: 3
  },
  {
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/4_2.png',
    preview: false,
    spotId: 4
  },{
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/5_2.png',
    preview: false,
    spotId: 5
  },
  {
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/1_3.png',
    preview: false,
    spotId: 1
  },{
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/2_3.png',
    preview: false,
    spotId: 2
  },{
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/3_3.png',
    preview: false,
    spotId: 3
  },
  {
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/4_3.png',
    preview: false,
    spotId: 4
  },{
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/5_3.png',
    preview: false,
    spotId: 5
  },
  {
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/1_4.png',
    preview: false,
    spotId: 1
  },{
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/2_4.png',
    preview: false,
    spotId: 2
  },{
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/3_4.png',
    preview: false,
    spotId: 3
  },
  {
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/4_4.png',
    preview: false,
    spotId: 4
  },{
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/5_4.png',
    preview: false,
    spotId: 5
  },
  {
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/1_5.png',
    preview: false,
    spotId: 1
  },{
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/2_5.png',
    preview: false,
    spotId: 2
  },{
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/3_5.png',
    preview: false,
    spotId: 3
  },
  {
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/4_5.png',
    preview: false,
    spotId: 4
  },{
    url: 'https://raw.githubusercontent.com/TiffanyLiu2008/project-images/main/airbnb-images/5_5.png',
    preview: false,
    spotId: 5
  },
];

module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate(spotImages, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options, {
      url: spotImages.map(spotImage => spotImage.url)
    },{});
  }
};
