/** @format */

const dotenv = require("dotenv-safe");

dotenv.config({
  example: process.env.CI ? ".env.ci.example" : ".env.example",
  // allowEmptyValues: true
});

module.exports = dotenv;
