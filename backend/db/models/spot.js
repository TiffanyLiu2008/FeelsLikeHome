'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.hasMany(models.Booking, {foreignKey: 'spotId'});
      Spot.hasMany(models.Review, {foreignKey: 'spotId'});
      Spot.hasMany(models.SpotImage, {foreignKey: 'spotId'});
      Spot.belongsTo(models.User, {foreignKey: 'ownerId'});
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Street address is required',
        },
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'City is required',
        },
      },
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'State is required',
        },
      },
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Country is required',
        },
      },
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: {
          args: [-90],
          msg: 'Latitude is not valid',
        },
        max: {
          args: [90],
          msg: 'Latitude is not valid',
        },
      },
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: {
          args: [-180],
          msg: 'Longitude is not valid',
        },
        max: {
          args: [180],
          msg: 'Longitude is not valid',
        },
      },
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: {
          args: [1, 49],
          msg: 'Name must be less than 50 characters',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Description is required',
        },
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'Price per day is required',
        },
      },
    },
    previewImage: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
