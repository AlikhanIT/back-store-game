const ApiError = require("../exceptions/api-error.js");
const tokenService = require("../service/token-service.js");

module.exports = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnathorizedError());
        }

        const accesssToken = authorizationHeader.split(" ")[1];
        if(!accesssToken) {
            return next(ApiError.UnathorizedError());
        }
        const userData = await tokenService.validateAccessToken(accesssToken);
        if(!userData) {
            return next(ApiError.UnathorizedError());
        }

        req.user = userData;
        next();
    } catch (err) {
        return ApiError.UnathorizedError();
    }
}