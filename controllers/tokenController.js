const { User, Token } = require("../models");
const jwtUtils = require("../utils/jwtUtils");

const tokenController = {
  refreshToken: async (req, res) => {
    try {
      const { refreshToken } = req.body;
      const token = await Token.findOne({ where: { token: refreshToken } });
      if (!token || token.type !== "refresh") {
        return res.status(401).json({ message: "Invalid refresh token" });
      }
      const user = await User.findByPk(token.user_id);
      const newAccessToken = jwtUtils.generateAccessToken(user);
      res.json({ accessToken: newAccessToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = tokenController;
