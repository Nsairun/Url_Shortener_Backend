var express = require('express');
var router = express.Router();
const UserController = require('../modules/user/user.controller');

const userController = new UserController();
console.log('this is usercontroller', UserController)

/* GET users listing. */
router.get('/', userController.getAllUsers);

module.exports = router;
