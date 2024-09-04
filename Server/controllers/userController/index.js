const { User, Profile } = require("../../models");

module.exports = class UserController {
  static async getUser(req, res, next) {
    try {
      const token = req.user;
      const user = await User.findByPk(token.id, {
        attributes: ["id", "username", "email"],
        include: {
          model: Profile,
        },
      });

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};
