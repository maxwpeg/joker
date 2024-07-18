const {validationResult} = require("express-validator");
const ApiError = require("../errors");
const userService = require('../service/UserService')


class UserController {

    async register(req, res, next) {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()) return next(ApiError.badRequest(JSON.stringify(errors.mapped())));
            const {email, username, password, isAdmin} = req.body
            const {user, refreshToken, accessToken} =
                await userService.register(email, username, password, isAdmin);

            res.cookie('refreshToken', refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            })

            return res.status(201).json({
                user,
                accessToken
            })
        }
        catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()) return next(ApiError.badRequest(JSON.stringify(errors.mapped())));

            const {username, password} = req.body;

            const {user, refreshToken, accessToken} = await userService.login(username, password);

            res.cookie('refreshToken', refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json({
                user,
                accessToken
            });
        }
        catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try{
            res.clearCookie('refreshToken');
            return res.status(200).end();
        }
        catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try{
            const {refreshToken: oldRefreshToken} = req.cookies;

            const {user, refreshToken, accessToken} = await userService.refresh(oldRefreshToken);
            res.cookie('refreshToken', refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            })
            return res.json({
                user,
                accessToken
            })
        }
        catch (e) {
            res.clearCookie('refreshToken');
            res.clearCookie('deviceId');
            next(e)
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async getUsernameById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await userService.getUsernameById(id);
            if (!user) {
                return res.json({username: "Unknown"});
            }
            return res.json({username: user.username});
        } catch (e) {
            next(e);
        }

    }

    async checkAdmin(req, res, next) {
        try {
            const {localUserData} = req.body;
            const user = await userService.getUsernameById(localUserData.id);
            if (!user) {
                return res.json({isAdmin: "false"});
            }
            return res.json({isAdmin: user.isAdmin});
        } catch (e) {
            next(e);
        }

    }
}

module.exports = new UserController();