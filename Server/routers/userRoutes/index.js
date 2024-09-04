const router = require("express").Router();
const UserController = require("../../controllers/userController");
const authentication = require("../../middlewares/authentication");

router.get("/", authentication, UserController.getUser);

module.exports = router;
