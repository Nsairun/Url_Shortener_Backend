const express = require("express");
const UtilController = require("../modules/utils/utils.controller");
const router = express.Router();

const utilController = new UtilController();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Url Shortener" });
});

router.get("/current-user", utilController.getCurrentUser.bind(utilController));

router.post("/login", utilController.login.bind(utilController));

module.exports = router;
