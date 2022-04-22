import nodemailer, {SentMessageInfo} from 'nodemailer';
import {config} from  '../config/config'
import {constants, EmailActionEnum, emailInfo} from '../constants/';
import EmailTemplate from  'email-templates';
import path from 'path';
const hbs = require('nodemailer-express-handlebars');

class EmailService {
    templateRenderer = new EmailTemplate({
        views:{
            root: path.join(path.join(__dirname, '../','email-templates')),
            // options: {extension: 'hbs'}
        }
    });
    async sendMail(userMail: string, action: EmailActionEnum, context:{} = {}): Promise<SentMessageInfo> {
        const {subject, template} = emailInfo[action];
        Object.assign(context, {frontendUrl: constants.FRONT_END_URL});
       const html = await this.templateRenderer.render(template, context);
        const emailTransporter = nodemailer.createTransport( {
        from: 'No Reply Sep 2021',
        service: 'gmail',
        auth: {
            user: config.NO_REPLY_EMAIL,
            pass: config.NO_REPLY_EMAIL_PASSWORD,

        }
    });

        return emailTransporter.sendMail({
            to: userMail,
            subject,
            html
        })
    }
    async sendMailHBS(userMail: string, action: EmailActionEnum,context:{} = {}): Promise<SentMessageInfo>{
        Object.assign(context, {frontendUrl: constants.FRONT_END_URL});
        const emailTransporter = nodemailer.createTransport({
            from: 'No Reply Sep 2021',
            service: 'gmail',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_EMAIL_PASSWORD,

            }
        })
        const handlebarOptions = {
            viewEngine: {
                extname: '.hbs',
                defaultLayout: 'main',
                layoutsDir: path.resolve(__dirname,  '../', 'email-templates-hbs','layouts'),
                partialsDir: path.resolve(__dirname, '../', 'email-templates-hbs','partials')
            },
            viewPath: path.resolve(__dirname, '../', 'email-templates-hbs'),
            extName: '.hbs',
        };
        emailTransporter.use('compile', hbs(handlebarOptions));
        const {subject, template} = emailInfo[action];
        // @ts-ignore
        return emailTransporter.sendMail({ to: userMail, subject, template, context });
    }
}

export const emailService = new EmailService()