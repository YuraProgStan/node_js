import { Router } from 'express';
import {chatController} from "../controller/chatController";
import {authMiddleware} from "../middlewares";


const router = Router();
router.get('/',authMiddleware.checkAccessToken, chatController.getMessages);

export const chatRouter = router;
