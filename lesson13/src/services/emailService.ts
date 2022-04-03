import nodemailer, {SentMessageInfo} from 'nodemailer';
import {config} from  '../config/config'
import {constants, EmailActionEnum, emailInfo} from '../constants/';
import EmailTemplate from  'email-templates';
import path from 'path';

class EmailService {
    templateRenderer = new EmailTemplate({
        views:{
          root: path.join(path.join(__dirname, '../','email-templates')),
                // options: {extension: 'hbs'}
        }
    });
    async sendMail(userMail: string, action: EmailActionEnum, context:{} = {}): Promise<SentMessageInfo> {
        const {subject, templateName} = emailInfo[action];

        Object.assign(context,{frontendUrl: constants.FRONT_END_URL});
       const html = await this.templateRenderer.render(templateName, context);
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
}

export const emailService = new EmailService()