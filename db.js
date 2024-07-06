/** @format */
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  //   database: process.env.DATABASE,
  password: process.env.PASSWORD,
  name: process.env.NAME,
  port: 5432,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  console.log("Connected to the database");
  release();
});

module.exports = pool;
