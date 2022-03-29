// // @ts-ignore
// global.rootDir = __dirname;

import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';

import { apiRouter } from './router/apiRouter';
import { config } from './config/config';
import path from 'path';
import {engine} from "express-handlebars";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'email-templates'));
// // @ts-ignore
// app.engine('hbs', exphbs({
//     // defaultLayout: 'index',
//     extname: 'hbs',
//     layoutsDir: path.join(__dirname, 'email-templates/layouts'),
//     partialsDir: path.join(__dirname, 'email-templates'),
// }));

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

app.listen(PORT, async () => {
    console.log(`Serves has started on PORT: ${PORT}`);

    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
