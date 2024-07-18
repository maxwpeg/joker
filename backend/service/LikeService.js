const {Like, Joke} = require("../db")
const ApiError = require("../errors")
const {Op} = require("sequelize");


class LikeService {

    async findLikeByJokeAndUser(jokeId, userId) {
        return await Like.findOne({
            where: {
                jokeId: jokeId,
                userId: userId
            }
        });
    }

    async findLikeById(likeId) {
        return await Like.findByPk(likeId);
    }

    async addLike(jokeId, userId){
        return await Like.create({
            jokeId, userId
        });
    }

    async deleteLike(likeId) {
        const like  = await Like.findByPk(likeId);
        if (!like) {
           return null;
        }
        await like.destroy();
        return like;
    }

}

module.exports = new LikeService();