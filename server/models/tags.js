"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      models.Tag.belongsToMany(models.Palette, {
        through: "Tag_Palette",
        foreignKey: "tag_id",
      });
    }
  }
  Tag.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isColorTag: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Tag",
      tableName: "Tags",
    }
  );

  return Tag;
};
