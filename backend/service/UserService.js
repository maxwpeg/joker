const { User } = require('../db')
const bcrypt = require('bcrypt')
const User_dto = require('../dto/UserDto')
const tokenService = require('../service/TokenService')
const ApiError = require('../errors')



class UserService {

    async register(email, username, password, isAdmin){
        try{
            if(await User.findOne({where: { username }})) throw new Error('Пользователь уже зарегистрирован');
            if(await User.findOne({where: { email }})) throw new Error('Пользователь уже зарегистрирован');
            const hashPassword = await bcrypt.hash(password, 5)
            const user=
                await User.create({email: email, username: username, password: hashPassword, isAdmin: isAdmin,
                    refreshToken: 'null'});

            const userDTO = new User_dto(user);
            const tokens = tokenService.generateTokens({...userDTO});

            await tokenService.saveToken(userDTO.id, tokens.refreshToken);
            return {
                ...tokens,
                user: userDTO,
            };
        }
        catch (e) {
            throw new Error(e);
        }
    }

    async login(username, password) {
        try {

            const user = await User.findOne({where: {username}});

            if (!user) {
                throw ApiError.badRequest('Пользователь с таким username не зарегистрирован.');
            }

            const isEqual = await bcrypt.compare(password, user.password);

            if (!isEqual) {
                throw ApiError.badRequest('Неверный пароль');
            }

            const userDTO = new User_dto(user);
            const tokens = tokenService.generateTokens({...userDTO});

            await tokenService.saveToken(userDTO.id, tokens.refreshToken);
            return {
                ...tokens,
                user: userDTO
            };
        }
        catch (e) {
            throw new Error(e);
        }
    }

    async refresh(refreshToken) {
        const localUserData = tokenService.validateRefreshToken(refreshToken);
        if (!localUserData) {
            throw ApiError.unauthorized();
        }

        const tokens = tokenService.generateTokens({
            email: localUserData.email,
            name: localUserData.name,
            surname: localUserData.surname,
            id: localUserData.id,
        });
        await tokenService.refreshToken(localUserData.id, tokens.refreshToken);
        const userDTO = new User_dto(localUserData);
        return{
            ...tokens,
            user: userDTO
        }
    }

    async getAllUsers() {
        return await User.findAll();
    }

    async getUsernameById(userId) {
        return await User.findByPk(userId);
    }
}

module.exports = new UserService();