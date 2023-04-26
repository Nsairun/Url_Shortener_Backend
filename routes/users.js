const express = require('express');
const router = express.Router();
const UserController = require('../modules/user/user.controller');

const userController = new UserController();

/* GET users listing. */
router.get('/', userController.getAllUsers.bind(userController));

router.post('/', userController.createOneUser.bind(userController));

router.get('/:id', userController.getOneUser.bind(userController));

router.patch('/:id', userController.patchOneUser.bind(userController));

router.delete('/:id', userController.deleteOneUser.bind(userController));

module.exports = router;
