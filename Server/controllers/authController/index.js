const { User, Profile } = require("../../models");
const { signToken } = require("../../helpers/jwt");
const { comparePassword } = require("../../helpers/bcrypt");
const { OAuth2Client } = require("google-auth-library");
const profile = require("../../models/profile");
const client = new OAuth2Client();

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

      res.status(200).json(token);
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

  static async googleLogin(req, res, next) {
    try {
      const { googleToken } = req.body;

      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOLE_CLLIENT_ID,
      });

      const { email, given_name, family_name } = ticket.getPayload();
      const cleanGivenName = given_name.replace(/\s+/g, "");
      const cleanFamilyName = family_name
        ? family_name.replace(/\s+/g, "")
        : "Y-user";
      const formattedString = `${cleanGivenName}_${cleanFamilyName}${
        Math.floor(Math.random() * 9000) + 1000
      }`;

      const user = await User.findOne({
        where: { email },
      });
      let token = "";
      if (!user) {
        let newUser = await User.create(
          {
            username: formattedString,
            email: email,
            password: "google123",
          },
          {
            hooks: false,
          }
        );

        token = signToken({
          userId: newUser.id,
        });

        await Profile.create({
          UserId: newUser.id,
          private: false,
        });

        return res.status(200).json(token);
      }

      token = signToken({
        userId: user.id,
      });

      res.status(200).json(token);
    } catch (error) {
      console.log(error, "error coy<><>");
      next(error);
    }
  }
}

module.exports = Auth;
