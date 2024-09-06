const router = require("express").Router();
const CommentController = require("../../controllers/commentController");
const authentication = require("../../middlewares/authentication");

router.post("/post", authentication, CommentController.postComment);

module.exports = router;
