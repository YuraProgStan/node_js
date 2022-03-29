import nodemailer from 'nodemailer';
import {config} from  '../config/config'
import {EmailActionEnum} from '../constants/';
import {emailInfo} from "../constants";

class EmailService {
    sendMail(userMail: string, action: EmailActionEnum) {
const {subject, html} = emailInfo[action]
        const emailTransporter = nodemailer.createTransport( {
        from: 'No Reply Sep 2021',
        service: 'gmail',
        auth: {
            user: config.NO_REPLY_EMAIL,
            pass: config.NO_REPLY_EMAIL_PASSWORD,

        }
    });
        emailTransporter.sendMail({
            to: userMail,
            subject,
            html
        })
}
}

export const emailService = new EmailService()