"use strict";
const { Model } = require("sequelize");
const { like } = require("sequelize/types/lib/operators");

module.exports = (sequelize, DataTypes) => {
  class Palettes extends Model {
    static associate(models) {
      models.Palettes.belongsToMany(models.Users, {
        through: "Like",
      });
      models.Palettes.belongsTo(models.Users, {
        foreignKey: "user_id",
        targetKey: "id",
        onDelete: "cascade",
      });
      models.Palettes.hasMany(models.Tags, {
        foreignKey: "tag_id",
        targetKey: "id",
        onDelete: "cascade",
      });
    }
  }
  user.init(
    {
      color1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color2: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color3: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color4: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "palettes",
    }
  );

  return user;
};
