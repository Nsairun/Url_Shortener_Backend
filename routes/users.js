var express = require('express');
const { default: UserController } = require('../modules/user/user.controller');
var router = express.Router();
const userController = new UserController();

/* GET users listing. */
router.get('/', userController.getAllUsers(req, res));

module.exports = router;
