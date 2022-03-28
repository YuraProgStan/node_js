"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const services_1 = require("../services");
const cookie_1 = require("../constants/cookie");
class AuthController {
    async registration(req, res) {
        const data = await services_1.authService.registration(req.body);
        res.cookie(cookie_1.COOKIE.nameRefreshToken, data.refreshToken, { maxAge: cookie_1.COOKIE.maxAgeRefreshToken, httpOnly: true });
        return res.json(data);
    }
    async logout(req, res) {
        const { id } = req.user;
        res.clearCookie(cookie_1.COOKIE.nameRefreshToken);
        await services_1.tokenService.deleteUserTokenPair(id);
        return res.json('Ok');
    }
}
exports.authController = new AuthController();
//# sourceMappingURL=authController.js.map