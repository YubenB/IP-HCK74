const { Post, User, Profile } = require("../../models");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

module.exports = class Auth {
  static async getAllPost(req, res, next) {
    try {
      const posts = await Post.findAll({
        include: {
          model: User,
          attributes: ["id", "username"],
          include: {
            model: Profile,
            attributes: ["profilePicture"],
          },
        },
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json(posts);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async createPost(req, res, next) {
    try {
      let result;
      console.dir(req.body, "????");

      if (req.file) {
        console.log(req.file, "<><><>");

        const base64 = req.file.buffer.toString("base64");
        const base64String = `data:${req.file.mimetype};base64,${base64}`;
        result = await cloudinary.uploader.upload(base64String);
      }

      const { id: UserId } = req.user;
      const { caption } = req.body;
      const response = await Post.create({
        caption,
        UserId,
        imgUrl: result?.secure_url,
        // ...(imgUrl && { imgUrl }),
      });

      res.status(200).json({
        message: "Ok",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async toggleLike(req, res, next) {
    try {
      const { id } = req.params;
      const { id: userId } = req.user;

      const post = await Post.findByPk(id);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (post.likes.includes(userId)) {
        post.likes = post.likes.filter((like) => like !== userId);
        await post.save();
        return res.status(200).json({ message: "Post unliked successfully" });
      } else {
        post.likes = [...post.likes, userId];
        await post.save();
        return res.status(200).json({ message: "Post liked successfully" });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
};
