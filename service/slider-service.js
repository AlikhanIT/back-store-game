const SliderModel = require("../models/slider-model.js");
const UserModel = require("../models/user-model.js");
const ApiError = require("../exceptions/api-error.js");

class SliderService {
    create = async (imageUrl, user) => {
        const userIsAdmin = await UserModel.findById(user);
        if (!userIsAdmin.isAdmin) {
            throw ApiError.BadRequest("Вы не администратор");
        }

        const slider = await SliderModel.create({
            image: imageUrl
        })
        return slider;
    }

    remove = async (id, user) => {
        const userIsAdmin = await UserModel.findById(user);
        if (!userIsAdmin.isAdmin) {
            throw ApiError.BadRequest("Вы не администратор");
        }

        const slider = await SliderModel.findByIdAndDelete(id);
        return slider;
    }

    getAllSlider = async () => {
        const slider = await SliderModel.find();
        return slider;
    }
}

module.exports = new SliderService();