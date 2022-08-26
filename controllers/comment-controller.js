const commentService = require("../service/comment-service.js");
const ApiError = require("../exceptions/api-error.js");

class CommentController {
    create = async (req, res, next) => {
        try {
            const {text} = req.body;
            const commentData = await commentService.create(text, req.user.id);

            res.json(commentData);
        } catch (err) {
            next(err);
        }
    }

    remove = async (req, res, next) => {
        try {
            const { id } = req.query;
            const commentData = await commentService.remove(id, req.user.id);

            res.json(commentData);
        } catch (err) {
            next(err);
        }
    }

    edit = async (req, res, next) => {
        try {
            const { id } = req.query;
            const { text } = req.body;
            const commentData = await commentService.edit(text, id, req.user.id);

            res.json(commentData);
        } catch (err) {
            next(err);
        }
    }

    getAllComments = async (req, res, next) => {
        try {
            const commentData = await commentService.getAllComments();

            res.json(commentData);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new CommentController();