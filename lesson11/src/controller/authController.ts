import {NextFunction, Request, Response} from 'express';
import {authService, emailService, tokenService, userService} from '../services';
import {COOKIE} from '../constants/cookie';
import {IRequestExtended, ITokenData} from '../interfaces';
import {IUser} from '../entity/user';
import {tokenRepository} from '../reporitories/token/tokenRepository';
import {emailActionEnum} from "../constants";

class AuthController {
    public async registration(req: Request, res: Response): Promise<Response<ITokenData>> {

        const data = await authService.registration(req.body);
        res.cookie(
            COOKIE.nameRefreshToken,
            data.refreshToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );
        const {email} = req.body;
        await emailService.sendMail(email, emailActionEnum.WELCOME_TO_PLATFORM);
        return res.json(data);
    }

    public async logout(req: IRequestExtended, res: Response): Promise<Response<string>> {
        const { id } = req.user as IUser;

        res.clearCookie(COOKIE.nameRefreshToken);

        await tokenService.deleteUserTokenPair(id);

        return res.json('Ok');
    }

    public async login(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id, email, password: hashPassword } = req.user as IUser;
            const { password } = req.body;

            await emailService.sendMail(email, emailActionEnum.WELCOME);

            await userService.compareUserPasswords(password, hashPassword);

           const tokenPair =  tokenService.generateTokenPair({userId: id, userEmail: email});
           const { refreshToken, accessToken } = tokenPair;
           await tokenRepository.createToken({refreshToken, accessToken, userId:id })
            res.json({
                refreshToken,
                accessToken,
                user: req.user
            });
        } catch (e) {
            next(e);
        }
    }

    public  async refreshToken (req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id, email } = req.user as IUser;
        const refreshTokenToDelete = req.get('Authorization');
        await tokenService.deleteTokenPairByParams({refreshToken: refreshTokenToDelete });

        const tokenPair = await tokenService.generateTokenPair({userId: id, userEmail: email});
            const { accessToken, refreshToken } = tokenPair;
            await tokenRepository.createToken({refreshToken, accessToken, userId:id })

            res.json({
                refreshToken,
                accessToken,
                user: req.user
            });

        } catch (e) {
          next(e);
        }
    }
}

export const authController = new AuthController();
