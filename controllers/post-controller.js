const postService = require("../service/post-service.js");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error.js")

class PostController {
    create = async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest("Ошибка при валидации", errors.array()))
            }

            const {title, text, price1, price2, price3, imageUrl } = req.body;
            const userData = await postService.create(title, text, price1, price2, price3, imageUrl, req.user.id);

            res.json(userData);
        } catch (err) {
            next(err);
        }
    }

    remove = async (req, res, next) => {
        try {
            const { id } = req.params;
            const userData = await postService.remove(id, req.user.id);

            res.json(userData);
        } catch (err) {
            next(err);
        }
    }

    edit = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { title, text, price, imageUrl } = req.body;
            const userData = await postService.edit(id, title, text, price, imageUrl, req.user.id);

            res.json(userData);
        } catch (err) {
            next(err);
        }
    }

    getAllTitles = async (req, res, next) => {
        try {
            const userData = await postService.getAllTitles();

            res.json(userData);
        } catch (err) {
            next(err);
        }
    }

    getAllPosts = async (req, res, next) => {
        try {
            const { sort, asc, page, limit } = req.params;
            const userData = await postService.getAllPosts(sort, asc, page, limit);

            res.json(userData);
        } catch (err) {
            next(err);
        }
    }

    getPostById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const userData = await postService.getPostById(id);

            res.json(userData);
        } catch (err) {
            next(err);
        }
    }

    upload = async (req, res, next) => {
        try {
            const url = req.file.filename.split(' ').join('');
            res.json({
                url: `/uploads/${url}`,
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new PostController();