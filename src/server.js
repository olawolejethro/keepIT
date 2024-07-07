/** @format */
const app = require("./app");
// const db = require("../src/db/models/user");

require("dotenv").config();

const PORT = process.env.M_PORT || 8000;

// Test database connection
try {
  // db.sequelize
  //   .authenticate()
  //   .then(() => {
  // })
  console.log("Connection has been established successfully.");
} catch (err) {
  console.error("Unable to connect to the database:", err);
}

// Sync all models
// db.sequelize
//   .sync()
//   .then(() => {
//     console.log("Database & tables created!");
//   })
//   .catch((err) => {
//     console.error("Error creating database & tables:", err);
//   });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
