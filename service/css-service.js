const CssModel = require("../models/css-model.js");
const UserModel = require("../models/user-model.js");
const ApiError = require("../exceptions/api-error.js");

class CssService {
    create = async (imageUrl, user) => {
        const userIsAdmin = await UserModel.findById(user);
        if (!userIsAdmin.isAdmin) {
            throw ApiError.BadRequest("Вы не администратор");
        }
        await CssModel.deleteMany({});
        const css = await CssModel.create({
            imageUrl
        })
        return css;
    }

    getAllCss = async () => {
        const css = await CssModel.findOne({ $query: {}, $orderby: { _id : -1 } })
        return css;
    }
}

module.exports = new CssService();