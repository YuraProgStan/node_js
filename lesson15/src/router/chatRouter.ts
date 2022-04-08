import { Router } from 'express';
import {chatController} from "../controller/chatController";


const router = Router();
router.get('/', chatController.getMessages);

export const chatRouter = router;
