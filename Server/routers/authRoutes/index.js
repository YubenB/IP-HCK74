const router = require("express").Router();
const Auth = require("../../controllers/authController");

router.post("/login", Auth.login);
router.post("/register", Auth.register);

module.exports = router;
