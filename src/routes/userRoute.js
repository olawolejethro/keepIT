/** @format */

const express = require("express");
// const { registerUser, loginUser } = require("../controllers/authController");
// const auth = require("../middleware/auth");
const { getUserById } = require("../controllers/userController");

const router = express.Router();

router.get("/:id", getUserById);

// router.post("/register", registerUser);
// router.post("/login", loginUser);

module.exports = router;
