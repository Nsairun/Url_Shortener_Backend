const express = require("express");
const router = express.Router();
const VisitorController = require("../modules/visitor/visitor.controller");

const visitorController = new VisitorController();

router.get("/", visitorController.getAllVistors.bind(visitorController));

router.post("/", visitorController.createOneVisitor.bind(visitorController));

router.get("/:id", visitorController.getOneVistor.bind(visitorController));

router.delete("/:id", visitorController.deleteOneVisitor.bind(visitorController));

module.exports = router;
