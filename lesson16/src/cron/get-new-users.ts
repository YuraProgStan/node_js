import cron from 'node-cron'
import {userRepository} from '../reporitories/user/userRepository';

export const getNewUsers = async () => {
    cron.schedule('*/10 * * * * *', async () => {
        console.log('START WORK WITH GET NEW USERS');
        const newUsers = await userRepository.getNewUsers();

        console.log('_____________________');
        console.log(newUsers);
        console.log('_____________________');

    })
}