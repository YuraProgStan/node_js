 // import { getNewUsers } from './get-new-users';

 import {sendListAllUsers} from './sendListAllUsers';

 export const cronRun = () => {
        console.log('CRON WAS STARTED');
        // getNewUsers();
        sendListAllUsers();
        }
