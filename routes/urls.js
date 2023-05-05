const express = require("express");
const router = express.Router();
const UrlController = require("../modules/urls/url.controller");

const urlController = new UrlController();

router.get("/", urlController.getAllUrls.bind(urlController));

router.post("/", urlController.createOneUrl.bind(urlController));

router.get("/:id", urlController.getOneUrl.bind(urlController));

router.get("/shorty.com/:short_url", urlController.redirectOneUrl.bind(urlController));

router.delete("/:id", urlController.deleteOneUrl.bind(urlController));

module.exports = router;
