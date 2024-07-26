const express = require('express');
const { body } = require('express-validator')
const authMiddleware = require("../../middleware/authMiddleware")
const userController = require('../../controller/UserController')
const router = express.Router();

router.post('/register',
    body('email').isEmail(),
    body('password').isLength({min: 8, max: 32}),
    body('username').isLength({min: 1, max: 20}),
    body('isAdmin'),
    userController.register
);

router.post('/login',
    body('username'),
    body('password').isLength({min: 5, max: 32}),
    userController.login
);

router.get('/', userController.getAllUsers);

router.get('/logout', userController.logout);
router.get('/refreshToken', userController.refresh);

router.get('/checkAdmin', authMiddleware, userController.checkAdmin);

router.get('/:id', userController.getUsernameById);

module.exports = router;