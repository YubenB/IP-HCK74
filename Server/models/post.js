"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User);
    }
  }
  Post.init(
    {
      caption: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Caption is required",
          },
          notEmpty: {
            msg: "Caption cannot be empty",
          },
        },
      },
      imgUrl: DataTypes.STRING,
      likes: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
      },
      totalLikes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "UserId is required",
          },
          notEmpty: {
            msg: "UserId cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );

  Post.beforeSave((post) => {
    console.log("masuk save");

    post.totalLikes = post.likes.length;
  });
  return Post;
};
