const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};

module.exports = { generateAccessToken, generateRefreshToken };
