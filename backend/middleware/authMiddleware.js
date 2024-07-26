const {ApiError} = require("../errors");
const tokenService = require("../service/TokenService");
const User_dto = require('../dto/UserDto')

function authMiddleware(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        const {refreshToken} = req.cookies;
        if(!authorizationHeader) return next(ApiError.unauthorized());

        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken) return next(ApiError.unauthorized());

        const userData = tokenService.validateAccessToken(accessToken)
        if(!userData) return next(ApiError.unauthorized());

        req.body.localUserData = new User_dto(userData);
        next();
    }
    catch (e) {
        return next(ApiError.unauthorized());
    }
}

module.exports = authMiddleware;