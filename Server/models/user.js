"use strict";
const { hashPassword } = require("../helpers/bcrypt");
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, { foreignKey: "UserId" });
      User.hasMany(models.Post);
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "Username cannot be empty" },
          notNull: { msg: "Username is required" },
          is: {
            args: /^[a-zA-Z0-9._-]+$/,
            msg: "Username can only contain letters, numbers, underscores, hyphens, and periods",
          },
          isNotContainsWhitespace(value) {
            if (/\s/.test(value)) {
              throw new Error("Username cannot contain whitespace");
            }
          },
        },
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "Email cannot be empty" },
          notNull: { msg: "Email is required" },
          isEmail: { msg: "Must be a valid email address" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password cannot be empty" },
          notNull: { msg: "Password is required" },
          len: {
            args: [6, 100],
            msg: "Password must be at least 6 characters long",
          },
          is: {
            args: /^(?=.*[a-zA-Z])(?=.*[0-9]).+$/,
            msg: "Password must contain at least one letter and one number",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user, option) => {
    user.password = hashPassword(user.password);
  });

  User.afterCreate(async (user, options) => {
    const { Profile } = sequelize.models;
    await Profile.create({
      UserId: user.id,
    });
  });

  return User;
};
