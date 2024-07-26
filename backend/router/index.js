const express = require('express');
const jokeRouter = require('./JokeRouter')
const userRouter = require('./UserRouter')
const likeRouter = require("./LikeRouter")

const router = express.Router();

router.use('/users', userRouter);
router.use('/jokes', jokeRouter);
router.use('/likes', likeRouter)

module.exports = router;