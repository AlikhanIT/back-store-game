const InstructModel = require("../models/instruct-model.js");
const UserModel = require("../models/user-model.js");
const ApiError = require("../exceptions/api-error.js");

class InstructService {
    create = async (title, description, user) => {
        const userIsAdmin = await UserModel.findById(user);
        if (!userIsAdmin.isAdmin) {
            throw ApiError.BadRequest("Вы не администратор");
        }

        const instructPost = await InstructModel.create({
            title,
            description
        })
        return instructPost;
    }

    remove = async (id, user) => {
        const userIsAdmin = await UserModel.findById(user);
        if (!userIsAdmin.isAdmin) {
            throw ApiError.BadRequest("Вы не администратор");
        }

        const instructPost = await InstructModel.findByIdAndDelete(id);
        return instructPost;
    }

    edit = async (id, title, description, user) => {
        const userIsAdmin = await UserModel.findById(user);
        if (!userIsAdmin.isAdmin) {
            throw ApiError.BadRequest("Вы не администратор");
        }

        const instructPost = await InstructModel.findByIdAndUpdate({
            _id: id,
        }, {
            title,
            description
        }, {
            returnDocument: "after"
        });

        return instructPost;
    }

    getAllInstructs = async () => {
        const instructPost = await InstructModel.find();
        return instructPost;
    }

    getInstructById = async (id) => {
        const instructPost = await InstructModel.findById(id);
        return instructPost;
    }
}

module.exports = new InstructService();