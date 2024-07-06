/** @format */

require(".../../../dotenv-config");

module.exports = {
  user: process.env.USER,
  host: process.env.HOST,
  //   database: process.env.DATABASE,
  password: process.env.PASSWORD,
  name: process.env.NAME,
  port: 5432,
};
