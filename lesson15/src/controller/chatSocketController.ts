import {chatService} from '../services/chatService';

export const chatSocketController = {

    messageCreate: async (io: any, chat: any, data: any, userName: string, userId: number, userImage: string) => {
        const userChat = userName;
        const {message} = data;
        const status = true;
        await chatService.createMessage({userChat, message, status, userId});
        data = {...data, userName, userImage};
        io.emit('message: get-all', {messages: data});
    },

    joinRoom: async (io: any, chat: any, data: any, userName: string, userId: number, userImage: string) => {
        chat.join(data.id)
        if (!data.message) {
            chat.broadcast.to(data.id).emit('user_join_room', {
                messages: {
                    message: `${userName} joined room ${data.id}`,
                    roomId: data.id
                }
            });
        } else {
            data = {...data, userName, userImage};
            io.to(data.id).emit('messages_room', {messages: data});
        }
    }
}