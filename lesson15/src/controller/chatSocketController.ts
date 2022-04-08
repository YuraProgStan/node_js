import {chatService} from "../services/chatService";

export const chatSocketController = {
    messageCreate: async (io:any,chat:any, data:any, userName: string) => {
    console.log('****************');
        console.log(userName);
    console.log(data);
    const userChat = userName;
    const { message } = data;
    const status = true;
    console.log('****************');
    await chatService.createMessage({userChat, message, status});
    data = {...data,userName};
    //ONE TO ONE
    // socket.emit('message: get-all', {messages: [{text: data.message}]});

    //SEND TO ALL ONLINE USERS
    // io.emit('message: get-all', {messages: [{text: data.message}]});
    io.emit('message: get-all', {messages: data});

    //SEND TO ALL ONLINE USERS AVOID SENDER
    // socket.broadcast.emit('message: get-all', {messages: [{text: data.message}]});
    }
}