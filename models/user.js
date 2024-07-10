/** @format */

"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany(models.Organisation, {
        through: models.UserOrganisations,
        foreignKey: "userId",
        otherKey: "orgId",
        as: "organisations",
        onDelete: "CASCADE",
      });
    }
  }

  User.init(
    {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        defaultValue: uuidv4,
        validate: {
          notNull: {
            msg: "User ID is required",
          },
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "First name is required",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Last name is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Must be a valid email address",
          },
          notNull: {
            msg: "Email is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password is required",
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        validate: {
          is: {
            args: /^\d{10}$/,
            msg: "Phone number must be a valid 10-digit number",
          },
        },
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "User",
      tableName: "Users",
    }
  );

  return User;
};
