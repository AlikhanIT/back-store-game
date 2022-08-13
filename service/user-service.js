const UserModel = require("../models/user-model.js");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service.js");
const UserDto = require("../dtos/user-dto.js");
const ApiError = require("../exceptions/api-error.js");

class UserService {
    registration = async (email, password) => {
        const condidate = await UserModel.findOne({email});
        if (condidate) {
            throw ApiError.BadRequest(`Пользователь с такой почтой уже существует`);
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        const user = await UserModel.create({
            email,
            password: hashPassword,
            activationLink
        })
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user);

        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            isAdmin: user.isAdmin,
            user: UserDto
        };
    }

    activate = async (activationLink) => {
        const user = await UserModel.findOne({activationLink});
        if (!user) {
            throw ApiError.BadRequest('Неккоректная ссылка активации');
        }
        user.isActivated = true;
        await user.save();
    }

    login = async (email, password) => {
        const user = await UserModel.findOne({email});
        if (!user) {
            throw ApiError.BadRequest(`'Пользователь не зарегестрирован'`);
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }

        const userDto = new UserDto(user);

        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            isAdmin: user.isAdmin,
            user: UserDto
        };
    }

    logout = async (refreshToken) => {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    refresh = async (refreshToken) => {

        if (!refreshToken) {
            throw ApiError.UnathorizedError();
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if(!userData || !tokenFromDb) {
            throw ApiError.UnathorizedError();
        }

        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);

        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            isAdmin: user.isAdmin,
            user: UserDto
        };
    }

    getAllUsers = async (refreshToken) => {
        const users = await UserModel.find();
        return users;
    }
}

module.exports = new UserService();