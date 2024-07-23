/** @format */

const express = require("express");
const {
  getUserById,
  getAllOrganisation,
} = require("../controllers/userController");

const router = express.Router();

router.get("/:id", getUserById);
router.get("/organisations", getAllOrganisation);

module.exports = router;
