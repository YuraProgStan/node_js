import { Response, NextFunction } from 'express';
import { userService, tokenService } from '../services';
import { IRequestExtended } from '../interfaces';
import { tokenRepository } from '../reporitories/token/tokenRepository';
import { actionTokenRepository } from '../reporitories/actionTokenRepository/actionTokenRepository';
import { constants } from '../constants';
import { ErrorHandler } from '../error/ErrorHandler';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const accessToken = req.get(constants.AUTHORIZATION);
            if (!accessToken) {
                next(new Error('No token'));
                return;
            }
            const { userEmail } = tokenService.verifyToken(accessToken);

            const tokenPairFromDB = await tokenRepository.findByParams({ accessToken });

            if(!tokenPairFromDB){
                next(new ErrorHandler('Token not valid', 401))
                return;
            }

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new Error('Token not valid'));
                return
            }

            req.user = userFromToken;
            next();
        } catch (e: any) {
            res.status(401).json({
                status: 401,
                message: e.message,
            });
        }
    }

    public async checkRefreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.get(constants.AUTHORIZATION);
            if (!refreshToken) {
                next(new ErrorHandler('No token'));
                return;
            }

            const { userEmail } = tokenService.verifyToken(refreshToken, 'refresh');

            const tokenPairFromDB = await tokenRepository.findByParams({ refreshToken });

            if(!tokenPairFromDB){
                next (new Error('Token not valid'));
                return;
            }

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new Error('Token not valid'));
                return;
            }

            req.user = userFromToken;
            next();
        } catch (e: any) {
            res.status(401).json({
                status: 401,
                message: e.message,
            });
        }
    }

    public async checkActionToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const actionToken = req.get(constants.AUTHORIZATION);
            if (!actionToken) {
                next(new ErrorHandler('No token'));
                return;
            }

            const { userEmail } = tokenService.verifyToken(actionToken, 'action'); //tooo

            const tokenFromDB = await actionTokenRepository.findByParams({ actionToken });

            if(!tokenFromDB){
                next (new Error('Token not valid'));
                return;
            }

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new Error('Token not valid'));
                return;
            }

            req.user = userFromToken;
            next();
        } catch (e: any) {
            res.status(401).json({
                status: 401,
                message: e.message,
            });
        }
    }
}
export const authMiddleware = new AuthMiddleware();
