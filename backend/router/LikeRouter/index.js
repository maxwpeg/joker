const express = require('express');
const { body } = require('express-validator')
const authMiddleware = require('../../middleware/authMiddleware');
const likeController = require('../../controller/LikeController')
const router = express.Router();

router.post("/add/:jokeId", authMiddleware, likeController.addLike)

module.exports = router