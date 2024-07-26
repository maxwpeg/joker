const {Joke, Like} = require('../db')
const {Op, Sequelize} = require("sequelize");


class JokeService {
    async createNewJoke(text, title, date, tags, userId) {
        return await Joke.create({
            text, title, date, tags, userId,
        });
    }

    async findJokeByTag(tag) {

        return await Joke.findAll({
            where: {
                tags: {
                    [Op.contains]: [tag]
                }}
        })
    }

    async getAllJokes() {
        return await Joke.findAll();
    }

    async deleteJoke(id) {
        const joke = await Joke.findByPk(id);
        if (!joke) {
            return null;
        }

        await joke.destroy();
        return joke;
    }

    async findJokeById(jokeId) {
        return await Joke.findByPk(jokeId);
    }

    async getTopJokes() {
        return await Joke.findAll({
            attributes: {
                include: [
                    [
                        Sequelize.fn('COUNT', Sequelize.col('likes.id')), 'likeCount'
                    ]
                ]
            },
            include: [
                {
                    model: Like,
                    attributes: [],
                    required: false
                }
            ],
            group: ['joke.id'],
            order: [
                [Sequelize.literal('likeCount'), 'DESC']
            ],
            limit: 10,
            subQuery: false
        });
    }

}

module.exports = new JokeService();