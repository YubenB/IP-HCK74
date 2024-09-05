const { User, Profile, Post } = require("../../models");

module.exports = class UserController {
  static async getUser(req, res, next) {
    try {
      const token = req.user;
      const { page = 1, limit = 10 } = req.query; // Retrieve pagination params from the request query

      const offset = (page - 1) * limit; // Calculate the offset

      const user = await User.findByPk(token.id, {
        attributes: ["id", "username", "email"],
        include: [
          {
            model: Profile, // Include Profile without pagination
          },
          {
            model: Post, // Include Posts with pagination
            limit: parseInt(limit, 10), // Limit the number of posts
            offset: parseInt(offset, 10), // Offset for pagination
            order: [["createdAt", "DESC"]], // Order posts by the createdAt field in descending order
          },
        ],
      });

      // If you want to count the total number of posts for the user, you can add a separate query to count them.
      const totalPosts = await Post.count({
        where: {
          UserId: token.id,
        },
      });

      res.status(200).json({
        user,
        totalPosts,
        totalPages: Math.ceil(totalPosts / limit),
        currentPage: parseInt(page, 10),
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};
