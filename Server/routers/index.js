const router = require("express").Router();

const auth = require("./authRoutes");
const post = require("./postRoutes");
const user = require("./userRoutes");
const comment = require("./commentRoutes");

router.use("/", auth);
router.use("/user", user);
router.use("/posts", post);
router.use("/comment", comment);

module.exports = router;
