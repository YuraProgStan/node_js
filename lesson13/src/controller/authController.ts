import {NextFunction, Request, Response} from 'express';
import {authService, emailService, tokenService, userService} from '../services';
import {COOKIE, EmailActionEnum} from '../constants/';
import {IRequestExtended, ITokenData} from '../interfaces';
import {IUser} from '../entity/user';
import {tokenRepository} from '../reporitories/token/tokenRepository';
import {actionTokenRepository} from '../reporitories/actionTokenRepository/actionTokenRepository';
import {ActionTokenTypes} from '../enums/actionTokenTypes.enum';

class AuthController {
    public async registration(req: Request, res: Response): Promise<Response<ITokenData>> {

        const data = await authService.registration(req.body);
        res.cookie(
            COOKIE.nameRefreshToken,
            data.refreshToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );
        const {email,firstName,phone} = req.body;
        await emailService.sendMail(email, EmailActionEnum.WELCOME_TO_PLATFORM,{userName: firstName, userEmail:email, userPhone:phone });
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

            // await emailService.sendMail(email, EmailActionEnum.WELCOME, {userName: 'Yura'});
            await emailService.sendMailHBS(email, EmailActionEnum.WELCOME, {userName: 'Yura'});

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
    public  async sendForgotPassword (req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id, email, firstName } = req.user as IUser;

            const token = await tokenService.generateActionToken({userId: id, userEmail: email});

            await actionTokenRepository.createActionToken({actionToken: token, type: ActionTokenTypes.forgotPassword,
                userId:id });

            await emailService.sendMailHBS(email, EmailActionEnum.FORGOT_PASSWORD,{
                token,
                userName: firstName
            });

            res.sendStatus(204);

        } catch (e) {
            next(e);
        }
    }

    public  async setPassword (req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id } = req.user as IUser;
            const actionToken= req.get('Authorization');

            await userService.updateUserFP(id, req.body)
            await actionTokenRepository.deleteByParams({actionToken});

            res.sendStatus(201);

        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
