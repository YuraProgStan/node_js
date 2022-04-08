// // @ts-ignore
// global.rootDir = __dirname;

import 'reflect-metadata';
import http from 'http';
import express from 'express';
import { createConnection } from 'typeorm';
import SocketIO from 'socket.io';

import { apiRouter } from './router/apiRouter';
import {cronRun} from './cron';
import { config } from './config/config';
 import path from 'path';
import { engine } from 'express-handlebars';
import fileUpload from 'express-fileupload';
// import {socketController} from "./controller/socketController";
import {chatSocketController} from "./controller/chatSocketController";
import cors from 'cors';

const app = express();
const server = http.createServer(app);

// @ts-ignore
const io = SocketIO(server, {cors:{origin: '*'}});

// io.on('connection', (socket: any)=> {
//     console.log('_____________');
//     console.log(socket.handshake.query.userId);
//     console.log(socket.handshake.query.accessToken);
//     console.log('_____________');
//
//     socket.on('message:create', (data: any)=> socketController.messageCreate(io,socket,data));
//     socket.on('join_room',(data: any) => {
//        socket.join(data.id);
//
//         //ONE TO MANY AVOID SENDER
//         // socket.broadcast.to(data.id).emit('user_join_room', {message: `User ${socket.id} joined room ${data.id}`});
//
//         //EMIT TO ALL USERS IN ROOM (INCLUDE SENDER)
//         io.to(data.id).emit('user_join_room', {message: `User ${socket.id} joined room ${data.id}`});
//     });
// })

//1-1
//socket.emit()

//all include sender
//io.emit

//to all avoid sender
//socket.broadcast.emit

//to room avoid sender
//socket.broadcast.to(room_id).emit()

//to all users in room include sender
//io.to(room_id).emit()
io.on('connection', (chat: any)=> {

    chat.on('message:create', (data: any)=> {
        let userName = chat.handshake.query.userName;
        const accessToken = chat.handshake.query.accessToken;
        userName = userName+'-'+accessToken.slice(-3, -1);
        chatSocketController.messageCreate(io,chat,data,userName)
    });
})
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.set('view engine', '.hbs');
// app.engine('.hbs', engine({defaultLayout: false}));
// app.set('views', path.join(__dirname, 'email-templates-hbs'));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'email-templates-hbs'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'email-templates-hbs','layouts'),
    partialsDir: path.join(__dirname, 'email-templates-hbs','partials'),
    extname: '.hbs'
}));

app.get('/about-us', (req, res) => {
    res.render('about-us');
});


app.use(apiRouter);
// @ts-ignore
app.use('*', (err, req, res, next) => {

    res
        .status(err.status || 500)
        .json({
            message: err.message,
            data: err.data
        })
})
const { PORT } = config;

server.listen(PORT, async () => {
    console.log(`Serves has started on PORT: ${PORT}`);

    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
            cronRun()
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
