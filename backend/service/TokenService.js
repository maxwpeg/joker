const {sign, verify} = require('jsonwebtoken');
const {User} = require('../db');
require('dotenv').config();

class TokenService {

    generateTokens(payload) {
        const accessToken = sign(payload, process.env.ACCESS_SECRET_KEY, {expiresIn: '10m'})
        const refreshToken = sign(payload, process.env.REFRESH_SECRET_KEY, {expiresIn: '30d'})

        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(accessToken) {
        try {
            return verify(accessToken, process.env.ACCESS_SECRET_KEY);
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(refreshToken) {
        try {
            return verify(refreshToken, process.env.REFRESH_SECRET_KEY);
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken){
        try{
            const user = await User.findOne({where: {id: userId}})
            if (user) {
                user.refreshToken = refreshToken;
                return await user.save();
            }
            throw new Error('Сохранение токена. Пользователь не найден!');
        }
        catch (e) {
            throw new Error(e);
        }
    }

    async refreshToken(userId, newRefreshToken){
        const user = await User.findOne({where: {id: userId}})
        if(!user) throw new Error('Рефреш токена. Пользователь не найден!');
        user.refreshToken = newRefreshToken;
        return await user.save()
    }

}

module.exports = new TokenService();