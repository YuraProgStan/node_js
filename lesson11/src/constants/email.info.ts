import {EmailActionEnum} from './enums';

export const emailInfo = {
    [EmailActionEnum.WELCOME]: {
        subject: 'Welcome to SEP-2021',
        html: 'Hello this is welcome mail'
    },
    [EmailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'You account was blocked',
        html: 'Opps accout was blocked'
    },
    [EmailActionEnum.WELCOME_TO_PLATFORM]: {
        subject: 'Welocme to our platform',
        html: 'Hello this is welcome mail to registration'
    },
    [EmailActionEnum.UPDATE_DATA]: {
        subject: 'You apdated your registration data',
        html: 'Hello this is  mail to update your email or password'
    }
}