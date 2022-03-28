import {emailActionEnum} from './enums';

export const emailInfo = {
    [emailActionEnum.WELCOME]: {
        subject: 'Welcome to SEP-2021',
        html: 'Hello this is welcome mail'
    },
    [emailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'You account was blocked',
        html: 'Opps accout was blocked'
    },
    [emailActionEnum.WELCOME_TO_PLATFORM]: {
        subject: 'Welocme to our platform',
        html: 'Hello this is welcome mail to registration'
    },
    [emailActionEnum.UPDATE_DATA]: {
        subject: 'You apdated your registration data',
        html: 'Hello this is  mail to update your email or password'
    }
}