const instructService = require("../service/instruct-service.js");
const ApiError = require("../exceptions/api-error.js")

class InstructController {
    create = async (req, res, next) => {
        try {
            const {title, description} = req.body;
            const instructData = await instructService.create(title, description, req.user.id);

            res.json(instructData);
        } catch (err) {
            next(err);
        }
    }

    edit = async (req, res, next) => {
        try {
            const {title, description} = req.body;
            const instructData = await instructService.edit(req.query.id, title, description, req.user.id);

            res.json(instructData);
        } catch (err) {
            next(err);
        }
    }

    getAllInstructs = async (req, res, next) => {
        try {
            const instructData = await instructService.getAllInstructs();

            res.json(instructData);
        } catch (err) {
            next(err);
        }
    }

    remove = async (req, res, next) => {
        try {
            const instructData = await instructService.remove(req.query.id, req.user.id);

            res.json(instructData);
        } catch (err) {
            next(err);
        }
    }

    getInsctructById = async (req, res, next) => {
        try {
            const instructData = await instructService.getInstructById(req.query.id);

            res.json(instructData);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new InstructController();