import {NextFunction, Request, Response} from 'express';
import { IChat } from '../entity/chat';
import {chatService} from '../services/chatService';

class ChatController {
    public async getMessages(req: Request, res: Response, next: NextFunction): Promise<Response<IChat>> {
        const messages = await chatService.getMessages();
        return res.json(messages );
    }

}

export const chatController = new ChatController();
