import {NextFunction, Request, Response} from 'express';
import {IChat} from '../entity/chat';
import {chatService} from '../services/chatService';
import {userImageService} from '../services/userImageService';

// import {s3Service} from "../services";

class ChatController {
    public async getMessages(req: Request, res: Response, next: NextFunction): Promise<Response<IChat>> {
        let messageForData: [] = [];
        const messagesSQL = await chatService.getMessages();
        const settledMessageSQL = messagesSQL.map(async (value) => {
            const data = await userImageService.getUserImageByUserId(value.userId);
            let url;
            // @ts-ignore
            if(!data.url){
               url = 'https://avatars.githubusercontent.com/u/16110057?v=4'
            }
            else{
                // @ts-ignore
                url = data.url;
            }
            value = {...value, urlImage: url};
            // @ts-ignore
            messageForData.push(value);
            return value
        })
        await Promise.allSettled(settledMessageSQL);
        const data = {'messages': [...messageForData]};
        return res.json(data);
    }

}

export const chatController = new ChatController();
