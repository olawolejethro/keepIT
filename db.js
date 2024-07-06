/** @format */

// /** @format */
// const { Pool } = require("pg");
// require("dotenv").config();

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   password: process.env.DB_PASSWORD,
//   name: process.env.DB_NAME,
//   port: 5432,
// });

// pool.connect((err, client, release) => {
//   if (err) {
//     return console.error("Error acquiring client", err.stack);
//   }
//   console.log("Connected to the database");
//   release();
// });

// module.exports = pool;
