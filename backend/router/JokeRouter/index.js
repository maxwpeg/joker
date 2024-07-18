const express = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../../middleware/authMiddleware');
const jokeController = require('../../controller/jokeController');
const likeController = require("../../controller/LikeController");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Joke:
 *       type: object
 *       required:
 *         - title
 *         - text
 *       properties:
 *         title:
 *           type: string
 *           description: Заголовок шутки
 *           example: Это пример заголовка
 *         text:
 *           type: string
 *           description: Текст шутки
 *           example: Это пример текста шутки
 */

/**
 * @swagger
 * /jokes:
 *   post:
 *     summary: Создать новую шутку
 *     tags: [Jokes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Joke'
 *     responses:
 *       201:
 *         description: Шутка успешно создана
 *       400:
 *         description: Неверный запрос
 *       401:
 *         description: Неавторизованный
 */
router.post('/create',
    authMiddleware,
    body('title').isLength({min: 1, max: 20}),
    body('text').isLength({min: 1, max: 3000}),
    jokeController.createNewJoke
);

router.get('/isliked/:jokeId', authMiddleware, jokeController.isLiked)

router.get('/top', jokeController.getTopJokes);

/**
 * @swagger
 * /jokes/{tag}:
 *   get:
 *     summary: Получить шутки по тегу
 *     tags: [Jokes]
 *     parameters:
 *       - in: path
 *         name: tag
 *         schema:
 *           type: string
 *         required: true
 *         description: Тег для фильтрации шуток
 *     responses:
 *       200:
 *         description: Список шуток с указанным тегом
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Joke'
 *       404:
 *         description: Шутки с указанным тегом не найдены
 */
router.get('/:tag', jokeController.getTaggedJokes);

router.get('/', jokeController.getAllJokes);


router.delete('/delete/:id', authMiddleware, jokeController.deleteJoke);


module.exports = router;
