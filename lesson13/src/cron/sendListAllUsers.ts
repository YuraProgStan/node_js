import cron from 'node-cron'
import {userRepository} from '../reporitories/user/userRepository';
import {emailService} from "../services";
import {EmailActionEnum} from "../constants";

export const sendListAllUsers = async () => {
    cron.schedule('*/60 * * * * *', async () => {
        console.log('START WORK WITH SEND LIST FOR USERS');
        const users = await userRepository.getUsers();
        for (const user of users) {
            const { email,firstName } = user;
            console.log(email);
            await emailService.sendMail(email, EmailActionEnum.REGISTRATION_CRON, { userName: firstName});
        }
    })
}