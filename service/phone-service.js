const PhoneModel = require("../models/phone-model.js");
const UserModel = require("../models/user-model.js");
const ApiError = require("../exceptions/api-error.js");

class PhoneService {
    create = async (text, user) => {
        const userIsAdmin = await UserModel.findById(user);
        if (!userIsAdmin.isAdmin) {
            throw ApiError.BadRequest("Вы не администратор");
        }
        await PhoneModel.deleteMany({});
        const phone = await PhoneModel.create({
            text
        })
        return phone;
    }

    getAllPhone = async () => {
        const phone = await PhoneModel.findOne({ $query: {}, $orderby: { _id : -1 } })
        return phone;
    }
}

module.exports = new PhoneService();