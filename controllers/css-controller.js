const cssService = require("../service/css-service.js");
const ApiError = require("../exceptions/api-error.js")

class CssController {
    create = async (req, res, next) => {
        try {
            const {imageUrl } = req.body;
            const cssData = await cssService.create(imageUrl, req.user.id);

            res.json(cssData);
        } catch (err) {
            next(err);
        }
    }

    getAllCss = async (req, res, next) => {
        try {
            const cssData = await cssService.getAllCss();

            res.json(cssData);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new CssController();