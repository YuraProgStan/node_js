import {EmailActionEnum} from './enums';

export const emailInfo = {
    [EmailActionEnum.WELCOME]: {
        subject: 'Welcome to SEP-2021',
        templateName: 'welcome'
    },
    [EmailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'You account was blocked',
        templateName: 'accountBlocked'
    },
    [EmailActionEnum.WELCOME_TO_PLATFORM]: {
        subject: 'Welocme to our platform',
        templateName: 'welcomeRegistration'
    },
    [EmailActionEnum.UPDATE_DATA]: {
        subject: 'You apdated your registration data',
        templateName: 'updateEmailPass'
    }
}