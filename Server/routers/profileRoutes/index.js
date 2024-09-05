const router = require("express").Router();
const ProfileController = require("../../controllers/profileController");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const authentication = require("../../middlewares/authentication");

router.put(
  "/edit",
  authentication,
  upload.single("profilePicture"),
  ProfileController.updateProfile
);

module.exports = router;
