const router = require("express").Router();
const Auth = require("../../controllers/authController");

router.post("/login", Auth.login);
router.post("/register", Auth.register);
router.post("/login/google", Auth.googleLogin);

module.exports = router;
