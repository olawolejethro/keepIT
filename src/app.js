/** @format */

const express = require("express");
const helmet = require("helmet");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");

require("../db");

const app = express();
app.use(helmet());
app.use(express.json());

app.use("/", authRoute);
app.use("/api/user", userRoute);

// app.use("/api", Route);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// module.exports = router;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
// jjdjjhh
module.exports = app;
