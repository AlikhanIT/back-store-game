const userService = require("../service/user-service.js");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error.js")

class UserController {
    registration = async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest("Ошибка при валидации", errors.array()))
            }
            const {email, password} = req.body;
            const userData = await userService.registration(email, password);

            //flag secure true dont forget
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 14 * 24 * 60 * 60 * 1000, httpOnly: true});
            res.json(userData);
        } catch (err) {
            next(err);
        }
    }

    login = async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest("Ошибка при валидации", errors.array()))
            }
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 14 * 24 * 60 * 60 * 1000, httpOnly: true});
            res.json(userData);
        } catch (err) {
            next(err);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie("refreshToken");
            return res.json(token);
        } catch (err) {
            next(err);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);

            return res.redirect(process.env.CLIENT_URL);
        } catch (err) {
            next(err);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            console.log(req.cookies)
            const userData = await userService.refresh(refreshToken);
            console.log(userData)
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 14 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json(userData);
        } catch (err) {
            next(err);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UserController();