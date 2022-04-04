import {EmailActionEnum} from './enums';

export const emailInfo = {
    [EmailActionEnum.WELCOME]: {
        subject: 'Welcome to SEP-2021',
        template: 'welcome'
    },
    [EmailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'You account was blocked',
        template: 'accountBlocked'
    },
    [EmailActionEnum.WELCOME_TO_PLATFORM]: {
        subject: 'Welocme to our platform',
        template: 'welcomeRegistration'
    },
    [EmailActionEnum.UPDATE_DATA]: {
        subject: 'You apdated your registration data',
        template: 'updateEmailPass'
    },
    [EmailActionEnum.FORGOT_PASSWORD]: {
        subject: 'dont worry, update your password',
        template: 'forgotPassword'
    },
    [EmailActionEnum.REGISTRATION_CRON]: {
        subject: 'List for all registration',
        template: 'registrationCron'
    }

}