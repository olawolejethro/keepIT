/** @format */

const express = require("express");
// const Route = require("./router");
const { User, Organization, UserOrganisations } = require("../models/");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const helmet = require("helmet");
const router = express.Router();
const { generateToken, verifyToken } = require("../src/utils/jwt");

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
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(422).json({
        errors: [
          {
            field: "email",
            message: "Email already exists",
          },
        ],
      });
    }
    const userId = uuidv4();
    // Create new user
    const newUser = await User.create({
      userId,
      firstName,
      lastName,
      email,
      password,
      phone,
    });

    const orgId = uuidv4();
    const orgName = `${firstName}'s Organisation`;

    const newOrganisation = await Organization.create({
      orgId,
      name: orgName,
      description: `${firstName} ${lastName}'s personal organisation`,
    });
    await UserOrganisations.create({
      userId: newUser.userId,
      orgId: newOrganisation.orgId,
    });

    const payload = {
      id: newUser.id,
      email: newUser.email,
    };

    const token = generateToken(payload);

    // Respond with the created user

    res.status(201).json({
      status: "success",
      message: "Registration successful",
      data: {
        accessToken: token,
        user: {
          userId: newUser.userId,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          phone: newUser.phone,
        },
      },
    });

    // return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    // res.send(error);

    //  res.status(500).json({
    //    status: "Bad request",
    //    message: "Registration unsuccessful",
    //    statusCode: 400,
    //  });

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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ where: { email } });

    console.log(user);

    if (!user._previousDataValues) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // console.log(password, typeof user._previousDataValues.password, "pass");
    // const isMatch = await bcrypt.compare(
    //   password,
    //   user._previousDataValues.password
    // );

    // console.log(isMatch, "isMatch");

    // if (!isMatch) {
    //   return res.status(401).json({ message: "Invalid email or password" });
    // }

    const payload = {
      id: user.id,
      email: user.email,
      // firstName: user.firstName,
    };
    const token = generateToken(payload);

    res.json({ token, message: "login successful" }, 200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// module.exports = router;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
// jjdjjhh
module.exports = app;
