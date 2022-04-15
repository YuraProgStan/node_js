import { Router } from 'express';
import { authController } from '../controller/authController';
import {authMiddleware, fileMiddleware, userMiddleware, validateMiddleware} from '../middlewares';
// import {corsMiddleware} from "../middlewares/corsMiddleware";

const router = Router();

router.post('/registration', fileMiddleware.checkUserAvatar, validateMiddleware.isRegistrationValid, authController.registration);
router.post('/login', validateMiddleware.isLoginValid, userMiddleware.checkIsUserExist, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);
router.post('/forgotPassword', validateMiddleware.checkValidEmail, userMiddleware.checkIsUserExist, authController.sendForgotPassword);
router.post('/forgotPassword/set', validateMiddleware.checkValidPassword, authMiddleware.checkActionToken, authController.setPassword);

// router.post('/refresh', authController.registration);

export const authRouter = router;
