import { Response, NextFunction } from 'express';
import { userService, tokenService } from '../services';
import { IRequestExtended } from '../interfaces';
import {tokenRepository} from "../reporitories/token/tokenRepository";
import {constants} from '../constants';
import {authValidator} from '../validators/auth';
import {ErrorHandler} from '../error/ErrorHandler';

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
        console.log(5);
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

    //validators
    public isLoginValid(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {error, value} = authValidator.login.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }
    public isRegistrationValid(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {error, value} = authValidator.registration.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }

}
export const authMiddleware = new AuthMiddleware();
