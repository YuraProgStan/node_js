"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const services_1 = require("../services");
const tokenRepository_1 = require("../reporitories/token/tokenRepository");
const constants_1 = require("../constants");
const auth_1 = require("../validators/auth");
const ErrorHandler_1 = require("../error/ErrorHandler");
class AuthMiddleware {
    async checkAccessToken(req, res, next) {
        try {
            const accessToken = req.get(constants_1.constants.AUTHORIZATION);
            if (!accessToken) {
                next(new Error('No token'));
                return;
            }
            const { userEmail } = services_1.tokenService.verifyToken(accessToken);
            const tokenPairFromDB = await tokenRepository_1.tokenRepository.findByParams({ accessToken });
            if (!tokenPairFromDB) {
                next(new ErrorHandler_1.ErrorHandler('Token not valid', 401));
                return;
            }
            const userFromToken = await services_1.userService.getUserByEmail(userEmail);
            if (!userFromToken) {
                next(new Error('Token not valid'));
                return;
            }
            req.user = userFromToken;
            next();
        }
        catch (e) {
            res.status(401).json({
                status: 401,
                message: e.message,
            });
        }
    }
    async checkRefreshToken(req, res, next) {
        console.log(5);
        try {
            const refreshToken = req.get(constants_1.constants.AUTHORIZATION);
            if (!refreshToken) {
                next(new ErrorHandler_1.ErrorHandler('No token'));
                return;
            }
            const { userEmail } = services_1.tokenService.verifyToken(refreshToken, 'refresh');
            const tokenPairFromDB = await tokenRepository_1.tokenRepository.findByParams({ refreshToken });
            if (!tokenPairFromDB) {
                next(new Error('Token not valid'));
                return;
            }
            const userFromToken = await services_1.userService.getUserByEmail(userEmail);
            if (!userFromToken) {
                next(new Error('Token not valid'));
                return;
            }
            req.user = userFromToken;
            next();
        }
        catch (e) {
            res.status(401).json({
                status: 401,
                message: e.message,
            });
        }
    }
    //validators
    isLoginValid(req, res, next) {
        try {
            const { error, value } = auth_1.authValidator.login.validate(req.body);
            if (error) {
                next(new ErrorHandler_1.ErrorHandler(error.details[0].message));
                return;
            }
            req.body = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    isRegistrationValid(req, res, next) {
        try {
            const { error, value } = auth_1.authValidator.registration.validate(req.body);
            if (error) {
                next(new ErrorHandler_1.ErrorHandler(error.details[0].message));
                return;
            }
            req.body = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authMiddleware = new AuthMiddleware();
//# sourceMappingURL=authMiddleware.js.map