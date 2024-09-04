const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt.js");

module.exports = async (req, res, next) => {
  try {
    let access_token = req.headers.authorization;

    if (!access_token) throw { name: "invalidToken" };

    const [bearer, token] = access_token.split(" ");
    if (!bearer) throw { name: "invalidToken1" };
    if (!token) throw { name: "invalidToken2" };

    const { userId } = verifyToken(token);

    const user = await User.findByPk(userId);
    if (!user) throw { name: "invalidToken3" };

    req.user = {
      id: user.id,
      username: user.username,
    };

    next();
  } catch (error) {
    next(error);
  }
};
