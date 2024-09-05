const { Comment } = require("../../models");

module.exports = class CommentController {
  static async postComment(req, res, next) {
    try {
      const { commentText, PostId } = req.body;
      console.log(req.body);

      const { id: UserId } = req.user;
      await Comment.create({
        commentText,
        PostId,
        UserId,
      });

      res.status(200).json({
        message: "Success comment",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};
