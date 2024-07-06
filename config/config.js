/** @format */

require("dotenv").config();

console.log(process.env.DB_PASSWORD);
module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.PORT,
  dialect: "postgres",
};
