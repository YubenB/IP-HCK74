const { User } = require("../../models");
const { signToken } = require("../../helpers/jwt");
const { comparePassword } = require("../../helpers/bcrypt");

class Auth {
  static async login(req, res, next) {
    try {
      const { emailOrUsername, password } = req.body;

      const isEmail = emailOrUsername.includes("@");

      const user = await User.findOne({
        where: isEmail
          ? { email: emailOrUsername }
          : { username: emailOrUsername },
      });

      if (!user) throw { name: "InvalidUser" };

      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) throw { name: "InvalidUser" };

      const token = signToken({
        userId: user.id,
      });

      res.status(200).json({
        message: token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { email, username, password } = req.body;

      await User.create({
        email,
        username,
        password,
      });

      res.status(200).json({
        message: `Success register user`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Auth;
