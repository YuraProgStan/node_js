import {chatRepository} from '../reporitories/chat/chatRepository';
import {IChat} from "../entity/chat";

class ChatService {
    public async getMessages(): Promise<IChat[]> {
        return chatRepository.getMessages();
    }
    public async createMessage(message:IChat): Promise<IChat> {
        return chatRepository.createMessage(message);
    }
}

export const chatService = new ChatService();
