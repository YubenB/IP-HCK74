const router = require("express").Router();

const auth = require("./authRoutes");
const post = require("./postRoutes");
const user = require("./userRoutes");
const comment = require("./commentRoutes");
const profile = require("./profileRoutes");
const ai = require("./aiRoutes");

router.use("/", auth);
router.use("/user", user);
router.use("/posts", post);
router.use("/comment", comment);
router.use("/profile", profile);
router.use("/ai", ai);

module.exports = router;
