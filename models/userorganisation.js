/** @format */

"use strict";

module.exports = (sequelize, DataTypes) => {
  const UserOrganisations = sequelize.define(
    "UserOrganisations",
    {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      orgId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "UserOrganisations",
      timestamps: false,
    }
  );

  // Define the association with the Organisation and User models
  UserOrganisations.associate = (models) => {
    UserOrganisations.belongsTo(models.Organisation, {
      foreignKey: "orgId",
      as: "organisation",
      onDelete: "CASCADE",
    });

    UserOrganisations.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
    });
  };

  return UserOrganisations;
};
