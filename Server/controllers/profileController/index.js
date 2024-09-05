const { Profile } = require("../../models");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

module.exports = class ProfileController {
  static async updateProfile(req, res, next) {
    try {
      let result;
      const { firstName, lastName, bio, privacy } = req.body;
      const { id: UserId } = req.user;
      const privacyBool = privacy === "Private" ? true : false;
      if (req.file) {
        console.log(req.file, "<><><>");

        const base64 = req.file.buffer.toString("base64");
        const base64String = `data:${req.file.mimetype};base64,${base64}`;
        result = await cloudinary.uploader.upload(base64String);
      }
      // Update Profile including profile picture if it exists
      await Profile.update(
        {
          firstName,
          lastName,
          bio,
          privacy: privacyBool,
          profilePicture: result?.secure_url,
        },
        {
          where: {
            UserId,
          },
        }
      );

      res.status(200).json({
        message: "Profile updated successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};
