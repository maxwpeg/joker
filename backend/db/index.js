const {DataTypes} = require("sequelize");
const sequelize = require("./db");

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    username: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    refreshToken: {type: DataTypes.STRING, allowNull: false},
    isAdmin: {type: DataTypes.BOOLEAN, allowNull: false}
})


const Joke = sequelize.define('joke', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false},
    date: {type: DataTypes.DATE, allowNull: false},
    tags: {type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false},
    userId: {type: DataTypes.INTEGER},
})

const Like = sequelize.define("like", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER},
    jokeId: {type: DataTypes.INTEGER},
})

User.hasMany(Joke);
User.hasMany(Like);
Joke.hasMany(Like);
Joke.belongsTo(User);
Like.belongsTo(User);
Like.belongsTo(Joke);

module.exports = {
    User,
    Joke,
    Like
}