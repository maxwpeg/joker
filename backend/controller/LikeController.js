const {validationResult} = require("express-validator");
const ApiError = require("../errors");
const likeService = require('../service/LikeService')


class likeController {
    async addLike(req, res, next) {
        try {
            const {jokeId} = req.params;
            const { localUserData } = req.body;

            if (!localUserData) {
                return next(ApiError.unauthorized('Необходимо авторизироваться, чтобы ставить лайки.'));
            }

            const like = await likeService.findLikeByJokeAndUser(jokeId, localUserData.id);
            if (!like) {
                await likeService.addLike(jokeId, localUserData.id);
                return res.status(201).json({ message: 'Лайк успешно поставлен' });
            } else {
                await likeService.deleteLike(like.id);
                return res.status(201).json({ message: 'Лайк успешно убран' });
            }

        } catch (e) {
            next(e);
        }
    }
}

module.exports = new likeController()