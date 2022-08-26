const sliderService = require("../service/slider-service.js");
const ApiError = require("../exceptions/api-error.js")

class SliderController {
    create = async (req, res, next) => {
        try {
            const {imageUrl } = req.body;
            const sliderData = await sliderService.create(imageUrl, req.user.id);

            res.json(sliderData);
        } catch (err) {
            next(err);
        }
    }

    remove = async (req, res, next) => {
        try {
            const {id} = req.query;
            const sliderData = await sliderService.remove(id, req.user.id);

            res.json(sliderData);
        } catch (err) {
            next(err);
        }
    }

    getAllSlider = async (req, res, next) => {
        try {
            const cssData = await sliderService.getAllSlider();

            res.json(cssData);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new SliderController();