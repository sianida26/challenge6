'use strict';
const {
  Model
} = require('sequelize');
const { User } = require('./index');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Car.init({
    plate: DataTypes.STRING,
    manufacture: DataTypes.STRING,
    model: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.INTEGER.UNSIGNED,
    capacity: DataTypes.INTEGER.UNSIGNED,
    description: DataTypes.STRING,
    transmission: DataTypes.ENUM('automatic', 'manual'),
    type: DataTypes.STRING,
    year: DataTypes.INTEGER.UNSIGNED,
    createdBy: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      }
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      }
    },
    deletedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      }
    },
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};