/** @format */

const express = require("express");
// const Route = require("./router");
const { User } = require("../models/");
const helmet = require("helmet");
const router = express.Router();

require("../db");

const app = express();
app.use(helmet());
app.use(express.json());

// app.use("/api", Route);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    // Validate request
    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    // Check if email already exists
    // const existingUser = await User.findOne({ where: { email } });
    // if (existingUser) {
    //   return res.status(422).json({
    //     errors: [
    //       {
    //         field: "email",
    //         message: "Email already exists",
    //       },
    //     ],
    //   });
    // }
    console.log("fee");
    // Create new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
    });

    // Respond with the created user
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    // res.send(error);
    // if (
    //   error.name === "SequelizeValidationError" ||
    //   error.name === "SequelizeUniqueConstraintError"
    // ) {
    //   const errors = error.errors.map((err) => ({
    //     field: err.path,
    //     message: err.message,
    //   }));
    //   return res.status(422).json({ errors });
    // }
    return res.status(500).json({ error });
  }
});

// module.exports = router;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
// jjdjjhh
module.exports = app;
