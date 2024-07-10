/** @format */
const { User, Organisation, UserOrganisations } = require("../../models");
const { generateToken } = require("../utils/jwt"); // Assuming you have a JWT utility
const { v4: uuidv4 } = require("uuid");
const { hashPassword, comparePassword } = require("../utils/auth");

exports.registerUser = async function (req, res, next) {
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

    const hashedPassword = await hashPassword(password);
    const userId = uuidv4();

    // Create new user
    const newUser = await User.create({
      userId,
      firstName,
      lastName,
      password: hashedPassword,
      email,
      phone,
    });

    const orgId = uuidv4();
    const orgName = `${firstName}'s Organisation`;

    const newOrganisation = await Organisation.create({
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

exports.loginUser = async function (req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = generateToken(payload);

    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        accessToken: token,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
