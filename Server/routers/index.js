const router = require("express").Router();

const auth = require("./authRoutes");
const post = require("./postRoutes");
const user = require("./userRoutes");

router.use("/", auth);
router.use("/user", user);
router.use("/posts", post);

module.exports = router;
