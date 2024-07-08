/** @format */

"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    static associate(models) {
      // Many-to-many relationship with User
      this.belongsToMany(models.User, {
        through: "UserOrganizations",
        foreignKey: "orgId",
        otherKey: "userId",
        as: "Users",
      });
    }
  }

  Organization.init(
    {
      orgId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        defaultValue: uuidv4,
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
      modelName: "Organization",
      tableName: "Organizations",
    }
  );

  return Organization;
};
