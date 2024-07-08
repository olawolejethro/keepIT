/** @format */

// models/userorganisations.js
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
      modelName: "UserOrganisation",
      tableName: "UserOrganisations",
      timestamps: false,
    }
  );

  return UserOrganisations;
};
