"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Post);
      Comment.belongsTo(models.User);
    }
  }
  Comment.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
      },
      PostId: {
        type: DataTypes.INTEGER,
      },
      commentText: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
