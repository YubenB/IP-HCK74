const { Post, User, Profile, Comment } = require("../../models");
const { Op } = require("sequelize");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

module.exports = class Auth {
  static async getAllPost(req, res, next) {
    try {
      const {
        page = 1,
        limit = 10,
        search = "",
        filter = {},
        sortBy = "createdAt",
        sortOrder = "DESC",
      } = req.query;
      console.log({ page });

      const offset = (page - 1) * limit;
      // Search filter using PascalCase associations
      const searchFilter = search
        ? {
            [Op.or]: [
              { caption: { [Op.iLike]: `%${search}%` } },
              { "$User.username$": { [Op.iLike]: `%${search}%` } }, // Correctly reference the User model
            ],
          }
        : {};

      // User filter using PascalCase foreign key
      const userFilter = filter.UserId ? { UserId: filter.UserId } : {};

      const posts = await Post.findAndCountAll({
        where: {
          ...searchFilter,
          ...userFilter,
        },
        include: {
          model: User,
          attributes: ["id", "username"], // Reference username from User model
          include: {
            model: Profile,
            attributes: ["profilePicture"],
          },
        },
        order: [[sortBy, sortOrder.toUpperCase()]],
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      });

      res.status(200).json({
        totalItems: posts.count,
        totalPages: Math.ceil(posts.count / limit),
        currentPage: parseInt(page, 10),
        posts: posts.rows,
      });
    } catch (error) {
      next(error);
      console.error(error);
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

  static async getPostDetail(req, res, next) {
    try {
      const { id } = req.params;
      const post = await Post.findByPk(id, {
        include: [
          {
            model: User,
            attributes: ["id", "username"],
            include: {
              model: Profile,
              attributes: ["profilePicture"],
            },
          },
          {
            model: Comment,
            include: [
              {
                model: User,
                attributes: ["id", "username"],
                include: [
                  {
                    model: Profile,
                    attributes: ["profilePicture"],
                  },
                ],
              },
            ],
          },
        ],
      });

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
};
