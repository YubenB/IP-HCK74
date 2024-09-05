const router = require("express").Router();
const AiController = require("../../controllers/aiController");
const authentication = require("../../middlewares/authentication");

router.get("/", authentication, AiController.getWelcomingMsg);

module.exports = router;
