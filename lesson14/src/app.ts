// // @ts-ignore
// global.rootDir = __dirname;

import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';

import { apiRouter } from './router/apiRouter';
import {cronRun} from './cron';
import { config } from './config/config';
 import path from 'path';
import { engine } from 'express-handlebars';
import fileUpload from 'express-fileupload';



const app = express();

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

app.listen(PORT, async () => {
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
