/** @format */

"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    //   this.hasMany(models.Address, { foreignKey: "userId", as: "addresses" });
    //   this.hasMany(models.Apartment, { as: "apartments" });
    //   this.hasMany(models.ApartmentComment, {
    //     foreignKey: "userId",
    //     as: "apartmentComment",
    //   });
    //   this.hasMany(models.Hotel, {
    //     foreignKey: "userId",
    //     as: "hotels",
    //   });
    //   this.hasMany(models.RealEstate, {
    //     foreignKey: "userId",
    //     as: "realEstates",
    //   });
    //   this.hasMany(models.CoWorkingSpace, {
    //     foreignKey: "userId",
    //     as: "coworkingSpaces",
    //   });
    // }
  }
  User.init(
    {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },

    {
      sequelize,
      timestamps: true,
      modelName: "User",
      tableName: "users",
    }
  ),
    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    };

  // Here we associate which actually populates out pre-declared `association` static and other methods.
  // Addresses - one-to-many.
  // User.hasMany(Address, {
  //   foreignKey: 'user_id', // this determines the name in `associations`!
  //   as: 'addresses',
  // });
  // Address.belongsTo(User, { foreignKey: 'user_id' });

  return User;
};
