/** @format */
const bcrypt = require("bcrypt");

/**
 * Hashes a password.
 * @param {string} password - The password to hash.
 * @returns {Promise<string>} - The hashed password.
 */
const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

/**
 * Compares a password with a hashed password.
 * @param {string} password - The plain password.
 * @param {string} hashedPassword - The hashed password.
 * @returns {Promise<boolean>} - True if the passwords match, false otherwise.
 */
const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

// Export the functions
module.exports = {
  hashPassword,
  comparePassword,
};
