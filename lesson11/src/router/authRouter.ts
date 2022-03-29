import { Router } from 'express';
import { authController } from '../controller/authController';
import {authMiddleware, userMiddleware, validateMiddleware} from '../middlewares';

const router = Router();

router.post('/registration', validateMiddleware.isRegistrationValid, authController.registration);
router.post('/login', validateMiddleware.isLoginValid, userMiddleware.checkIsUserExist, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);

// router.post('/refresh', authController.registration);

export const authRouter = router;
