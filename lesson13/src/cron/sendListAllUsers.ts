import cron from 'node-cron'
import {userRepository} from '../reporitories/user/userRepository';
import {EmailActionEnum} from '../constants';
import {emailService} from '../services';

export const sendListAllUsers = async () => {
    cron.schedule('*/60 * * * * *', async () => {
        console.log('START WORK WITH SEND LIST FOR USERS');
        // const users = await userRepository.getUsers();
        // for (const user of users) {
        //     const { email,firstName } = user;
        //     await emailService.sendMail(email, EmailActionEnum.REGISTRATION_CRON, { userName: firstName});
        // }
        const users = await userRepository.getUsers();
        await Promise.allSettled(users.map(async(u) => await emailService.sendMail(
            u.email,
            EmailActionEnum.REGISTRATION_CRON,
            { userName: u.firstName}
        )));
    })
}