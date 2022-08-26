const phoneService = require("../service/phone-service.js");
const ApiError = require("../exceptions/api-error.js")

class PhoneController {
    create = async (req, res, next) => {
        try {
            const {text} = req.body;
            const phoneData = await phoneService.create(text, req.user.id);

            res.json(phoneData);
        } catch (err) {
            next(err);
        }
    }

    getAllPhone = async (req, res, next) => {
        try {
            const phoneData = await phoneService.getAllPhone();

            res.json(phoneData);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new PhoneController();