const jokeService = require("../service/JokeService")
const {validationResult} = require("express-validator")
const ApiError = require("../errors")
const likeService = require("../service/LikeService");

class JokeController {

    async createNewJoke(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest(JSON.stringify(errors.mapped())));
            }
            const {text, title, tags, localUserData} = req.body;
            const currDate = new Date();
            const joke = await jokeService.createNewJoke(text, title, currDate, tags.split(", "), localUserData.id);
            return res.json(joke);
        } catch (e) {
            next(e);
        }
    }

    async getTaggedJokes(req, res, next) {
        try {
            const {tag} = req.params;
            const jokes = await jokeService.findJokeByTag(tag);
            return res.json(jokes);
        } catch (e) {
            next(e);
        }
    }

    async getAllJokes(req, res, next) {
        try {
            const jokes = await jokeService.getAllJokes();
            return res.json(jokes);
        } catch (e) {
            next(e);
        }
    }

    async getTopJokes(req, res, next) {
        try {
            const topJokes = await jokeService.getTopJokes();
            return res.json(topJokes);
        } catch (e) {
            next(e);
        }
    }

    async deleteJoke(req, res, next) {
        try {
            const { id } = req.params;
            const { localUserData } = req.body;

            if (!localUserData || !localUserData.isAdmin) {
                return next(ApiError.forbidden('Удаление анекдота разрешено только администраторам'));
            }

            const result = await jokeService.deleteJoke(id);
            if (!result) {
                return next(ApiError.notFound('Анекдот не найден'));
            }

            return res.status(200).json({ message: 'Анекдот успешно удален' });
        } catch (e) {
            next(e);
        }
    }

    async isLiked(req, res, next) {
        try {
            const {jokeId} = req.params;
            const {localUserData} = req.body;
            const like = await likeService.findLikeByJokeAndUser(jokeId, localUserData.id);
            if (like) {
                return res.json({isLiked: "true"});
            } else {
                return res.json({isLiked: "false"});
            }
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new JokeController();