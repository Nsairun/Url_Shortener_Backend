const express = require("express");
const { authMiddleware } = require("../modules/auth/auth.service");
const UtilController = require("../modules/utils/utils.controller");
const router = express.Router();

const utilController = new UtilController();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Url Shortener" });
});

router.get("/current-user", authMiddleware, utilController.getCurrentUser.bind(utilController));

router.post("/login", utilController.login.bind(utilController));

module.exports = router;
