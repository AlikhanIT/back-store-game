const helpService = require("../service/help-service.js");
const ApiError = require("../exceptions/api-error.js")

class HelpController {
    create = async (req, res, next) => {
        try {
            const {title, description} = req.body;
            console.log(title, description)
            const helpData = await helpService.create(title, description, req.user.id);

            res.json(helpData);
        } catch (err) {
            next(err);
        }
    }
    edit = async (req, res, next) => {
        try {
            const {title, description} = req.body;
            const helpData = await helpService.edit(req.query.id, title, description, req.user.id);

            res.json(helpData);
        } catch (err) {
            next(err);
        }
    }

    getAllHelps = async (req, res, next) => {
        try {
            const helpData = await helpService.getAllHelps();

            res.json(helpData);
        } catch (err) {
            next(err);
        }
    }

    remove = async (req, res, next) => {
        try {
            const helpData = await helpService.remove(req.query.id, req.user.id);

            res.json(helpData);
        } catch (err) {
            next(err);
        }
    }

    getHelpById = async (req, res, next) => {
        try {
            const helpData = await helpService.getHelpById(req.query.id);

            res.json(helpData);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new HelpController();