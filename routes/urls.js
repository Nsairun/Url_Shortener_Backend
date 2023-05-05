/**
 * @swagger
 * components:
 *   schemas:
 *     Url:
 *       type: object
 *       required:
 *         - long_url
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Url
 *         long_url:
 *           type: string
 *           description: The long_url
 *         short_url:
 *           type: string
 *           description: The generated short Url
 *         clicks:
 *           type: number
 *           description: The number of clicks on the short url
 *       example:
 *         id: 1
 *         long_url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
 *         short_url: http://localhost:3000/urls/shorty.com/BZyc8VsQS
 *         clicks: 23
 */

/**
 * @swagger
 * tags:
 *   name: Urls
 *   description: The Urls managing API
 * /Urls:
 *   get:
 *     summary: Lists all the Urls
 *     tags: [Urls]
 *     responses:
 *       200:
 *         description: The list of the Urls
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Url'
 *   post:
 *     summary: Create a new Urls
 *     tags: [Urls]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Url'
 *     responses:
 *       200:
 *         description: The created Url.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Url'
 *       500:
 *         description: Some server error
 * /Urls/{id}:
 *   get:
 *     summary: Get the Urls by id
 *     tags: [Urls]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Url id
 *     responses:
 *       200:
 *         description: The Url response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Url'
 *       404:
 *         description: The Url was not found
 *   delete:
 *     summary: Remove the Url by id
 *     tags: [Urls]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Url id
 *
 *     responses:
 *       200:
 *         description: The Url was deleted
 *       404:
 *         description: The Url was not found
 */

const express = require("express");
const router = express.Router();
const UrlController = require("../modules/urls/url.controller");

const urlController = new UrlController();

router.get("/", urlController.getAllUrls.bind(urlController));

router.post("/", urlController.createOneUrl.bind(urlController));

router.get("/:id", urlController.getOneUrl.bind(urlController));

router.delete("/:id", urlController.deleteOneUrl.bind(urlController));

module.exports = router;
