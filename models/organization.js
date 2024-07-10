/** @format */

"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Organisation extends Model {
    static associate(models) {
      this.belongsToMany(models.User, {
        through: models.UserOrganisations,
        foreignKey: "orgId",
        otherKey: "userId",
        as: "users",
        onDelete: "CASCADE",
      });
    }
  }

  Organisation.init(
    {
      orgId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        defaultValue: uuidv4,
        validate: {
          notNull: {
            msg: "Organisation ID is required",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Organisation",
      tableName: "Organisations",
    }
  );

  return Organisation;
};
