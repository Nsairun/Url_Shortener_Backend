/**
 * @swagger
 * components:
 *   schemas:
 *     Visitor:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Visitor
 *         location:
 *           type: string
 *           description: The location
 *         ip_address:
 *           type: string
 *           description: The generated short Visitor
 *         time_clicked:
 *           type: number
 *           description: The number of time_clicked on the Visitor
 *         browser:
 *           type: string
 *           description: The name of the browser use by the visitor
 *       example:
 *         id: 1
 *         location: buea
 *         ip_address: weywqii
 *         time_clicked: 23
 *         browser: 23
 */

/**
 * @swagger
 * tags:
 *   name: Visitors
 *   description: The Visitors managing API
 * /Visitors:
 *   get:
 *     summary: Lists all the Visitors
 *     tags: [Visitors]
 *     responses:
 *       200:
 *         description: The list of the Visitors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Visitor'
 *   post:
 *     summary: Create a new Visitors
 *     tags: [Visitors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Visitor'
 *     responses:
 *       200:
 *         description: The created Visitor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Visitor'
 *       500:
 *         description: Some server error
 * /Visitors/{id}:
 *   get:
 *     summary: Get the Visitors by id
 *     tags: [Visitors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Visitor id
 *     responses:
 *       200:
 *         description: The Visitor response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Visitor'
 *       404:
 *         description: The Visitor was not found
 *   delete:
 *     summary: Remove the Visitor by id
 *     tags: [Visitors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Visitor id
 *
 *     responses:
 *       200:
 *         description: The Visitor was deleted
 *       404:
 *         description: The Visitor was not found
 */

const express = require("express");
const router = express.Router();
const VisitorController = require("../modules/visitor/visitor.controller");

const visitorController = new VisitorController();

router.get("/", visitorController.getAllVistors.bind(visitorController));

router.get("/:id", visitorController.getVisitorsByUrlId.bind(visitorController));

router.delete("/:id", visitorController.deleteOneVisitor.bind(visitorController));

module.exports = router;
