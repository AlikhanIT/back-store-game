const HelpModel = require("../models/help-model.js");
const UserModel = require("../models/user-model.js");
const ApiError = require("../exceptions/api-error.js");

class HelpService {
    create = async (title, description, user) => {
        const userIsAdmin = await UserModel.findById(user);
        if (!userIsAdmin.isAdmin) {
            throw ApiError.BadRequest("Вы не администратор");
        }

        const helpPost = await HelpModel.create({
            title,
            description
        })
        return helpPost;
    }

    remove = async (id, user) => {
        const userIsAdmin = await UserModel.findById(user);
        if (!userIsAdmin.isAdmin) {
            throw ApiError.BadRequest("Вы не администратор");
        }

        const helpPost = await HelpModel.findByIdAndDelete(id);
        return helpPost;
    }

    edit = async (id, title, description, user) => {
        const userIsAdmin = await UserModel.findById(user);
        if (!userIsAdmin.isAdmin) {
            throw ApiError.BadRequest("Вы не администратор");
        }

        const helpPost = await HelpModel.findByIdAndUpdate({
            _id: id,
        }, {
            title,
            description
        }, {
            returnDocument: "after"
        });

        return helpPost;
    }

    getAllHelps = async () => {
        const helpPost = await HelpModel.find();
        return helpPost;
    }

    getHelpById = async (id) => {
        const helpPost = await HelpModel.findById(id);
        return helpPost;
    }
}

module.exports = new HelpService();