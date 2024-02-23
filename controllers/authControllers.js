const { User, Role } = require("../models");
const jwtUtils = require("../utils/jwtUtils");
const bcrypt = require("bcrypt");

const authController = {
  register: async (req, res) => {
    try {
      const { username, password, role } = req.body;
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      let newRole = await Role.findOne({ where: { name: role } });
      if (!newRole) {
        // Create the role if it doesn't exist
        newRole = await Role.create({ name: role });
      }
      console.log("Password:", password);
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        password: hashedPassword,
        role_id: newRole.id,
      });
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }
      const accessToken = jwtUtils.generateAccessToken(user);
      const refreshToken = jwtUtils.generateRefreshToken(user);
      res.json({ accessToken, refreshToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = authController;
