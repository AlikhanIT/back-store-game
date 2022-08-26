const CommentModel = require("../models/comment-model.js");
const UserModel = require("../models/user-model.js");
const ApiError = require("../exceptions/api-error.js");

class CommentService {
    create = async (text, id) => {
        const comment = await CommentModel.create({
            text,
            user: id
        })
        return comment.populate("user", {name: true, imageUrl: true});
    }

    remove = async (id, userId) => {
        const comment = await CommentModel.findOne({_id: id});
        if (!comment) {
            throw ApiError.BadRequest("Такого поста не существует");
        }

        const userIsAdmin = await UserModel.findById(userId);
        if (userIsAdmin.isAdmin || (userId !== String(comment.user).split('"')[0])) {
            comment.deleteOne();
            return comment;
        }
    }

    edit = async (text, id, userId) => {
        const comment = await CommentModel.findOne({_id: id}).populate("user", {name: true, imageUrl: true});
        if (!comment) {
            throw ApiError.BadRequest("Такого поста не существует");
        }

        const userIsAdmin = await UserModel.findById(userId);
        if (userIsAdmin.isAdmin || (id !== String(comment.user).split('"')[0])) {
            comment.text = text;
            comment.isEdited = true;
            return comment.save();
        }
    }

    getAllComments = async () => {
        const comment = await CommentModel.find().populate("user", {name: true, imageUrl: true, _id: true});

        return comment;
    }
}

module.exports = new CommentService();