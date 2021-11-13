"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      models.Users.belongsToMany(models.Palettes, {
        through: "Like",
      });
    }
  }
  user.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Image: {
        type: DataTypes.STRING,
        allowNull: true, // 나중에 이미지를 넣을 수  있기 때문에...
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );

  return user;
};
