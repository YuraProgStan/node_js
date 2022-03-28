"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const services_1 = require("../services");
const cookie_1 = require("../constants/cookie");
const tokenRepository_1 = require("../reporitories/token/tokenRepository");
const constants_1 = require("../constants");
class AuthController {
    async registration(req, res) {
        const data = await services_1.authService.registration(req.body);
        res.cookie(cookie_1.COOKIE.nameRefreshToken, data.refreshToken, { maxAge: cookie_1.COOKIE.maxAgeRefreshToken, httpOnly: true });
        const { email } = req.body;
        await services_1.emailService.sendMail(email, constants_1.emailActionEnum.WELCOME_TO_PLATFORM);
        return res.json(data);
    }
    async logout(req, res) {
        const { id } = req.user;
        res.clearCookie(cookie_1.COOKIE.nameRefreshToken);
        await services_1.tokenService.deleteUserTokenPair(id);
        return res.json('Ok');
    }
    async login(req, res, next) {
        try {
            const { id, email, password: hashPassword } = req.user;
            const { password } = req.body;
            await services_1.emailService.sendMail(email, constants_1.emailActionEnum.WELCOME);
            await services_1.userService.compareUserPasswords(password, hashPassword);
            const tokenPair = services_1.tokenService.generateTokenPair({ userId: id, userEmail: email });
            const { refreshToken, accessToken } = tokenPair;
            await tokenRepository_1.tokenRepository.createToken({ refreshToken, accessToken, userId: id });
            res.json({
                refreshToken,
                accessToken,
                user: req.user
            });
        }
        catch (e) {
            next(e);
        }
    }
    async refreshToken(req, res, next) {
        try {
            const { id, email } = req.user;
            const refreshTokenToDelete = req.get('Authorization');
            await services_1.tokenService.deleteTokenPairByParams({ refreshToken: refreshTokenToDelete });
            const tokenPair = await services_1.tokenService.generateTokenPair({ userId: id, userEmail: email });
            const { accessToken, refreshToken } = tokenPair;
            await tokenRepository_1.tokenRepository.createToken({ refreshToken, accessToken, userId: id });
            res.json({
                refreshToken,
                accessToken,
                user: req.user
            });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authController = new AuthController();
//# sourceMappingURL=authController.js.map